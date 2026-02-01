import * as React from 'react';
import Map, {
  Marker,
  Popup,
  Source,
  Layer
} from 'react-map-gl/maplibre';
import "maplibre-gl/dist/maplibre-gl.css";

interface CityData {
  id: number;
  cityName: string;
  longitude: number;
  latitude: number;
  jobsDone: number;
  trashRecycledKg: number;
}

const cities: CityData[] = [
  { id: 1, cityName: "Belo Horizonte", longitude: -43.9378, latitude: -19.9167, jobsDone: 245, trashRecycledKg: 125000 },
  { id: 2, cityName: "São Paulo", longitude: -46.6333, latitude: -23.5505, jobsDone: 512, trashRecycledKg: 285000 },
  { id: 3, cityName: "Rio de Janeiro", longitude: -43.1729, latitude: -22.9068, jobsDone: 389, trashRecycledKg: 198000 },
  { id: 4, cityName: "Vitória", longitude: -40.3128, latitude: -20.3155, jobsDone: 178, trashRecycledKg: 95000 },
  { id: 5, cityName: "Brasília", longitude: -47.8825, latitude: -15.7942, jobsDone: 156, trashRecycledKg: 82000 },
  { id: 6, cityName: "Boa Vista", longitude: -60.6719, latitude: 2.8197, jobsDone: 0, trashRecycledKg: 0 },
  { id: 7, cityName: "Ji-Paraná", longitude: -61.9411, latitude: -10.8853, jobsDone: 0, trashRecycledKg: 0 },
  { id: 8, cityName: "Brumado", longitude: -41.6653, latitude: -14.2036, jobsDone: 0, trashRecycledKg: 0 },
  { id: 9, cityName: "Várzea Grande", longitude: -56.1322, latitude: -15.6467, jobsDone: 0, trashRecycledKg: 0 },
  { id: 10, cityName: "Conselheiro Pena", longitude: -41.4722, latitude: -19.1789, jobsDone: 0, trashRecycledKg: 0 },
  { id: 11, cityName: "Blumenau", longitude: -49.0661, latitude: -26.9194, jobsDone: 0, trashRecycledKg: 0 },
  { id: 12, cityName: "Itapema", longitude: -48.6128, latitude: -27.0908, jobsDone: 0, trashRecycledKg: 0 },
  { id: 13, cityName: "Juazeiro do Norte", longitude: -39.3153, latitude: -7.2131, jobsDone: 0, trashRecycledKg: 0 },
  { id: 14, cityName: "Belém", longitude: -48.5044, latitude: -1.4558, jobsDone: 0, trashRecycledKg: 0 },
];

