import { useEffect, useState } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Orbit, Home, Container, Map, Timer, Plane, Wrench, Coffee, Github } from "lucide-react";

// SidebarLinkProps type for defining the sidebar link component
interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ElementType;
  className?: string;
}

// SocialLinkProps type for defining the social link component
interface SocialLinkProps {
  href: string
  icon: React.ElementType;
  color: string
  ringColor?: string
}

// SidebarLink component renders a single navigation link
const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, icon: Icon, className = "" }) => {
  const location = useLocation()

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          location.pathname === to ? "bg-orange-500/20 text-orange-400" : "text-gray-400 hover:text-white hover:bg-white/5"
        } ${className}`}
      >
        <Icon size={18} />
        {label}
      </Link>
    </li>
  )
};

// SocialLink component renders a single external link
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, color, ringColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 ${
        ringColor || ''
      } rounded-lg p-1`}
    >
      <Icon size={26} />
    </a>
  )
}

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/cz-map", label: "CZ Map", icon: Map },
  { to: "/timer", label: "CZ Timer", icon: Timer },
  { to: "/ship-reward", label: "Ship Reward", icon: Plane },
  { to: "/about", label: "About", icon: Wrench },
];

const socialLinks = [
  { ref: "https://github.com/Feareis/Star-Citizen_Executive-Hangar", color: "text-gray-400 hover:text-gray-500", ringColor: "focus:ring-green-500/50", icon: Github },
];

export const Navbar = () => {
  return (
    <header className="w-full h-18 bg-[#181818] backdrop-blur-sm border-gray-700 shadow-md">
      <div className="container mx-auto px-6 py-0 h-full flex items-center justify-between">

        {/* Site Icon */}
        <Link
          to="/"
          className={`flex items-center gap-2 py-2 rounded-lg transition-all duration-200 text-gray-400 p-1`}
        >
          <Orbit size={26} />
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-3 sm:gap-4">
          {navLinks.map(({ to, label, icon }) => (
            <SidebarLink key={to} to={to} label={label} icon={icon} />
          ))}
        </ul>

        {/* Social Links */}
        <ul className="flex items-center gap-1 sm:gap-3">
          {socialLinks.map(({ ref, color, ringColor, icon }) => (
            <li key={ref}>
              <SocialLink href={ref} color={color} ringColor={ringColor} icon={icon} />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
