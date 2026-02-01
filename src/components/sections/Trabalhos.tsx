import { useState, useEffect, useRef } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl/maplibre";
import type { ViewState, MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useIsMobile } from "@/hooks/useIsMobile";

interface MapSettings {
  scrollZoom: boolean;
  boxZoom: boolean;
  dragRotate: boolean;
  dragPan: boolean;
  keyboard: boolean;
  doubleClickZoom: boolean;
  touchZoomRotate: boolean;
  touchPitch: boolean;
  minZoom: number;
  maxZoom: number;
  minPitch: number;
  maxPitch: number;
}

interface CityData {
  id: number;
  cityName: string;
  longitude: number;
  latitude: number;
  jobsDone: number;
  trashRecycledKg: number;
}

const initialViewStateDesktop: ViewState = {
  longitude: -52.3,
  latitude: -12.8,
  zoom: 4.2,
  pitch: 0,
  bearing: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

const initialViewStateMobile: ViewState = {
  longitude: -49.3,
  latitude: -16.2,
  zoom: 3.8,
  pitch: 45,
  bearing: -25,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

// City data array
const cities: CityData[] = [
  {
    id: 1,
    cityName: "Belo Horizonte",
    longitude: -43.9378,
    latitude: -19.9167,
    jobsDone: 245,
    trashRecycledKg: 125000,
  },
  {
    id: 2,
    cityName: "São Paulo",
    longitude: -46.6333,
    latitude: -23.5505,
    jobsDone: 512,
    trashRecycledKg: 285000,
  },
  {
    id: 3,
    cityName: "Rio de Janeiro",
    longitude: -43.1729,
    latitude: -22.9068,
    jobsDone: 389,
    trashRecycledKg: 198000,
  },
  {
    id: 4,
    cityName: "Vitória",
    longitude: -40.3128,
    latitude: -20.3155,
    jobsDone: 178,
    trashRecycledKg: 95000,
  },
  {
    id: 5,
    cityName: "Brasília",
    longitude: -47.8825,
    latitude: -15.7942,
    jobsDone: 156,
    trashRecycledKg: 82000,
  },
  {
    id: 6,
    cityName: "Boa Vista",
    longitude: -60.6719,
    latitude: 2.8197,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 7,
    cityName: "Ji-Paraná",
    longitude: -61.9411,
    latitude: -10.8853,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 8,
    cityName: "Brumado",
    longitude: -41.6653,
    latitude: -14.2036,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 9,
    cityName: "Várzea Grande",
    longitude: -56.1322,
    latitude: -15.6467,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 10,
    cityName: "Conselheiro Pena",
    longitude: -41.4722,
    latitude: -19.1789,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 11,
    cityName: "Blumenau",
    longitude: -49.0661,
    latitude: -26.9194,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 12,
    cityName: "Itapema",
    longitude: -48.6128,
    latitude: -27.0908,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 13,
    cityName: "Juazeiro do Norte",
    longitude: -39.3153,
    latitude: -7.2131,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
  {
    id: 14,
    cityName: "Belém",
    longitude: -48.5044,
    latitude: -1.4558,
    jobsDone: 0,
    trashRecycledKg: 0,
  },
];

export default function Globe() {
  const mapRef = useRef<MapRef>(null);
  const isMobile = useIsMobile();
  const [settings] = useState<MapSettings>({
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    touchPitch: false,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
  });
  // Initialize with desktop, then update when isMobile is determined
  const [viewState, setViewState] = useState<ViewState>(
    initialViewStateDesktop
  );

  // Update viewState when isMobile changes (after initial detection)
  // This is necessary because useIsMobile updates asynchronously after mount
  useEffect(() => {
    setViewState(isMobile ? initialViewStateMobile : initialViewStateDesktop);
  }, [isMobile]);

  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);




  // Always show all cities for tooltips
  const visibleCities = cities;

  // Ensure we always have a current city to display (moved up for useEffect dependency)
  const currentCity =
    visibleCities.length > 0
      ? visibleCities[currentTooltipIndex % visibleCities.length]
      : cities[0];



  useEffect(() => {
    if (visibleCities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTooltipIndex(
        (prevIndex) => (prevIndex + 1) % visibleCities.length
      );
    }, 3000); // Change tooltip every 3 seconds

    return () => clearInterval(interval);
  }, [visibleCities.length]);



  return (
    <div className="w-full bg-mata-950 relative">
      <div className="flex h-24 items-center justify-center bg-linear-to-b from-mata-950 to-transparent border-t border-mata-950 relative z-20"></div>

      <div className="relative overflow-hidden w-full min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-70">
          <Map
            ref={mapRef}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            {...settings}
            mapStyle="/maps/brasil.json"
            style={{
              width: "100%",
              height: "100%",
            }}
            attributionControl={false}
            reuseMaps={true}
          >
            <Source
              id="br-states"
              type="geojson"
              data="https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson"
            >
              <Layer
                id="br-states-line"
                type="line"
                paint={{
                  'line-color': '#ffffff',
                  'line-width': 1,
                  'line-opacity': 0.3
                }}
              />
            </Source>

            {cities.map((city, index) => {
              const isActive = currentCity?.id === city.id;
              return (
                <Marker
                  key={`marker-${index}`}
                  longitude={city.longitude}
                  latitude={city.latitude}
                  anchor="bottom"
                  style={{ cursor: 'default', zIndex: isActive ? 50 : 1 }}
                >
                  <div className={`group relative ${isActive ? 'z-10' : ''}`}>
                    <div className={`absolute -inset-2 bg-mata-500/30 rounded-full blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <svg
                      height={24}
                      viewBox="0 0 24 24"
                      className={`fill-mata-500 drop-shadow-lg transform transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}
                      style={{
                        stroke: 'white',
                        strokeWidth: '1.5px',
                      }}
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" fill="white" />
                    </svg>
                  </div>
                </Marker>
              );
            })}
          </Map>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 z-10 bg-linear-to-r from-mata-950 via-mata-950/80 to-transparent pointer-events-none"></div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-2xl">
            {/* Subtle accent line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-mata-400/30 to-transparent"></div>

            <div className="pl-6 md:pl-8">
              <div className="mb-6 inline-block w-fit group">
                <span className="chip bg-linear-to-r from-mata-400 to-mata-500 text-white shadow-lg shadow-mata-500/20 group-hover:scale-105">
                  Faça a Diferença
                </span>
              </div>

              <h2 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white block mb-2">Nossos</span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-mata-300 via-mata-400 to-mata-500 block">
                  Trabalhos
                </span>
              </h2>

              <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-8 max-w-lg">
                Estamos presentes em diversas cidades brasileiras, apoiando
                cooperativas, associações de catadores e empresas na elaboração de
                projetos que transformam resíduos em renda, dignidade e
                desenvolvimento sustentável.
              </p>

              {/* Stats or additional info */}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"></div>
                  <span className="text-sm text-white/70 font-medium">
                    Impacto Real
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span className="text-sm text-white/70 font-medium">
                    Sustentabilidade
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="flex h-24 items-center justify-center bg-linear-to-t from-mata-950 to-transparent border-b border-mata-950 relative z-20"></div>
    </div>
  );
}