export default function Mapa() {
  const [popupInfo, setPopupInfo] = React.useState<CityData | null>(cities[0]);

  // Auto-cycle tooltips effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setPopupInfo((current) => {
        const currentIndex = current ? cities.findIndex(c => c.id === current.id) : -1;
        const nextIndex = (currentIndex + 1) % cities.length;
        return cities[nextIndex];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Disable all interactions to prevent map movement
  const interactiveSettings = {
    scrollZoom: false,
    boxZoom: false,
    dragRotate: false,
    dragPan: false,
    keyboard: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    touchPitch: false
  };

  const getInitialViewState = () => {
    if (typeof window === 'undefined') return { longitude: -54, latitude: -14, zoom: 3.5 };
    const isMobile = window.innerWidth < 768;
    return {
      longitude: -54,
      latitude: -14,
      zoom: isMobile ? 2.4 : 3.5,
      pitch: isMobile ? 45 : 0,
      bearing: isMobile ? -25 : 0
    };
  };

  return (
    <div className="w-full bg-mata-950 relative">
      <div className="w-full px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-12 items-stretch">

          {/* Mobile Map Background (Hidden on Desktop) */}
          <div className="absolute inset-0 z-0 lg:hidden h-[600px]">
            <div className="absolute inset-0 bg-mata-950/70 z-10"></div> {/* Opacity layer */}
            <div className="absolute inset-0 bg-linear-to-b from-mata-950 via-transparent to-mata-950 z-20"></div> {/* Gradient */}
            <Map
              initialViewState={{
                longitude: -54,
                latitude: -14,
                zoom: 3.8, // Mobile zoom
                pitch: 45, // Mobile pitch
                bearing: -25 // Mobile bearing
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="/maps/brasil.json"
              {...interactiveSettings}
              attributionControl={false}
            >
              <Source
                id="br-states-mobile"
                type="geojson"
                data="https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson"
              >
                <Layer
                  id="br-states-line-mobile"
                  type="line"
                  paint={{
                    'line-color': '#ffffff',
                    'line-width': 1,
                    'line-opacity': 0.3
                  }}
                />
              </Source>
              {cities.map((city, index) => (
                <Marker
                  key={`marker-mobile-${index}`}
                  longitude={city.longitude}
                  latitude={city.latitude}
                  anchor="bottom"
                  style={{ opacity: 0.8 }}
                >
                  <div className="group relative">
                    <div className="absolute -inset-2 bg-mata-500/30 rounded-full blur-sm animate-pulse"></div>
                    <svg
                      height={24}
                      viewBox="0 0 24 24"
                      className="fill-mata-500 drop-shadow-lg"
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
              ))}
            </Map>
          </div>

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center relative py-16 lg:py-24 z-30">
            <div className="mb-6 inline-block w-fit group">
              <span className="chip bg-linear-to-r from-mata-400 to-mata-500 text-white text-lg font-semibold shadow-lg shadow-mata-500/20 group-hover:scale-105">
                Faça a Diferença
              </span>
            </div>

            <h2 className="mb-6 text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white block mb-2">Nossos</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-mata-300 via-mata-400 to-mata-500 block">
                Trabalhos
              </span>
            </h2>

            <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8 max-w-lg">
              Estamos presentes em diversas cidades brasileiras, apoiando
              cooperativas, associações de catadores e empresas na elaboração de
              projetos que transformam resíduos em renda, dignidade e
              desenvolvimento sustentável.
            </p>

            {/* Stats or additional info */}
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"></div>
                <span className="text-lg text-white/70 font-medium">
                  Impacto Real
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-lg text-white/70 font-medium">
                  Sustentabilidade
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Map (Desktop Only) */}
          <div className="hidden lg:block w-full h-full min-h-auto relative rounded-2xl overflow-hidden">
            <Map
              initialViewState={getInitialViewState()}
              style={{ width: '100%', height: '100%' }}
              mapStyle="/maps/brasil.json"
              {...interactiveSettings}
              attributionControl={false}
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
                const isActive = popupInfo?.id === city.id;
                return (
                  <Marker
                    key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}
                    anchor="bottom"
                    onClick={e => {
                      e.originalEvent.stopPropagation();
                      setPopupInfo(city);
                    }}
                    style={{ cursor: 'pointer', zIndex: isActive ? 50 : 1 }}
                  >
                    <div className={`group relative cursor-pointer ${isActive ? 'z-10' : 'hover:z-10'}`}>
                      <div className={`absolute -inset-2 bg-mata-500/30 rounded-full blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      <svg
                        height={24}
                        viewBox="0 0 24 24"
                        className={`fill-mata-500 drop-shadow-lg transform transition-transform duration-300 ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}
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

              {popupInfo && (
                <Popup
                  anchor="top"
                  longitude={popupInfo.longitude}
                  latitude={popupInfo.latitude}
                  onClose={() => setPopupInfo(null)}
                  closeButton={false}
                  className="custom-popup z-50"
                  maxWidth="300px"
                >
                  <div className="bg-mata-900 text-white p-2 rounded-lg shadow-xl border border-mata-700 font-sans min-w-[140px]">
                    <div className="mb-1">
                      <h3 className="font-bold text-sm text-white">{popupInfo.cityName}</h3>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mata-400"></div>
                        <span className="text-xs text-gray-300">Jobs:</span>
                        <span className="text-xs font-semibold text-white ml-auto">{popupInfo.jobsDone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mata-400"></div>
                        <span className="text-xs text-gray-300">Reciclado:</span>
                        <span className="text-xs font-semibold text-white ml-auto">
                          {(popupInfo.trashRecycledKg / 1000).toFixed(1)}t
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              )}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}