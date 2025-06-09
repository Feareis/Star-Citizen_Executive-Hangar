/*
 * Star Citizen - Executive Hangar, Based Project
 * Copyright (c) 2025 Feareis
 * SPDX-License-Identifier: MIT
 * Author: https://github.com/Feareis
 */

import { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AlertCard } from "@components/card/AlertCard";
import { mapsAssets } from "@assets/images/map";
import { CountdownTimerCard } from "@components/card/CountdownTimerCard";
import { ExpandableSection } from "@components/button/ExpandableSection";
import { Info } from "lucide-react";

const mapList = [
  { id: "CHECKMATE", label: "Checkmate" },
  { id: "ORBITUARY", label: "Orbituary" },
  { id: "RUINSTATION", label: "Ruin Station" },
  { id: "PYAMSUPVISR", label: "Supervisor" },
  { id: "PYAMEXHANG", label: "Executive Hangar" },
];

const mapTimers = {
  CHECKMATE: {
    Compboards: [
      { id: "compboard1", title: "Board 1", initialDuration: 1800 },
      { id: "compboard2", title: "Board 2", initialDuration: 1800 },
      { id: "compboard3", title: "Board 3", initialDuration: 1800 },
    ],
    "Blue Keycards": [
      { id: "checkmate_blue1", title: "Blue Keycard 1", initialDuration: 900 },
      { id: "checkmate_blue2", title: "Blue Keycard 2", initialDuration: 900 },
      { id: "checkmate_blue3", title: "Blue Keycard 3", initialDuration: 900 },
    ],
  },
  ORBITUARY: {
    Compboards: [
      { id: "compboard4", title: "Board 4", initialDuration: 1800 },
      { id: "compboard7", title: "Board 7", initialDuration: 1800 },
    ],
    "Blue Keycards": [
      { id: "orbituary_blue1", title: "Blue Keycard 1", initialDuration: 900 },
      { id: "orbituary_blue2", title: "Blue Keycard 2", initialDuration: 900 },
    ],
  },
  RUINSTATION: {
    Compboards: [
      { id: "compboard5", title: "Board 5", initialDuration: 1800 },
      { id: "compboard6", title: "Board 6", initialDuration: 1800 },
    ],
    "Keycards": [
      { id: "ruinstation_blue1", title: "The Crypt", initialDuration: 900 },
      { id: "ruinstation_blue2", title: "The Last Resort", initialDuration: 900 },
      { id: "ruinstation_blue3", title: "The Wasteland", initialDuration: 900 },
    ],
  },
  PYAMSUPVISR: {
    "Red Keycards": [
      { id: "red1", title: "Red Keycard 1", initialDuration: 1800 },
      { id: "red2", title: "Red Keycard 2", initialDuration: 1800 },
    ],
  },
};

const Maps = () => {
  const [selectedMapId, setSelectedMapId] = useState("CHECKMATE");
  const selectedMap = mapsAssets[selectedMapId as keyof typeof mapsAssets];
  const zoomRef = useRef<ReactZoomPanPinchRef | null>(null);

  // Reset zoom on map change
  useEffect(() => {
    if (zoomRef.current) {
      zoomRef.current.resetTransform();
    }
  }, [selectedMapId]);

  return (
    <div className="flex flex-col h-full gap-6">
      <AlertCard variant="info" title="Informations" textSize="text-base" listItems={["You can zoom on map.", "For the timer section, You can close the section and view timers directly.", "Timers do not reset if you change/quit the page."]} />
      {/* Sidebar */}
      <div className="flex gap-6">
        <aside className="w-60 bg-[#212526] border border-gray-700/70 rounded-lg p-4 space-y-3">
          <h2 className="text-xl text-center font-bold mb-4 text-gray-300">Maps</h2>
          {mapList.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMapId(map.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200
                ${
                  selectedMapId === map.id
                    ? "bg-white/10 text-gray-300 font-semibold"
                    : "text-gray-400 hover:bg-white/5"
                }`}
            >
              {map.label}
            </button>
          ))}
        </aside>

        {/* Map viewer */}
        <main
          className={`flex-1 ${
            ["PYAMSUPVISR", "PYAMEXHANG"].includes(selectedMapId)
              ? "bg-[#080c12]"
              : "bg-[#111219]"
          } rounded-lg border border-gray-700/70 flex items-center justify-center overflow-hidden`}
        >
          {selectedMap ? (
            <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
              <TransformWrapper
                ref={zoomRef}
                initialScale={1}
                minScale={1}
                maxScale={5}
                doubleClick={{ disabled: true }}
                wheel={{ step: 0.5 }}
                pinch={{ disabled: false }}
                panning={{ velocityDisabled: true }}
              >
                <TransformComponent>
                  <img
                    src={selectedMap}
                    alt={selectedMapId}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
          ) : (
            <p className="text-gray-400/70">No map for the selected location yet...</p>
          )}
        </main>
      </div>
      <div className="flex flex-col gap-4 w-full">
        {mapTimers[selectedMapId] ? (
          Object.entries(mapTimers[selectedMapId]).map(([category, timers]) => (
            <ExpandableSection key={category} title={category}>
              {timers.map((timer) => (
                <CountdownTimerCard
                  key={`${selectedMapId}-${timer.id}`}
                  id={`${selectedMapId}-${timer.id}`}
                  title={timer.title}
                  initialDuration={timer.initialDuration}
                />
              ))}
            </ExpandableSection>
          ))
        ) : (
          <div className="text-center text-gray-400">
            No keycards/compboards timers available for this map.
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
