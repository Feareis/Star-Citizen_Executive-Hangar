import { useLocation, Link } from "react-router-dom";
import { Orbit, Home, Map, Timer, Plane, Wrench, Github } from "lucide-react";

// Props for each internal navigation link
interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ElementType;
  className?: string;
}

// Props for each external social link
interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  color: string;
  ringColor?: string;
}

// Renders a single nav link, highlighting if active
const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  label,
  icon: Icon,
  className = "",
}) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 text-lg rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-yellow-400/70 text-gray-800"
            : "text-gray-400 hover:text-white/90 hover:bg-white/10"
        } ${className}`}
      >
        <Icon size={18} />
        {label}
      </Link>
    </li>
  );
};

// Renders an external social icon link
const SocialLink: React.FC<SocialLinkProps> = ({
  href,
  icon: Icon,
  color,
  ringColor,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 ${
        ringColor || ""
      } rounded-lg p-1`}
    >
      <Icon size={26} />
    </a>
  );
};

// Internal routes
const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: Map },
  { to: "/timer", label: "Timer", icon: Timer },
  { to: "/ship-reward", label: "Ships", icon: Plane },
  // { to: "/about", label: "About", icon: Wrench },
];

// External social links
const socialLinks = [
  {
    href: "https://github.com/Feareis/Star-Citizen_Executive-Hangar",
    color: "text-gray-400 hover:text-gray-500",
    ringColor: "focus:ring-green-500/50",
    icon: Github,
  },
];

// Navbar component with logo, nav links and social links
export const Navbar = () => {
  return (
    <header className="w-full h-16 bg-[#304149] border-b border-gray-600 shadow-lg">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo link to home */}
        <Link
          to="/"
          className="flex items-center gap-2 py-2 rounded-lg text-gray-400 p-1 transition-all duration-200"
        >
          <Orbit size={26} />
        </Link>

        {/* Navigation links */}
        <ul className="flex items-center gap-3 sm:gap-4">
          {navLinks.map(({ to, label, icon }) => (
            <SidebarLink key={to} to={to} label={label} icon={icon} />
          ))}
        </ul>

        {/* Social links */}
        <ul className="flex items-center gap-1 sm:gap-3">
          {socialLinks.map(({ href, color, ringColor, icon }) => (
            <li key={href}>
              <SocialLink href={href} color={color} ringColor={ringColor} icon={icon} />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
