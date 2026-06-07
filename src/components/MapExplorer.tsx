import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { hubs } from "@/data/hubs";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

// Fix default marker icons
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapExplorer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={[30, 10]}
        zoom={2}
        scrollWheelZoom
        className="w-full h-full"
        style={{ background: "hsl(222 47% 4%)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {hubs.map((hub) => (
          <Marker key={hub.slug} position={[hub.lat, hub.lng]} icon={customIcon}>
            <Popup>
              <div className="p-1 min-w-[180px]">
                <p className="font-medium text-sm">{hub.name}</p>
                <p className="text-xs text-gray-500">{hub.category} · {hub.city}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs">{hub.rating}</span>
                </div>
                <button
                  onClick={() => navigate(`/hub/${hub.slug}`)}
                  className="mt-2 text-xs text-blue-500 hover:underline"
                >
                  View Details →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapExplorer;
