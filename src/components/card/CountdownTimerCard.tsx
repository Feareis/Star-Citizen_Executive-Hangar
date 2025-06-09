import { FC, useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface CountdownTimerCardProps {
  id: string;
  title: string;
  initialDuration: number;
  onActiveUpdate?: (active: boolean, formattedTime: string) => void;
}

export const CountdownTimerCard: FC<CountdownTimerCardProps> = ({
  id,
  title,
  initialDuration,
  onActiveUpdate,
}) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);

  const startKey = `timerStart-${id}`;
  const durationKey = `timerDuration-${id}`;

  useEffect(() => {
    const storedStart = localStorage.getItem(startKey);
    const storedDuration = localStorage.getItem(durationKey);

    if (storedStart && storedDuration) {
      const start = parseInt(storedStart);
      const dur = parseInt(storedDuration);
      const diff = Math.floor((start + dur * 1000 - Date.now()) / 1000);
      setDuration(dur);
      setTimeLeft(Math.max(0, diff));
      setIsRunning(diff > 0);
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          localStorage.removeItem(startKey);
          localStorage.removeItem(durationKey);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    const now = Date.now();
    localStorage.setItem(startKey, now.toString());
    localStorage.setItem(durationKey, duration.toString());
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const resetTimer = () => {
    localStorage.removeItem(startKey);
    localStorage.removeItem(durationKey);
    setIsRunning(false);
    setDuration(initialDuration);
    setTimeLeft(initialDuration);
  };

  const increaseDuration = () => {
    if (isRunning) return;
    const newDur = Math.min(initialDuration, duration + 60);
    setDuration(newDur);
    setTimeLeft(newDur);
  };

  const decreaseDuration = () => {
    if (isRunning) return;
    const newDur = Math.max(60, duration - 60);
    setDuration(newDur);
    setTimeLeft(newDur);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const getColor = () => {
    if (!isRunning && timeLeft === duration) return "text-gray-300/90";
    if (timeLeft === 0) return "text-green-400";
    if (timeLeft <= 119) return "text-red-500";
    return "text-yellow-400";
  };

  useEffect(() => {
    const formatted = formatTime(timeLeft);
    const color = getColor();

    onActiveUpdate?.(isRunning, formatted, color, title);
  }, [isRunning, timeLeft]);

  return (
    <div className="w-full bg-[#212526] p-3 rounded-lg shadow-lg border border-gray-700/70">
      <h2 className="text-gray-300 text-center text-lg font-semibold mb-4">{title}</h2>

      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          onClick={decreaseDuration}
          disabled={isRunning}
          className="hover:text-red-400 text-gray-300/90 transition disabled:opacity-50"
        >
          <ChevronDown size={28} />
        </button>

        <div
          className={`text-2xl font-bold min-w-[100px] text-center ${getColor()}`}
        >
          {formatTime(timeLeft)}
        </div>

        <button
          onClick={increaseDuration}
          disabled={isRunning || duration >= initialDuration}
          className="hover:text-green-400 text-gray-300/90 transition disabled:opacity-50"
        >
          <ChevronUp size={28} />
        </button>
      </div>

      <div className="flex justify-center gap-3 mb-2">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
