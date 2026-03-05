import * as React from 'react';
import Map, {
  Marker,
  Popup,
  Source,
  Layer
} from 'react-map-gl/maplibre';
import "maplibre-gl/dist/maplibre-gl.css";
import { SectionDivider } from './SectionDivider';
import { cities, type CityData } from '../../data/cities';
import { useNavigate } from 'react-router-dom';

export default function Mapa() {
  const [popupInfo, setPopupInfo] = React.useState<CityData | null>(cities[0]);
  const navigate = useNavigate();

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
    <div className="w-full bg-mata-950 relative pt-16 pb-16 md:pt-24 md:pb-24">
      <SectionDivider type="waves" position="top" fill="fill-mata-950" />
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
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    navigate(`/${city.state}/${city.slug}`);
                  }}
                >
                  <div className="group relative cursor-pointer z-10">
                    <div className="absolute -inset-2 bg-fluid/30 rounded-full blur-sm animate-pulse"></div>
                    <svg
                      height={24}
                      viewBox="0 0 24 24"
                      className="fill-fluid drop-shadow-lg"
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
              <span className="chip bg-fluid text-mata-950 text-lg font-semibold shadow-lg shadow-fluid/20 group-hover:scale-105 uppercase">
                Faça a Diferença
              </span>
            </div>

            <h2 className="mb-6 text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-limpeza block mb-2">Nossos</span>
              <span className="text-fluid block">
                Trabalhos
              </span>
            </h2>

            <p className="text-xl md:text-2xl leading-relaxed text-limpeza/90 mb-8 max-w-lg">
              Estamos presentes em diversas cidades brasileiras, apoiando
              cooperativas, associações de catadores e empresas na elaboração de
              projetos que transformam resíduos em renda, dignidade e
              desenvolvimento sustentável.
            </p>

            {/* Stats or additional info */}
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-fluid animate-pulse"></div>
                <span className="text-lg text-limpeza/70 font-medium">
                  Impacto Real
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-fluid animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-lg text-limpeza/70 font-medium">
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
                      navigate(`/${city.state}/${city.slug}`);
                    }}
                    style={{ cursor: 'pointer', zIndex: isActive ? 50 : 1 }}
                  >
                    <div
                      className={`group relative cursor-pointer ${isActive ? 'z-10' : 'hover:z-10'}`}
                      onMouseEnter={() => setPopupInfo(city)}
                    >
                      <div className={`absolute -inset-2 bg-fluid/30 rounded-full blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                      <svg
                        height={24}
                        viewBox="0 0 24 24"
                        className={`fill-fluid drop-shadow-lg transform transition-transform duration-300 ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}
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
                  <div className="bg-sustentabilidade text-mata-950 px-4 py-2 rounded-lg shadow-xl font-sans text-center">
                    <h3 className="font-bold text-sm">{popupInfo.cityName}</h3>
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