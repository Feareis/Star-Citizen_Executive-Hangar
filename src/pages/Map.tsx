import { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AlertCard } from "@components/card/AlertCard";
import { mapsAssets } from "@assets/images/map";
import { Info } from "lucide-react";

const mapList = [
  { id: "CHECKMATE", label: "Checkmate" },
  { id: "ORBITUARY", label: "Orbituary" },
  { id: "RUINSTATION", label: "Ruin Station" },
  { id: "PYAMSUPVISR", label: "Supervisor" },
  { id: "PYAMEXHANG", label: "Executive Hangar" },
];

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
    <div className="flex flex-col h-full">
      <AlertCard variant="warning" title="You can zoom on map" textSize="text-base" icon={<Info size={20} />} />
      {/* Sidebar */}
      <div className="flex gap-3">
      <aside className="w-60 bg-[#212526] border border-gray-700/70 rounded-lg p-4 space-y-3">
        <h2 className="text-xl text-center font-bold mb-4 text-white">CZ Maps</h2>
        {mapList.map((map) => (
          <button
            key={map.id}
            onClick={() => setSelectedMapId(map.id)}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200
              ${
                selectedMapId === map.id
                  ? "bg-white/10 text-white font-semibold"
                  : "text-gray-400 hover:bg-white/5"
              }`}
          >
            {map.label}
          </button>
        ))}
      </aside>

      {/* Map viewer */}
      <main className="flex-1 bg-[#212526] rounded-lg border border-gray-700/70 flex items-center justify-center overflow-hidden">
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
    </div>
  );
};

export default Maps;
