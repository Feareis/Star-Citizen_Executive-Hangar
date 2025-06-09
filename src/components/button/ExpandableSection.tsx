import React, {
  FC,
  ReactNode,
  useState,
  isValidElement,
  cloneElement,
  useEffect,
} from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

type ActiveTimer = {
  title: string;
  time: string;
  color: string;
};

export const ExpandableSection: FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);

  useEffect(() => {
    const length = React.Children.toArray(children).length;
    setActiveTimers(Array(length).fill({ title: "", time: "", color: "" }));
  }, [children]);

  const handleActiveUpdate =
    (index: number) =>
    (active: boolean, time: string, color: string, timerTitle?: string) => {
      setActiveTimers((prev) => {
        const next = [...prev];
        if (active && timerTitle) {
          next[index] = { title: timerTitle, time, color };
        } else {
          next[index] = { title: "", time: "", color: "" };
        }
        return next;
      });
    };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        const childTitle = child.props.title;
        return cloneElement(child, {
          onActiveUpdate: (active: boolean, time: string, color: string) =>
            handleActiveUpdate(index)(active, time, color, childTitle),
        });
      }
      return child;
    });
  };

  return (
    <section className="bg-[#2d2d2d] border border-gray-700/70 rounded-lg w-full overflow-hidden transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-3 text-left bg-[#212526] border-b border-gray-700/70"
      >
        {/* Left: Section title */}
        <span className="text-lg font-bold text-gray-300/70">{title}</span>

        {/* Middle: Active timers */}
        {!isOpen && activeTimers.filter((t) => t.time).length > 0 && (
          <div className="flex-1 px-4 flex flex-wrap justify-center gap-12 text-base">
            {activeTimers
              .filter((t) => t.time)
              .map(({ title, time, color }, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center whitespace-nowrap"
                >
                  <p className="text-gray-400">{title}</p>
                  <p className={`${color} font-mono`}>{time}</p>
                </div>
              ))}
          </div>
        )}

        {/* Chevron */}
        <div className="ml-auto">
          {isOpen ? (
            <ChevronDown className="text-gray-400" />
          ) : (
            <ChevronRight className="text-gray-400" />
          )}
        </div>
      </button>

      {/* Content */}
      <div className={`transition-all ${isOpen ? "p-4 flex gap-4" : "hidden"}`}>
        {renderChildren()}
      </div>
    </section>
  );
};
