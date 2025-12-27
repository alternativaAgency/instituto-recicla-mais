import { useState, useEffect, useRef } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl/maplibre";
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
  zoom: 3,
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
  const [anchorPositions, setAnchorPositions] = useState<
    Record<
      number,
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "center"
    >
  >({});

  const mobileBorderRadius = "78% 67% 100% 56% / 96% 99% 60% 50%";
  const desktopBorderRadius = "44% 46% 75% 64% / 43% 58% 88% 100%";
  const borderRadius = isMobile ? mobileBorderRadius : desktopBorderRadius;

  // Always show all cities for tooltips
  const visibleCities = cities;

  // Ensure we always have a current city to display (moved up for useEffect dependency)
  const currentCity =
    visibleCities.length > 0
      ? visibleCities[currentTooltipIndex % visibleCities.length]
      : cities[0];

  // Calculate anchor positions based on map bounds
  useEffect(() => {
    if (!mapRef.current) return;

    try {
      const map = mapRef.current.getMap();
      if (!map || !map.loaded()) return;

      const bounds = map.getBounds();
      const container = map.getContainer();
      if (!bounds || !container) return;

      const containerRect = container.getBoundingClientRect();
      const mapWidth = containerRect.width;
      const mapHeight = containerRect.height;

      // Estimate tooltip size
      const tooltipWidth = 380;
      const tooltipHeight = 50;
      const offset = 15;

      const newAnchors: Record<
        number,
        | "top"
        | "bottom"
        | "left"
        | "right"
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right"
        | "center"
      > = {};

      cities.forEach((city) => {
        try {
          const point = map.project([city.longitude, city.latitude]);

          const distanceFromLeft = point.x;
          const distanceFromRight = mapWidth - point.x;
          const distanceFromTop = point.y;
          const distanceFromBottom = mapHeight - point.y;

          const canFitLeft = distanceFromLeft > tooltipWidth + offset;
          const canFitRight = distanceFromRight > tooltipWidth + offset;
          const canFitTop = distanceFromTop > tooltipHeight + offset;
          const canFitBottom = distanceFromBottom > tooltipHeight + offset;

          const minHorizontalDistance = Math.min(
            distanceFromLeft,
            distanceFromRight
          );
          const minVerticalDistance = Math.min(
            distanceFromTop,
            distanceFromBottom
          );

          if (minHorizontalDistance < minVerticalDistance) {
            // City is closer to left or right edge
            if (distanceFromRight < distanceFromLeft) {
              // Closer to right edge - place tooltip to the left
              newAnchors[city.id] = canFitLeft
                ? "right"
                : canFitBottom
                ? "top"
                : "bottom";
            } else {
              // Closer to left edge - place tooltip to the right
              newAnchors[city.id] = canFitRight
                ? "left"
                : canFitBottom
                ? "top"
                : "bottom";
            }
          } else {
            // City is closer to top or bottom edge
            if (distanceFromBottom < distanceFromTop) {
              // Closer to bottom edge - place tooltip above
              newAnchors[city.id] = canFitTop
                ? "bottom"
                : canFitRight
                ? "left"
                : "right";
            } else {
              // Closer to top edge - place tooltip below
              newAnchors[city.id] = canFitBottom
                ? "top"
                : canFitRight
                ? "left"
                : "right";
            }
          }
        } catch {
          newAnchors[city.id] = "bottom";
        }
      });

      // Defer state update to avoid synchronous setState in effect
      requestAnimationFrame(() => {
        setAnchorPositions((prev) => {
          const hasChanged =
            Object.keys(newAnchors).some(
              (key) => prev[Number(key)] !== newAnchors[Number(key)]
            ) || Object.keys(prev).length !== Object.keys(newAnchors).length;

          return hasChanged ? newAnchors : prev;
        });
      });
    } catch (error) {
      console.error("Error calculating anchor positions:", error);
    }
  }, [viewState]);

  // Loop through visible cities automatically
  useEffect(() => {
    if (visibleCities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTooltipIndex(
        (prevIndex) => (prevIndex + 1) % visibleCities.length
      );
    }, 3000); // Change tooltip every 3 seconds

    return () => clearInterval(interval);
  }, [visibleCities.length]);

  // Format number with thousands separator (kept for future use)
  // const formatNumber = (num: number): string => {
  //   return num.toLocaleString('pt-BR');
  // };

  // Get anchor position for current city
  const getAnchorPosition = (
    city: CityData
  ):
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center" => {
    const calculated = anchorPositions[city.id] || "bottom";
    // Prefer side positions (left/right), otherwise use bottom
    if (calculated === "left" || calculated === "right") {
      return calculated;
    }
    return "bottom";
  };

  return (
    <div className="w-full bg-mata-950">
      {/* Top spacing */}
      <div className="flex h-24 items-center justify-center bg-linear-to-b from-mata-950 to-transparent border-t border-mata-950"></div>

      <div className="relative overflow-hidden bg-mata-950">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-mata-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-mata-300 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.9fr] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[calc(100dvh-5rem)] max-h-[800px] md:max-h-none relative z-10">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:px-12 relative">
            {/* Subtle accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-mata-400/30 to-transparent"></div>

            <div className="mb-6 sm:mb-6 md:mb-8 inline-block w-fit group">
              <span className="chip bg-linear-to-r from-mata-400 to-mata-500 text-white shadow-lg shadow-mata-500/20 group-hover:scale-105">
                Faça a Diferença
              </span>
            </div>

            <h2 className="mb-6 sm:mb-6 md:mb-8 text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white block mb-2 sm:mb-2">Nossos</span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-mata-300 via-mata-400 to-mata-500 block">
                Trabalhos
              </span>
            </h2>

            <p className="max-w-lg text-base sm:text-base md:text-lg leading-relaxed text-white/90 mb-6 sm:mb-6 md:mb-8">
              Estamos presentes em diversas cidades brasileiras, apoiando
              cooperativas, associações de catadores e empresas na elaboração de
              projetos que transformam resíduos em renda, dignidade e
              desenvolvimento sustentável.
            </p>

            {/* Stats or additional info */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"></div>
                <span className="text-sm sm:text-sm text-white/70 font-medium">
                  Impacto Real
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-sm sm:text-sm text-white/70 font-medium">
                  Sustentabilidade
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center overflow-visible p-1 sm:p-2 md:p-4 h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto">
            {/* Gradient border wrapper */}
            <div
              className="relative w-full h-full"
              style={{
                borderRadius: borderRadius,
                padding: "2px",
                background: "linear-gradient(to right, #3fa86e 0%, transparent 100%)",
              }}
            >
              {/* Map container with blob border-radius */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: borderRadius,
                }}
              >
                <Map
                  ref={mapRef}
                  {...viewState}
                  onMove={(evt) => setViewState(evt.viewState)}
                  {...settings}
                  mapStyle="/maps/positron-style.json"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                    borderRadius: borderRadius,
                    overflow: "hidden",
                  }}
                  attributionControl={false}
                  reuseMaps={true}
                >
                {/* Countries fill layer - Brazil in limpeza color, others in ocean color */}
                <Source
                  id="countries"
                  type="geojson"
                  data="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
                >
                  <Layer
                    id="countries-fill"
                    type="fill"
                    beforeId="boundary_country_outline"
                    paint={{
                      "fill-color": [
                        "case",
                        [
                          "any",
                          ["==", ["downcase", ["get", "name"]], "brazil"],
                          ["==", ["downcase", ["get", "name"]], "brasil"],
                          ["==", ["downcase", ["get", "NAME"]], "brazil"],
                          ["==", ["downcase", ["get", "NAME"]], "brasil"],
                          ["==", ["downcase", ["get", "NAME_EN"]], "brazil"],
                          ["==", ["downcase", ["get", "NAME_EN"]], "brasil"],
                          ["==", ["downcase", ["get", "NAME_LONG"]], "brazil"],
                          ["==", ["downcase", ["get", "NAME_LONG"]], "brasil"]
                        ],
                        "#ede7e7", // limpeza color for Brazil
                        "#012338" // ocean color for other countries
                      ],
                      "fill-opacity": 0.6
                    }}
                  />
                  <Layer
                    id="countries-outline"
                    type="line"
                    paint={{
                      "line-color": [
                        "case",
                        [
                          "any",
                          ["==", ["downcase", ["get", "name"]], "brazil"],
                          ["==", ["downcase", ["get", "name"]], "brasil"],
                          ["==", ["downcase", ["get", "NAME"]], "brazil"],
                          ["==", ["downcase", ["get", "NAME"]], "brasil"],
                          ["==", ["downcase", ["get", "NAME_EN"]], "brazil"],
                          ["==", ["downcase", ["get", "NAME_EN"]], "brasil"],
                          ["==", ["downcase", ["get", "NAME_LONG"]], "brazil"],
                          ["==", ["downcase", ["get", "NAME_LONG"]], "brasil"]
                        ],
                        "#ede7e7", // limpeza color for Brazil
                        "#012338" // ocean color for other countries
                      ],
                      "line-width": 1.5,
                      "line-opacity": 0.7
                    }}
                  />
                </Source>

                {/* City markers */}
                <Source
                  id="city-markers"
                  type="geojson"
                  data={{
                    type: "FeatureCollection",
                    features: cities.map((city) => ({
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [city.longitude, city.latitude],
                      },
                      properties: {
                        id: city.id,
                        isActive: currentCity?.id === city.id,
                      },
                    })),
                  }}
                >
                  {/* Outer glow for active tooltip */}
                  <Layer
                    id="city-markers-glow"
                    type="circle"
                    filter={["==", ["get", "isActive"], true]}
                    paint={{
                      "circle-radius": 15,
                      "circle-color": "#3fa86e", // mata-500 equivalent
                      "circle-opacity": 0.3,
                    }}
                  />
                  {/* City markers */}
                  <Layer
                    id="city-markers-points"
                    type="circle"
                    paint={{
                      "circle-radius": 6, // Same size for all markers
                      "circle-color": [
                        "case",
                        ["==", ["get", "isActive"], true],
                        "#3fa86e", // mata-500 equivalent - Active color
                        "#6b7280", // gray-500 - Inactive color
                      ],
                      "circle-stroke-width": 2,
                      "circle-stroke-color": "#ffffff",
                      "circle-opacity": 0.9,
                    }}
                  />
                </Source>

                {/* Looping Tooltip - Show only current city */}
                {currentCity && (
                  <Popup
                    key="city-popup"
                    longitude={currentCity.longitude}
                    latitude={currentCity.latitude}
                    closeButton={false}
                    closeOnClick={false}
                    anchor={getAnchorPosition(currentCity)}
                    offset={[0, -10]}
                    maxWidth={isMobile ? "280px" : "380px"}
                  >
                    <div
                      key={currentCity.id}
                      style={{
                        padding: 0,
                        backgroundColor: "transparent",
                        fontFamily:
                          "ObjectSans, system-ui, -apple-system, sans-serif",
                        overflow: "visible",
                        animation:
                          "popupFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      }}
                    >
                      {/* Enhanced Tooltip Design */}
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 18px",
                          background:
                            "linear-gradient(135deg, #3fa86e 0%, #2f8a58 100%)",
                          borderRadius: "12px",
                          boxShadow:
                            "0 8px 24px rgba(63, 168, 110, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)",
                          border: "none",
                          backdropFilter: "blur(10px)",
                          overflow: "visible",
                        }}
                      >
                        {/* Shine effect overlay */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            background:
                              "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)",
                            borderRadius: "12px 12px 0 0",
                            pointerEvents: "none",
                          }}
                        />

                        {/* City Name */}
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#ffffff",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                            letterSpacing: "0.3px",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {currentCity.cityName}
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
      </div>

      {/* Bottom spacing */}
      <div className="flex h-24 items-center justify-center bg-linear-to-t from-mata-950 to-transparent border-b border-mata-950"></div>
    </div>
  );
}
