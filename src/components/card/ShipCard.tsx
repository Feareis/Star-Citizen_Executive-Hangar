import { FC } from "react";
import { ExternalLink } from "lucide-react";

interface ShipCardProps {
  name: string;
  imageUrl: string;
  tags: string[];
  description: string;
  links: { label: string; url: string }[];
}

const Tag: FC<{ label: string }> = ({ label }) => (
  <span className="px-2 py-1 text-xs font-semibold rounded bg-white/10 text-white">
    {label}
  </span>
);

export const ShipCard: FC<ShipCardProps> = ({
  name,
  imageUrl,
  tags,
  description,
  links,
}) => {
  return (
    <div className="bg-[#212526] border border-gray-700/70 rounded-xl shadow-xl p-3 w-full max-w-sm space-y-6">
      <h3 className="text-center text-xl font-bold text-gray-300/80">{name}</h3>
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-lg border border-white/5"
      />
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag, i) => (
          <Tag key={i} label={tag} />
        ))}
      </div>
      <p className="text-sm text-gray-400 text-center">{description}</p>
      <div className="flex justify-around items-center gap-1">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline inline-flex items-center gap-1 text-sm"
          >
            <ExternalLink size={14} />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
