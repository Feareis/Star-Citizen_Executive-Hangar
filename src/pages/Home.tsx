import { AlertTriangle, Info, Clock, ShieldCheck } from "lucide-react";
import HangarTimer from "@components/card/HangarTimerCard";
import { AlertCard } from "@components/card/AlertCard";

const Home = () => {
  return (
    <section className="flex flex-col gap-8 text-gray-200">
      <AlertCard variant="warning" title="The timer may have a slight lead or delay (30s to 1min) compared to the in-game server."/>

      {/* Displays the current hangar timer and status */}
      <HangarTimer />

      <div className="flex flex-col gap-4">
        {/* Hangar Location Section */}
        <div className="bg-[#212526] p-4 rounded-lg border border-gray-700/70 shadow-lg">
          <div className="flex items-center gap-2 text-orange-400/70 mb-2">
            <Info size={20} />
            <h2 className="text-2xl font-semibold">Location</h2>
          </div>
          <p className="text-base text-gray-400">
            Executive Hangars are found in the <strong>PYAM-EXHANG-0-1</strong> cluster — a group of three asteroid bases near the Pyro star. Only one base is active at any given time.
          </p>
        </div>

        {/* Entry Conditions and Mechanics */}
        <div className="bg-[#212526] p-4 rounded-lg border border-gray-700/70 shadow-lg">
          <div className="flex items-center gap-2 text-yellow-400/70 mb-2">
            <ShieldCheck size={20} />
            <h2 className="text-2xl font-semibold">Access Requirements</h2>
          </div>
          <ul className="list-disc list-inside pl-4 text-base text-gray-400 space-y-1">
            <li>Insert <strong>7 compboards</strong> into the slots located near the light panel.</li>
            <li>1+ green light must be active, and no red lights present.</li>
            <li>A warning alarm plays before automatic door closure (which kills anyone inside).</li>
          </ul>
        </div>

        {/* Reward Claiming Logic */}
        <div className="bg-[#212526] p-4 rounded-lg border border-gray-700/70 shadow-lg">
          <div className="flex items-center gap-2 text-purple-400/70 mb-2">
            <AlertTriangle size={20} />
            <h2 className="text-2xl font-semibold">Claiming the Ship</h2>
          </div>
          <p className="text-base text-gray-400">
            Once the <strong>7 compboards are inserted</strong> and the ship is claimed via ASOP:
          </p>
          <ul className="list-disc list-inside pl-4 text-base text-gray-400 mt-2 space-y-1">
            <li>Only <strong>one player</strong> can claim the reward ship.</li>
            <li>The main Hangar door opens for <strong>10 minutes</strong>.</li>
            <li>Bring a cargo ship — additional ship components/weapons spawn, and may not fit in the reward ship's storage.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
