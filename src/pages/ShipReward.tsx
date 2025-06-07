import { useState } from "react";
import { ShipCard } from "@components/card/ShipCard";
import { shipsAssets } from "@assets/images/ships";

const ships = [
  {
    name: "Anvil F7A Hornet Mk II",
    imageUrl: shipsAssets.F7AMK2,
    tags: ["Medium Fighter"],
    description: "An elite military-grade fighter with superior firepower.",
    links: [
      {
        label: "Wiki",
        url: "https://starcitizen.tools/F7A_Hornet_Mk_II",
      },
      {
        label: "Pledge",
        url: "https://robertsspaceindustries.com/en/pledge/ships/anvil-hornet-mkii/F7A-Hornet-Mk-II",
      },
      {
        label: "Build",
        url: "https://www.erkul.games/loadout/1gysEjez",
      },
    ],
  },
  {
    name: "Anvil F8C Lightning",
    imageUrl: shipsAssets.F8C,
    tags: ["Heavy Fighter"],
    description: "A rare civilian version of the UEE’s top fighter, built by Anvil.",
    links: [
      {
        label: "Wiki",
        url: "https://starcitizen.tools/F8C_Lightning",
      },
      {
        label: "Pledge",
        url: "https://robertsspaceindustries.com/en/pledge/ships/lightning/F8C-Lightning",
      },
      {
        label: "Build",
        url: "https://www.erkul.games/loadout/KZ6xfLZU",
      },
    ],
  },
  {
    name: "Drake Corsair",
    imageUrl: shipsAssets.CORSAIR,
    tags: ["Exploration", "Multi-Crew"],
    description: "A versatile explorer ship with strong firepower, large cargo, and room for 4 crew.",
    links: [
      {
        label: "Wiki",
        url: "https://starcitizen.tools/Corsair",
      },
      {
        label: "Pledge",
        url: "https://robertsspaceindustries.com/en/pledge/ships/drake-corsair/Corsair",
      },
      {
        label: "Build",
        url: "https://www.erkul.games/loadout/ZIXtiCGv",
      },
    ],
  },
  {
    name: "Drake Cutlass Black",
    imageUrl: shipsAssets.CUTLASSBLACK,
    tags: ["Medium Freight", "Multi-Crew"],
    description: "A cheap, rugged multi-role ship with solid cargo space.",
    links: [
      {
        label: "Wiki",
        url: "https://starcitizen.tools/Cutlass_Black",
      },
      {
        label: "Pledge",
        url: "https://robertsspaceindustries.com/en/pledge/ships/drake-cutlass/cutlass-black",
      },
      {
        label: "Build",
        url: "https://www.erkul.games/loadout/nZp4tSmQ",
      },
    ],
  },
  {
    name: "Gatac Syulen",
    imageUrl: shipsAssets.SYULEN,
    tags: ["Starter", "Light Freight"],
    description: "A fast, light cargo ship made for Human and Xi'an pilots.",
    links: [
      {
        label: "Wiki",
        url: "https://starcitizen.tools/Syulen",
      },
      {
        label: "Pledge",
        url: "https://robertsspaceindustries.com/en/pledge/ships/syulen/Syulen",
      },
      {
        label: "Build",
        url: "https://www.erkul.games/loadout/zpif0MIJ",
      },
    ],
  },
];

const ShipReward = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredShips = selectedTag
    ? ships.filter((ship) => ship.tags.includes(selectedTag))
    : ships;

  return (
    <div className="flex">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ships.map((ship, i) => (
          <ShipCard key={i} {...ship} />
        ))}
      </div>
    </div>
  );
};

export default ShipReward;
