import { FC } from "react";

type HangarStatus = "open" | "close" | "reset" | "default";

interface AlertHangarCardProps {
  status: HangarStatus;
  className?: string;
}

const statusStyles: Record<
  HangarStatus,
  {
    bg: string;
    text: string;
    message: string;
  }
> = {
  open: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    message: "Hangar Open",
  },
  close: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    message: "Hangar Closed",
  },
  reset: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    message: "Hangar Resetting",
  },
  default: {
    bg: "bg-gray-600/10",
    text: "text-gray-400",
    message: "Hangar Status Unknown",
  },
};

export const AlertHangarCard: FC<AlertHangarCardProps> = ({ status, className = "" }) => {
  const { bg, text, message } = statusStyles[status];

  return (
    <section
      className={`w-full border border-white/10 rounded-lg p-6 text-center ${bg} ${text} ${className}`}
      role="status"
      aria-live="polite"
    >
      <h2 className="text-2xl font-bold">{message}</h2>
    </section>
  );
};
