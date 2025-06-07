import { useEffect, useState } from "react";

// Phase durations
const RED_PHASE = 2 * 60 * 60;
const GREEN_PHASE = 1 * 60 * 60;
const BLACK_PHASE = 5 * 60;
const TOTAL_CYCLE = RED_PHASE + GREEN_PHASE + BLACK_PHASE;

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

// Styling + text for each status
const statusStyles = {
  reset: {
    bg: "bg-yellow-500/10",
    border: "border border-yellow-500/20",
    text: "text-yellow-500/80",
    message: "Hangar Resetting",
  },
  close: {
    bg: "bg-red-500/10",
    border: "border border-red-500/20",
    text: "text-red-500/80",
    message: "Hangar Closed",
  },
  open: {
    bg: "bg-green-500/10",
    border: "border border-green-500/20",
    text: "text-green-500/80",
    message: "Hangar Open",
  },
  default: {
    bg: "bg-gray-600/10",
    border: "border border-gray-600/20",
    text: "text-gray-500/80",
    message: "Hangar Status Unknown",
  },
} as const;

export default function HangarTimer() {
  const [cycleStart, setCycleStart] = useState<number | null>(null);
  const [status, setStatus] = useState<keyof typeof statusStyles>("default");
  const [Timer, setTimer] = useState("");
  const [lights, setLights] = useState<string[]>(["red", "red", "red", "red", "red"]);

  useEffect(() => {
    const raw = import.meta.env.VITE_TIME_START_CYCLE;
    const parsed = parseInt(raw, 10);
    setCycleStart(!isNaN(parsed) ? parsed : Date.now());
  }, []);

  useEffect(() => {
    if (cycleStart === null) return;
    let animationFrame: number;

    const tick = () => {
      const elapsed = Math.floor((Date.now() - cycleStart) / 1000);
      const remaining = TOTAL_CYCLE - (elapsed % TOTAL_CYCLE);

      if (remaining > GREEN_PHASE + BLACK_PHASE) {
        const redTime = remaining - (GREEN_PHASE + BLACK_PHASE);
        const timeSinceRedStart = RED_PHASE - redTime;

        const newLights = Array(5)
          .fill(null)
          .map((_, i) => (timeSinceRedStart >= (i + 1) * 24 * 60 ? "green" : "red"));

        setLights(newLights);
        setStatus("close");
        setTimer(`Opens in ${formatTime(redTime)}`);
      } else if (remaining > BLACK_PHASE) {
        const greenTime = remaining - BLACK_PHASE;
        const timeSinceGreenStart = GREEN_PHASE - greenTime;

        const newLights = Array(5)
          .fill(null)
          .map((_, i) => (timeSinceGreenStart >= (i + 1) * 12 * 60 ? "black" : "green"));

        setLights(newLights);
        setStatus("open");
        setTimer(`Open for ${formatTime(greenTime)}`);
      } else {
        setLights(Array(5).fill("black"));
        setStatus("reset");
        setTimer("");
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [cycleStart]);

  // === LED TIMER CALCULATION ===
  const elapsed = Math.floor((Date.now() - (cycleStart ?? 0)) / 1000);
  const cycleElapsed = elapsed % TOTAL_CYCLE;

  const ledTimers: (string | null)[] = [];
  const timerValues: (number | null)[] = [];

  for (let i = 0; i < lights.length; i++) {
    const color = lights[i];
    let secondsLeft: number | null = null;

    if (status === "close" && color === "red") {
      const target = (i + 1) * 24 * 60;
      const timeLeft = target - cycleElapsed;
      if (timeLeft > 0) secondsLeft = timeLeft;
    }

    if (status === "open" && color === "green") {
      const timeSinceGreen = cycleElapsed - RED_PHASE;
      const target = (i + 1) * 12 * 60;
      const timeLeft = target - timeSinceGreen;
      if (timeLeft > 0) secondsLeft = timeLeft;
    }

    ledTimers[i] = secondsLeft !== null ? formatTime(secondsLeft).slice(3) : null;
    timerValues[i] = secondsLeft;
  }

  const minTimerIndex = timerValues.reduce((minIdx, val, idx, arr) => {
    if (val === null) return minIdx;
    if (arr[minIdx] === null || val < arr[minIdx]!) return idx;
    return minIdx;
  }, 0);

  const { bg, border, text, message } = statusStyles[status];

  return (
    <section className={`w-full rounded-xl shadow-xl p-6 ${border} ${bg} ${text}`}>
      <h2 className="text-2xl font-bold text-center mb-4">{message}</h2>

      <div className="text-4xl font-semibold text-center text-gray-400/70 mb-6">
        {status === "reset"
          ? `Resets in ${formatTime(Math.max(0, BLACK_PHASE - (cycleElapsed - RED_PHASE - GREEN_PHASE))).slice(3)}`
          : Timer}
      </div>

      <div className="flex justify-center gap-6">
        {lights.map((color, i) => {
          let glow = "";
          if (color === "red") glow = "shadow-red-500";
          else if (color === "green") glow = "shadow-green-500";
          else if (color === "black") glow = "shadow-[#1e1e1e]";

          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full border border-gray-600 ${glow}`}
                style={{
                  backgroundColor: color === "black" ? "#1e1e1e" : color,
                }}
              />
              {i === minTimerIndex && ledTimers[i] && (
                <span className="text-md text-gray-400/70 font-mono">{ledTimers[i]}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
