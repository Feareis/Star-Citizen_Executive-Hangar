import { useEffect, useState } from "react";
import { AlertHangarCard } from "@components/card/AlertHangarCard";

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

export default function HangarTimer() {
  const [cycleStart, setCycleStart] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState("Loading...");
  const [miniTimer, setMiniTimer] = useState("");
  const [lights, setLights] = useState<string[]>(["red", "red", "red", "red", "red"]); // 5 lights

  useEffect(() => {
    const raw = import.meta.env.VITE_TIME_START_CYCLE;

    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      setCycleStart(parsed);
    } else {
      console.warn("VITE_TIME_START_CYCLE invalide :", raw);
      setCycleStart(Date.now()); // fallback
    }
  }, []);

  useEffect(() => {
    if (cycleStart === null) return;

    let animationFrame: number;

    const tick = () => {
      const elapsed = Math.floor((Date.now() - cycleStart) / 1000);
      const remaining = TOTAL_CYCLE - (elapsed % TOTAL_CYCLE);

      setTimeLeft((prev) => (prev !== remaining ? remaining : prev));

      if (remaining > GREEN_PHASE + BLACK_PHASE) {
        // RED PHASE
        const redTime = remaining - (GREEN_PHASE + BLACK_PHASE);
        const timeSinceRedStart = RED_PHASE - redTime;

        const newLights = Array(5)
          .fill(null)
          .map((_, i) =>
            timeSinceRedStart >= (i + 1) * 24 * 60 ? "green" : "red"
          );

        setLights((prev) =>
          JSON.stringify(prev) !== JSON.stringify(newLights) ? newLights : prev
        );
        setStatus((prev) => (prev !== "Hangar Closed" ? "Hangar Closed" : prev));
        setMiniTimer((prev) => {
          const msg = `Opens in ${formatTime(redTime)}`;
          return prev !== msg ? msg : prev;
        });
      } else if (remaining > BLACK_PHASE) {
        // GREEN PHASE
        const greenTime = remaining - BLACK_PHASE;
        const timeSinceGreenStart = GREEN_PHASE - greenTime;

        const newLights = Array(5)
          .fill(null)
          .map((_, i) =>
            timeSinceGreenStart >= (i + 1) * 12 * 60 ? "black" : "green"
          );

        setLights((prev) =>
          JSON.stringify(prev) !== JSON.stringify(newLights) ? newLights : prev
        );
        setStatus((prev) => (prev !== "Hangar Open" ? "Hangar Open" : prev));
        setMiniTimer((prev) => {
          const msg = `Resets in ${formatTime(greenTime)}`;
          return prev !== msg ? msg : prev;
        });
      } else {
        // BLACK PHASE
        const newLights = Array(5).fill("black");
        setLights((prev) =>
          JSON.stringify(prev) !== JSON.stringify(newLights) ? newLights : prev
        );
        setStatus((prev) => (prev !== "Hangar Resetting" ? "Hangar Resetting" : prev));
        setMiniTimer((prev) => (prev !== "" ? "" : prev));
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [cycleStart]);

  return (
    <div className="text-center text-white space-y-4">
      <AlertHangarCard
        status={
          status === "Hangar Open"
            ? "open"
            : status === "Hangar Closed"
            ? "close"
            : status === "Hangar Resetting"
            ? "reset"
            : "default"
        }
      />

      {miniTimer && (
        <div id="hangar-mini-timer" className="text-base text-gray-400">
          {miniTimer}
        </div>
      )}

      <div className="flex justify-center gap-6 mt-6">
        {lights.map((color, i) => {
          let glow = "";
          if (color === "red") glow = "shadow-red-500";
          else if (color === "green") glow = "shadow-green-500";
          else if (color === "black") glow = "shadow-gray-800";

          return (
            <div
              key={i}
              className={`w-9 h-9 rounded-full border-1 border-gray-600 transition-all duration-500 ${glow}`}
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </div>
  );
};
