import { FC, ReactNode } from "react";

type AlertVariant = "warning" | "error" | "info";

interface AlertCardProps {
  icon: ReactNode
  title: string
  listItems?: string[]
  className?: string
  variant?: AlertVariant
};

// Style map for bg, border and text per variant
const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; list: string }> = {
  warning: {
    bg: "bg-yellow-500/10",
    border: "border-blue-500/80",
    text: "text-yellow-200/90",
    list: "text-yellow-200/70",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/80",
    text: "text-red-200/90",
    list: "text-red-200/70",
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/80",
    text: "text-blue-200/90",
    list: "text-blue-200/70",
  },
};

export const AlertCard: FC<AlertCardProps> = ({
  icon,
  title,
  listItems,
  className = "",
  variant = "warning",
}) => {
  const { bg, border, text, list } = variantStyles[variant]

  return (
    <section
      className={`${bg} ${border} rounded-lg p-4 mb-4 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className={`${text} flex-shrink-0 mt-0.5`} aria-hidden="true">
          {icon}
        </div>
        <div className={`text-sm ${text}`}>
          <p className="font-medium mb-1">{title}</p>
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
