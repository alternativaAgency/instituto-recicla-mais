import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre';
import "maplibre-gl/dist/maplibre-gl.css";
import { cities, type CityData } from '../../data/cities';
import { SectionDivider } from '../sections/SectionDivider';
import { ArrowLeft, MapPin, Recycle, Users, Building, TreePine, ShieldCheck } from 'lucide-react';
export function CityDetails() {
    const { state, citySlug } = useParams<{ state: string; citySlug: string }>();
    const navigate = useNavigate();
    const [city, setCity] = useState<CityData | null>(null);

    useEffect(() => {
        // Look up the city based on state and slug
        const foundCity = cities.find(
            (c) => c.state.toLowerCase() === state?.toLowerCase() && c.slug.toLowerCase() === citySlug?.toLowerCase()
        );
        setCity(foundCity || null);
    }, [state, citySlug]);

    if (!city) {
        return (
            <div className="min-h-screen bg-mata-50 pt-32 pb-24 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-mata-950 mb-6">Cidade não encontrada</h1>
                <button
                    onClick={() => navigate('/cidades')}
                    className="btn bg-limpeza-500 hover:bg-limpeza-600 text-white rounded-full px-8 py-3 flex items-center gap-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para Cidades
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mata-50">
            {/* Hero Section */}
            <div className="relative pt-24 pb-32 lg:pt-28 lg:pb-48 bg-mata-950 overflow-hidden flex flex-col justify-center min-h-[500px]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-mata-950/80 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-linear-to-b from-mata-950 via-transparent to-mata-950 z-20 pointer-events-none"></div>
                    <Map
                        initialViewState={{
                            longitude: city.longitude,
                            latitude: city.latitude,
                            zoom: 4,
                            pitch: 45,
                            bearing: -25
                        }}
                        style={{ width: '100%', height: '100%' }}
                        mapStyle="/maps/brasil.json"
                        scrollZoom={false} boxZoom={false} dragRotate={false} dragPan={false} keyboard={false} doubleClickZoom={false} touchZoomRotate={false} touchPitch={false}
                        attributionControl={false}
                    >
                        <Source
                            id="br-states-city"
                            type="geojson"
                            data="https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson"
                        >
                            <Layer
                                id="br-states-line-city"
                                type="line"
                                paint={{
                                    'line-color': '#ffffff',
                                    'line-width': 1,
                                    'line-opacity': 0.3
                                }}
                            />
                        </Source>
                        <Marker
                            longitude={city.longitude}
                            latitude={city.latitude}
                            anchor="bottom"
                            style={{ opacity: 0.8 }}
                        >
                            <div className="group relative z-10">
                                <div className="absolute -inset-2 bg-mata-500/30 rounded-full blur-sm animate-pulse"></div>
                                <svg
                                    height={32}
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
                    </Map>
                </div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-limpeza-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-20 pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-12 relative z-30">
                    <button
                        onClick={() => navigate('/cidades')}
                        className="mb-8 inline-flex items-center gap-2 text-mata-300 hover:text-limpeza-400 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        voltar
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-limpeza-500/20 text-limpeza-300 font-semibold text-sm mb-6 border border-limpeza-500/30">
                                <MapPin className="w-4 h-4" />
                                {city.state.toUpperCase()}
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display">
                                {city.cityName}
                            </h1>
                            <p className="text-xl md:text-2xl text-mata-200 leading-relaxed max-w-2xl">
                                {city.description || "Conheça o impacto das nossas ações e projetos desenvolvidos em parceria com as comunidades locais."}
                            </p>
                        </div>

                        {/* Key Impact Stats Card */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
                                Impacto Local
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-limpeza-500/20 flex items-center justify-center text-limpeza-400 group-hover:scale-110 group-hover:bg-limpeza-500 group-hover:text-white transition-all duration-300">
                                        <Recycle className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-white mb-1">
                                            {city.trashRecycledKg > 0 ? `${(city.trashRecycledKg / 1000).toFixed(1)}t` : '--'}
                                        </div>
                                        <div className="text-mata-300">Resíduos Reciclados</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-limpeza-500/20 flex items-center justify-center text-limpeza-400 group-hover:scale-110 group-hover:bg-limpeza-500 group-hover:text-white transition-all duration-300">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-white mb-1">
                                            {city.jobsDone > 0 ? city.jobsDone : '--'}
                                        </div>
                                        <div className="text-mata-300">Ações Realizadas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SectionDivider type="waves" position="bottom" fill="fill-mata-50" />
            </div>

            {/* Details Section */}
            <div className="py-24 bg-mata-50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-mata-900/5 hover:-translate-y-2 transition-transform duration-300 border border-mata-100">
                            <Building className="w-12 h-12 text-limpeza-500 mb-6" />
                            <h3 className="text-2xl font-bold text-mata-950 mb-4">Cooperativas</h3>
                            <p className="text-mata-700 leading-relaxed">
                                Apoiamos a estruturação e o fortalecimento de associações de catadores, fornecendo equipamentos e capacitação técnica especializada.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-mata-900/5 hover:-translate-y-2 transition-transform duration-300 border border-mata-100">
                            <TreePine className="w-12 h-12 text-limpeza-500 mb-6" />
                            <h3 className="text-2xl font-bold text-mata-950 mb-4">Meio Ambiente</h3>
                            <p className="text-mata-700 leading-relaxed">
                                Nossas ações visam diminuir o impacto ambiental do descarte incorreto, protegendo a biodiversidade e os recursos hídricos locais.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-mata-900/5 hover:-translate-y-2 transition-transform duration-300 border border-mata-100">
                            <ShieldCheck className="w-12 h-12 text-limpeza-500 mb-6" />
                            <h3 className="text-2xl font-bold text-mata-950 mb-4">Políticas Públicas</h3>
                            <p className="text-mata-700 leading-relaxed">
                                Atuamos em conjunto com o poder público municipal para implementar planos eficientes de gestão integrada de resíduos sólidos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
