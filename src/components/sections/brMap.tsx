import { useState, useMemo, useEffect, useRef } from 'react';

// 1. Core Imports from react-map-gl
import Map, { 
  Source, 
  Layer, 
  Popup 
} from 'react-map-gl/maplibre';
import type { MapLayerMouseEvent, MapRef } from 'react-map-gl/maplibre';

// 2. Import the MapLibre CSS (Crucial for the map to look right)
import 'maplibre-gl/dist/maplibre-gl.css';

// 3. Import your GeoJSON data as URL
import brazilGeoJsonUrl from '../../types/data/brazil-states.geojson?url'; 

// Tooltip data structure
interface TooltipData {
  id: number;
  longitude: number;
  latitude: number;
  number: string;
  text: string;
  link?: string;
  linkText?: string;
}

export default function BrazilMap() {
  const mapRef = useRef<MapRef>(null);
  const [activeStateId, setActiveStateId] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{lng: number, lat: number, name: string} | null>(null);
  const [brazilGeoJson, setBrazilGeoJson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);
  const [visibleTooltips, setVisibleTooltips] = useState<TooltipData[]>([]);
  const [viewState, setViewState] = useState({
    longitude: -44.5,
    latitude: -19.5,
    zoom: 7,
    pitch: 45,
    bearing: -25
  });

  // Define your tooltip data array - all within Minas Gerais state
  const tooltips: TooltipData[] = [
    {
      id: 1,
      longitude: -44.0,
      latitude: -19.9, // Belo Horizonte area
      number: "1,234",
      text: "Recycling centers in operation",
      link: "https://example.com/centers",
      linkText: "View details"
    },
    {
      id: 2,
      longitude: -43.9,
      latitude: -20.3, // South of Belo Horizonte
      number: "567",
      text: "Tons recycled this month",
      link: "https://example.com/stats",
      linkText: "See statistics"
    },
    {
      id: 3,
      longitude: -45.4,
      latitude: -19.8, // West of Belo Horizonte
      number: "89%",
      text: "Recycling rate increase",
      link: "https://example.com/report",
      linkText: "Read report"
    },
    {
      id: 4,
      longitude: -44.2,
      latitude: -18.9, // North of Belo Horizonte
      number: "2,500+",
      text: "Active participants",
      link: "https://example.com/participants",
      linkText: "Learn more"
    },
    {
      id: 5,
      longitude: -43.1,
      latitude: -20.1, // East of Belo Horizonte
      number: "150",
      text: "Collection points",
      link: "https://example.com/collection",
      linkText: "View map"
    },
  ];

  // Load GeoJSON data
  useEffect(() => {
    fetch(brazilGeoJsonUrl)
      .then(res => res.json())
      .then(data => {
        setBrazilGeoJson(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading GeoJSON:', err);
        setLoading(false);
      });
  }, []);

  // Filter tooltips to only show those visible in the current viewport
  useEffect(() => {
    if (!mapRef.current || loading) return;

    const map = mapRef.current.getMap();
    if (!map.loaded()) return;

    const bounds = map.getBounds();
    
    const visible = tooltips.filter(tooltip => {
      return bounds.contains([tooltip.longitude, tooltip.latitude]);
    });

    setVisibleTooltips(visible);
    
    // Reset index if current tooltip is no longer visible
    if (visible.length > 0 && currentTooltipIndex >= visible.length) {
      setCurrentTooltipIndex(0);
    } else if (visible.length === 0) {
      setCurrentTooltipIndex(0);
    }
  }, [viewState, tooltips, loading]);

  // Loop through visible tooltips automatically
  useEffect(() => {
    if (visibleTooltips.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTooltipIndex((prevIndex) => (prevIndex + 1) % visibleTooltips.length);
    }, 3000); // Change tooltip every 3 seconds

    return () => clearInterval(interval);
  }, [visibleTooltips.length]);

  // 4. Style Logic: Highlights the active state in Blue, others in Gray
  const layerStyle = useMemo(() => ({
    id: 'state-fills',
    type: 'fill' as const,
    paint: {
      'fill-color': [
        'case',
        ['==', ['get', 'name'], activeStateId || ''], // Check if feature name matches active ID
        '#00BFFF', // Highlight Color (Blue)
        '#D6D6DA'  // Default Color (Gray)
      ],
      'fill-opacity': 0.8,
      'fill-outline-color': '#ffffff'
    }
  }), [activeStateId]);

  // Interaction Handler
  const onHover = (event: MapLayerMouseEvent) => {
    const feature = event.features && event.features[0];
    
    if (feature) {
      setActiveStateId(feature.properties?.name);
      setHoverInfo({
        lng: event.lngLat.lng,
        lat: event.lngLat.lat,
        name: feature.properties?.name || 'Unknown'
      });
    } else {
      setActiveStateId(null);
      setHoverInfo(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[600px] min-h-[400px] md:h-[calc(100vh-5rem)] max-h-[800px]">
        Loading map...
      </div>
    );
  }

  if (!brazilGeoJson) {
    return (
      <div className="flex items-center justify-center w-full h-[600px] min-h-[400px] md:h-[calc(100vh-5rem)] max-h-[800px]">
        Error loading map data
      </div>
    );
  }

  const currentTooltip = visibleTooltips[currentTooltipIndex];

  return (
    <div className="w-full relative h-[600px] min-h-[400px] md:h-[calc(100vh-5rem)] max-h-[800px]">
      <Map
        ref={mapRef}
        {...viewState}
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        touchRotate={false}
        keyboard={false}
        onMove={evt => setViewState(evt.viewState)}
        onLoad={() => {
          // Trigger visibility check when map loads
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            const bounds = map.getBounds();
            const visible = tooltips.filter(tooltip => {
              return bounds.contains([tooltip.longitude, tooltip.latitude]);
            });
            setVisibleTooltips(visible);
          }
        }}
        // 5. Use a free open-source map style (No API Key needed) - Dark Matter theme
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactiveLayerIds={['state-fills']}
        onMouseMove={onHover}
        onMouseLeave={() => { setActiveStateId(null); setHoverInfo(null); }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Render the Brazil GeoJSON */}
        <Source id="brazil-data" type="geojson" data={brazilGeoJson}>
          <Layer {...(layerStyle as any)} />
        </Source>

        {/* City markers for tooltip locations */}
        <Source 
          id="tooltip-cities" 
          type="geojson" 
          data={{
            type: 'FeatureCollection',
            features: tooltips.map(tooltip => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [tooltip.longitude, tooltip.latitude]
              },
              properties: {
                id: tooltip.id,
                isActive: currentTooltip?.id === tooltip.id
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
              'circle-color': '#00BFFF',
              'circle-opacity': 0.3
            }}
          />
          {/* City markers */}
          <Layer
            id="city-markers"
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
                '#00BFFF', // Blue for active tooltip
                '#3fa86e'  // Mata-500 for other tooltip locations
              ],
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
              'circle-opacity': 0.9
            }}
          />
        </Source>

        {/* Display Info Popup on hover */}
        {hoverInfo && (
          <Popup
            longitude={hoverInfo.lng}
            latitude={hoverInfo.lat}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
          >
            <div style={{ color: 'black', padding: '5px' }}>
              <strong>{hoverInfo.name}</strong>
            </div>
          </Popup>
        )}

        {/* Looping Tooltip */}
        {currentTooltip && (
          <Popup
            longitude={currentTooltip.longitude}
            latitude={currentTooltip.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            className="tooltip-popup"
          >
            <div style={{ 
              color: 'black', 
              padding: '10px',
              minWidth: '200px'
            }}>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                marginBottom: '5px',
                color: '#00BFFF'
              }}>
                {currentTooltip.number}
              </div>
              <div style={{ marginBottom: '8px' }}>
                {currentTooltip.text}
              </div>
              {currentTooltip.link && (
                <a 
                  href={currentTooltip.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#00BFFF',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}
                >
                  {currentTooltip.linkText || 'Learn more'}
                </a>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}