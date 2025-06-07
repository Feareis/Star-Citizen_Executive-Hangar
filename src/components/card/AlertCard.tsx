import { FC, ReactNode } from "react";
import {
  AlertTriangle,
  CircleX,
  CheckCircle,
  RefreshCcw,
  Info,
} from "lucide-react";

type AlertVariant = "warning" | "error" | "info" | "success" | "default";

interface AlertCardProps {
  icon?: ReactNode;
  title: string;
  listItems?: string[];
  className?: string;
  variant?: AlertVariant;
  textSize?: string;
}

// Maps each variant to specific styles and a default icon
const variantStyles: Record<
  AlertVariant,
  {
    bg: string;
    border: string;
    text: string;
    list: string;
    defaultIcon: ReactNode;
  }
> = {
  warning: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-200/90",
    list: "text-yellow-200/70",
    defaultIcon: <AlertTriangle size={20} />,
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-200/90",
    list: "text-red-200/70",
    defaultIcon: <CircleX size={20} />,
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-200/90",
    list: "text-blue-200/70",
    defaultIcon: <Info size={20} />,
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-200/90",
    list: "text-green-200/70",
    defaultIcon: <CheckCircle size={20} />,
  },
  default: {
    bg: "bg-gray-500/10",
    border: "border-gray-500/20",
    text: "text-gray-200/90",
    list: "text-gray-200/70",
    defaultIcon: <RefreshCcw size={20} />,
  },
};

export const AlertCard: FC<AlertCardProps> = ({
  icon,
  title,
  listItems,
  className = "",
  textSize = "",
  variant = "warning",
}) => {
  const { bg, border, text, list, defaultIcon } = variantStyles[variant];

  return (
    <section
      className={`border ${bg} ${border} rounded-lg p-4 mb-4 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        {/* Icon container - fallback to default icon if none provided */}
        <div className={`${text} flex-shrink-0`} aria-hidden="true">
          {icon ?? defaultIcon}
        </div>

        <div className={`${text} ${textSize}`}>
          <p className="font-medium mb-1">{title}</p>

          {/* Optional list of additional details */}
          {listItems?.length > 0 && (
            <ul className={`list-disc list-inside space-y-1 ${list}`}>
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
