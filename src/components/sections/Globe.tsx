import { useState, useEffect, useRef } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl/maplibre';
import type { ViewState, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

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

const initialViewState: ViewState = {
    longitude: -45.3,
    latitude: -19.2,
    zoom: 6,
    pitch: 45,
    bearing: -25,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
};

// City data array
const cities: CityData[] = [
  {
    id: 1,
    cityName: 'Belo Horizonte',
    longitude: -43.9378,
    latitude: -19.9167,
    jobsDone: 245,
    trashRecycledKg: 125000
  },
  {
    id: 2,
    cityName: 'São Paulo',
    longitude: -46.6333,
    latitude: -23.5505,
    jobsDone: 512,
    trashRecycledKg: 285000
  },
  {
    id: 3,
    cityName: 'Rio de Janeiro',
    longitude: -43.1729,
    latitude: -22.9068,
    jobsDone: 389,
    trashRecycledKg: 198000
  },
  {
    id: 4,
    cityName: 'Vitória',
    longitude: -40.3128,
    latitude: -20.3155,
    jobsDone: 178,
    trashRecycledKg: 95000
  },
  {
    id: 5,
    cityName: 'Brasília',
    longitude: -47.8825,
    latitude: -15.7942,
    jobsDone: 156,
    trashRecycledKg: 82000
  }
];

export default function Globe() {
  const mapRef = useRef<MapRef>(null);
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
    maxPitch: 85
  });
  const [viewState, setViewState] = useState<ViewState>(initialViewState);
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);
  const [anchorPositions, setAnchorPositions] = useState<Record<number, 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'>>({});
  
  // Always show all cities for tooltips
  const visibleCities = cities;

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

      const newAnchors: Record<number, 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'> = {};

      cities.forEach(city => {
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
          
          const minHorizontalDistance = Math.min(distanceFromLeft, distanceFromRight);
          const minVerticalDistance = Math.min(distanceFromTop, distanceFromBottom);
          
          if (minHorizontalDistance < minVerticalDistance) {
            // City is closer to left or right edge
            if (distanceFromRight < distanceFromLeft) {
              // Closer to right edge - place tooltip to the left
              newAnchors[city.id] = canFitLeft ? 'right' : (canFitBottom ? 'top' : 'bottom');
            } else {
              // Closer to left edge - place tooltip to the right
              newAnchors[city.id] = canFitRight ? 'left' : (canFitBottom ? 'top' : 'bottom');
            }
          } else {
            // City is closer to top or bottom edge
            if (distanceFromBottom < distanceFromTop) {
              // Closer to bottom edge - place tooltip above
              newAnchors[city.id] = canFitTop ? 'bottom' : (canFitRight ? 'left' : 'right');
            } else {
              // Closer to top edge - place tooltip below
              newAnchors[city.id] = canFitBottom ? 'top' : (canFitRight ? 'left' : 'right');
            }
          }
        } catch {
          newAnchors[city.id] = 'bottom';
        }
      });

      // Defer state update to avoid synchronous setState in effect
      requestAnimationFrame(() => {
        setAnchorPositions(prev => {
          const hasChanged = Object.keys(newAnchors).some(
            key => prev[Number(key)] !== newAnchors[Number(key)]
          ) || Object.keys(prev).length !== Object.keys(newAnchors).length;
          
          return hasChanged ? newAnchors : prev;
        });
      });
    } catch (error) {
      console.error('Error calculating anchor positions:', error);
    }
  }, [viewState]);

  // Loop through visible cities automatically
  useEffect(() => {
    if (visibleCities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTooltipIndex((prevIndex) => (prevIndex + 1) % visibleCities.length);
    }, 3000); // Change tooltip every 3 seconds

    return () => clearInterval(interval);
  }, [visibleCities.length]);

  // Ensure we always have a current city to display
  const currentCity = visibleCities.length > 0 
    ? visibleCities[currentTooltipIndex % visibleCities.length] 
    : cities[0];

  // Format number with thousands separator
  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-BR');
  };

  // Get anchor position for current city
  const getAnchorPosition = (city: CityData): 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' => {
    return anchorPositions[city.id] || 'bottom';
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
        
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_2.3fr] min-h-[600px] md:min-h-[calc(100dvh-5rem)] max-h-[800px] relative z-10">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center px-6 py-10 md:px-8 md:py-12 lg:px-12 relative">
          {/* Subtle accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-mata-400/30 to-transparent"></div>
          
          <div className="mb-8 inline-block w-fit group">
            <span className="inline-block rounded-full bg-linear-to-r from-mata-400 to-mata-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-mata-500/20 transition-transform duration-300 group-hover:scale-105">
              Faça a Diferença
            </span>
          </div>
          
          <h2 className="mb-8 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-white block mb-2">Nossos</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-mata-300 via-mata-400 to-mata-500 block">
              Trabalhos
            </span>
          </h2>
          
          <p className="max-w-lg text-base leading-relaxed text-white/90 md:text-lg mb-8">
            Acompanhe nosso impacto nas cidades onde transformamos resíduos em resultados sustentáveis através de trabalhos realizados em todo o país.
          </p>
          
          {/* Stats or additional info */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mata-400 animate-pulse"></div>
              <span className="text-sm text-white/70 font-medium">Impacto Real</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mata-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-sm text-white/70 font-medium">Sustentabilidade</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-visible p-2 md:p-4">

          {/* Map container with blob border-radius */}
          <div 
            className="relative w-full h-full z-0 overflow-hidden"
            style={{
              borderRadius: '90% 56% 100% 39% / 85% 53% 60% 49%',
            }}
          >
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            {...settings}
            mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            style={{ 
              width: '100%', 
              height: '100%', 
              position: 'relative', 
              zIndex: 1,
              borderRadius: '90% 56% 100% 39% / 85% 53% 60% 49%',
              overflow: 'hidden'
            }}
            attributionControl={false}
            reuseMaps={true}
          >
            {/* City markers */}
            <Source 
              id="city-markers" 
              type="geojson" 
              data={{
                type: 'FeatureCollection',
                features: cities.map(city => ({
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [city.longitude, city.latitude]
                  },
                  properties: {
                    id: city.id,
                    isActive: currentCity?.id === city.id
                  }
                }))
              }}
            >
              {/* Outer glow for active tooltip */}
              <Layer
                id="city-markers-glow"
                type="circle"
                filter={['==', ['get', 'isActive'], true]}
                paint={{
                  'circle-radius': 15,
                  'circle-color': '#3fa86e', // mata-500 equivalent
                  'circle-opacity': 0.3
                }}
              />
              {/* City markers */}
              <Layer
                id="city-markers-points"
                type="circle"
                paint={{
                  'circle-radius': 6,  // Same size for all markers
                  'circle-color': [
                    'case',
                    ['==', ['get', 'isActive'], true],
                    '#3fa86e', // mata-500 equivalent - Active color
                    '#6b7280'  // gray-500 - Inactive color
                  ],
                  'circle-stroke-width': 2,
                  'circle-stroke-color': '#ffffff',
                  'circle-opacity': 0.9
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
                maxWidth="380px"
              >
                <div 
                  key={currentCity.id}
                  style={{ 
                    padding: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Montserrat, system-ui, -apple-system, sans-serif',
                    overflow: 'hidden',
                    border: '1px solid rgba(63, 168, 110, 0.1)',
                    animation: 'popupFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  }}
                >
                  {/* Compact single line layout */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    background: 'linear-gradient(135deg, #3fa86e 0%, #2f8a58 100%)'
                  }}>
                    {/* City Name */}
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#ffffff',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {currentCity.cityName}
                    </div>
                    
                    {/* Divider */}
                    <div style={{
                      width: '1px',
                      height: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      flexShrink: 0
                    }} />
                    
                    {/* Jobs Done - Compact */}
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        color: 'rgba(255, 255, 255, 0.75)'
                      }}>
                        Trabalhos:
                      </span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#ffffff',
                        lineHeight: '1'
                      }}>
                        {formatNumber(currentCity.jobsDone)}
                      </span>
                    </div>
                    
                    {/* Divider */}
                    <div style={{
                      width: '1px',
                      height: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      flexShrink: 0
                    }} />
                    
                    {/* Recycled Trash - Compact */}
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        color: 'rgba(255, 255, 255, 0.75)'
                      }}>
                        Reciclado:
                      </span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#ffffff',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '2px'
                      }}>
                        {formatNumber(currentCity.trashRecycledKg)}
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.9)'
                        }}>kg</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
          </div>

          {/* Blob border overlay */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            style={{
              borderRadius: '90% 56% 100% 39% / 85% 53% 60% 49%',
              border: '2px solid #3fa86e',
              opacity: 0.9,
            }}
          />
        </div>
        </div>
      </div>
      
      {/* Bottom spacing */}
      <div className="flex h-24 items-center justify-center bg-linear-to-t from-mata-950 to-transparent border-b border-mata-950"></div>
    </div>
  );
}