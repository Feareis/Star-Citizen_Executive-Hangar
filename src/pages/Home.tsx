import { AlertTriangle, Info, Clock, ShieldCheck } from "lucide-react";
import { AlertCard } from "@components/card/AlertCard";
import HangarTimer from "@data/HangarTimeManagement";

const Home = () => {
  return (
    <section className="px-6 py-8 text-gray-200 space-y-8">
      <HangarTimer />

      {/* Sections */}
      <div className="space-y-8 pt-6">

        {/* Location */}
        <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700/70 shadow-md">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Info size={20} />
            <h2 className="text-xl font-semibold">Location</h2>
          </div>
          <p className="text-base text-gray-400">
            Executive Hangars are found in the <strong>PYAM-EXHANG-0-1</strong> cluster — a group of three asteroid bases near the Pyro star. Only one base is active at any given time.
          </p>
        </div>

        {/* Light System */}
        <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700/70 shadow-md">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <Clock size={20} />
            <h2 className="text-xl font-semibold">Status Light Cycle</h2>
          </div>
          <p className="text-base text-gray-400">
            Inside the zero-g EVA area are <strong>5 indicator lights</strong>:
          </p>
          <ul className="list-disc list-inside pl-4 text-base text-gray-400 mt-2 space-y-1">
            <li>🔴 One green light turns on every <strong>24 minutes</strong> (charging phase – total 2h).</li>
            <li>🟢 One green light turns off every <strong>12 minutes</strong> (active phase – total 1h).</li>
            <li>⚫ After all greens are off, a 5-minute reset starts (all lights turn red).</li>
          </ul>
          <p className="text-base text-gray-400 mt-2">
            The door can only open when <strong>at least 1 green light is active</strong> and <strong>no red lights are on</strong>.
          </p>
        </div>

        {/* Access & Requirements */}
        <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-700/70 shadow-md">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <ShieldCheck size={20} />
            <h2 className="text-xl font-semibold">Access Requirements</h2>
          </div>
          <ul className="list-disc list-inside pl-4 text-sm text-gray-400 space-y-1">
            <li>⚙️ Insert <strong>7 compboards</strong> into the slots located near the light panel.</li>
            <li>✅ 1+ green light must be active, and no red lights present.</li>
            <li>🔐 Once unlocked, the Engineering door remains open for <strong>30 minutes</strong>.</li>
            <li>🚨 A warning alarm plays before automatic door closure (which kills anyone inside).</li>
          </ul>
        </div>

        {/* Reward Mechanics */}
        <div className="bg-[#1f1f1f] p-4 rounded-lg border border-gray-800 shadow-md">
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <AlertTriangle size={20} />
            <h2 className="text-xl font-semibold">Claiming the Ship</h2>
          </div>
          <p className="text-base text-gray-400">
            Once the <strong>7 compboards are inserted</strong> and the ship is claimed via ASOP:
          </p>
          <ul className="list-disc list-inside pl-4 text-sm text-gray-400 mt-2 space-y-1">
            <li>🚪 The main Hangar door opens for <strong>10 minutes</strong>.</li>
            <li>🏆 Only <strong>one player</strong> can claim the reward ship.</li>
            <li>📦 Bring a cargo ship — additional ship components/weapons spawn, and may not fit in the reward ship's storage.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
