import { cities } from '../../data/cities';
import { useNavigate } from 'react-router-dom';
import { MapPin, Recycle, Users, ArrowRight } from 'lucide-react';

export function CitiesList() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-mata-950 pt-24 pb-24">
            {/* <SectionDivider type="waves" position="top" fill="fill-mata-50" /> */}

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mata-800/50 text-mata-100 font-semibold text-sm mb-6 border border-mata-700 shadow-sm">
                        <MapPin className="w-4 h-4" />
                        Nossa Atuação
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mata-50 mb-6 font-display">
                        Cidades Transformadas
                    </h1>
                    <p className="text-lg md:text-xl text-mata-200 leading-relaxed">
                        Conheça os municípios onde o Instituto Recicla+ atua, promovendo sustentabilidade, inclusão de catadores e gestão eficiente de resíduos sólidos.
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cities.map((city, index) => (
                        <div
                            key={city.id}
                            onClick={() => navigate(`/${city.state}/${city.slug}`)}
                            className="bg-mata-900/40 hover:bg-mata-900/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-black/20 transition-all duration-300 cursor-pointer border border-mata-800 flex flex-col items-start"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* State Badge */}
                            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-mata-800 text-mata-200 text-xs font-bold uppercase tracking-wider transition-colors border border-mata-700/50">
                                {city.state}
                            </div>

                            {/* City Name */}
                            <h3 className="text-2xl font-bold text-mata-50 mb-3 transition-colors">
                                {city.cityName}
                            </h3>

                            {/* Description */}
                            <p className="text-mata-300 mb-6 line-clamp-2 min-h-[3rem]">
                                {city.description}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-6 mt-auto pt-6 border-t border-mata-800 w-full mb-6 relative">
                                <div className="flex flex-col">
                                    <span className="flex items-center gap-1.5 text-sm font-medium text-mata-400 mb-1">
                                        <Recycle className="w-4 h-4" />
                                        Resíduos
                                    </span>
                                    <span className="font-bold text-mata-100 text-lg">
                                        {city.trashRecycledKg > 0 ? `${(city.trashRecycledKg / 1000).toFixed(1)}t` : '--'}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="flex items-center gap-1.5 text-sm font-medium text-mata-400 mb-1">
                                        <Users className="w-4 h-4" />
                                        Ações
                                    </span>
                                    <span className="font-bold text-mata-100 text-lg">
                                        {city.jobsDone > 0 ? city.jobsDone : '--'}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-mata-800 text-mata-100 font-bold hover:bg-mata-700 hover:text-white transition-all duration-300 border border-mata-700 hover:border-mata-600 shadow-sm">
                                Ver detalhes
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
