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
    longitude: -44.5,
    latitude: -17.5,
    zoom: 6,
    pitch: 45,
    bearing: -25,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
};

// City data array - you can modify these with your actual city data
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
    cityName: 'Curitiba',
    longitude: -49.2733,
    latitude: -25.4284,
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

export default function MapComponent() {
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
  const [visibleCities, setVisibleCities] = useState<CityData[]>(cities); // Start with all cities
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filter cities to only show those visible in the current viewport
  useEffect(() => {
    // For now, always show all cities to ensure tooltips display
    // You can re-enable visibility filtering later if needed
    setVisibleCities(cities);
    
    // Uncomment below to enable visibility filtering:
    /*
    if (!mapRef.current || !mapLoaded) {
      setVisibleCities(cities);
      return;
    }

    const map = mapRef.current.getMap();
    if (!map || !map.loaded()) {
      setVisibleCities(cities);
      return;
    }

    try {
      const bounds = map.getBounds();
      if (!bounds) {
        setVisibleCities(cities);
        return;
      }
      
      const visible = cities.filter(city => {
        try {
          return bounds.contains([city.longitude, city.latitude]);
        } catch {
          return true;
        }
      });

      setVisibleCities(visible.length > 0 ? visible : cities);
      
      if (visible.length > 0 && currentTooltipIndex >= visible.length) {
        setCurrentTooltipIndex(0);
      }
    } catch (error) {
      console.error('Error checking bounds:', error);
      setVisibleCities(cities);
    }
    */
  }, [viewState, mapLoaded]);

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
    : cities[0]; // Fallback to first city if somehow empty

  // Format number with thousands separator
  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-BR');
  };

  // Debug: Log current state (remove in production)
  useEffect(() => {
    if (currentCity) {
      console.log('Current city for tooltip:', currentCity.cityName, 'at', currentCity.longitude, currentCity.latitude);
    }
  }, [currentCity]);


  return (
    <div className="w-full relative h-[600px] min-h-[400px] md:h-[calc(100dvh-5rem)] max-h-[800px] cursor-default">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onLoad={() => {
          setMapLoaded(true);
          console.log('Map loaded, should show tooltips');
        }}
        {...settings}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
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
              'circle-radius': [
                'case',
                ['==', ['get', 'isActive'], true],
                10, // Larger for active
                6   // Smaller for inactive
              ],
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

        {/* Test Popup - Always show first city to verify Popup works */}
        <Popup
          longitude={cities[0].longitude}
          latitude={cities[0].latitude}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"
        >
          <div style={{ color: 'black', padding: '10px', backgroundColor: 'yellow' }}>
            TEST: {cities[0].cityName}
          </div>
        </Popup>

        {/* Looping Tooltip - Show only current city */}
        {currentCity && (
          <Popup
            key={`popup-${currentCity.id}-${currentTooltipIndex}`}
            longitude={currentCity.longitude}
            latitude={currentCity.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            offset={[0, -10]}
          >
            <div style={{ 
              color: '#000000', 
              padding: '12px',
              minWidth: '240px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #e5e7eb',
                color: '#111827',
                margin: '0 0 12px 0'
              }}>
                {currentCity.cityName}
              </h3>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px'
              }}>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Trabalhos realizados:</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>
                    {formatNumber(currentCity.jobsDone)}
                  </span>
                </div>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#4b5563' }}>Lixo reciclado:</span>
                  <span style={{ fontWeight: '600', color: '#3fa86e' }}>
                    {formatNumber(currentCity.trashRecycledKg)} kg
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}