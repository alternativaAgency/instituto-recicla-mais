import { ArrowRight, FileText, Recycle, Leaf, Sprout } from "lucide-react";

export default function TestHero() {
    return (
        <section className="relative w-full min-h-screen bg-mata-950 flex flex-col justify-center overflow-hidden font-object-sans">
            {/* Background layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/images/bigleaf.jpg"
                    alt="Leaf Background"
                    className="w-full h-full object-cover opacity-70"
                />
                {/* Dark overlays to match the image's gradient shading */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#031106]/95 via-[#031106]/80 to-transparent z-10" />

                {/* Decorative dark geometric background shapes */}
                <div className="absolute left-[15%] bottom-0 w-1/2 h-1/2 bg-[#051c0d]/40 backdrop-blur-[2px] z-10 hidden lg:block" />
                <div className="absolute right-[5%] top-[10%] w-1/4 h-[40%] bg-[#082211]/30 z-10 hidden lg:block" />
            </div>

            <div className="container relative z-20 mx-auto px-6 md:px-12 max-w-[1400px] flex flex-col lg:flex-row items-center justify-between gap-12 pt-24 pb-20 lg:py-0 min-h-screen">

                {/* Left Side Content */}
                <div className="w-full justify-center mt-12 lg:mt-0 relative z-30">
                    <div className="flex items-center gap-2 mb-6">
                        <Leaf className="w-5 h-5 text-[#7ED957]" />
                        <span className="text-[#7ED957] tracking-[0.2em] text-sm font-semibold uppercase">
                            LEI DE INCENTIVO À RECICLAGEM
                        </span>
                    </div>

                    <h1 className="text-white text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold leading-[1.15] mb-8 font-geom">
                        Estruturamos projetos de reciclagem <br className="hidden md:block" />
                        <span className="text-[#7ED957] border-b-[3px] border-[#7ED957] pb-1 inline-block mt-2 font-medium">
                            prontos para captar recursos
                        </span> <br className="hidden md:block mt-2" />
                        via Lei de Incentivo
                    </h1>

                    <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
                        Elaboração, gestão e acompanhamento técnico para cooperativas, associações de catadores e empresas de reciclagem.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-20 lg:mb-24">
                        <button className="bg-gradient-to-r from-[#69b747] to-[#2f8a58] hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(63,168,110,0.3)] w-full sm:w-auto text-lg whitespace-nowrap">
                            Conheça a Lei <ArrowRight className="w-5 h-5 ml-1" />
                        </button>
                        <button className="bg-transparent text-white hover:text-[#7ED957] pb-1 border-b border-gray-400 hover:border-[#7ED957] transition-all flex items-center gap-2 w-full sm:w-auto text-lg whitespace-nowrap">
                            Fale com nossa equipe <ArrowRight className="w-5 h-5 opacity-80 ml-1" />
                        </button>
                    </div>

                    {/* Bottom Process Flow - Desktop */}
                    <div className="hidden sm:flex items-center gap-12 mt-auto">
                        <img src="/assets/saibamais.svg" alt="Saiba+" className="w-36 h-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-4 sm:mb-0" />

                        <div className="flex items-center gap-4 text-white ml-8">
                            <div className="flex flex-col items-center gap-3">
                                <div className="p-3 border rounded-xl border-[#7ED957]/30 bg-mata-950/60 backdrop-blur-md">
                                    <Recycle className="w-7 h-7 text-white" strokeWidth={1.5} />
                                </div>
                                <span className="text-[0.8rem] text-center font-medium font-geom tracking-wide">Projeto <br /> Técnico</span>
                            </div>

                            <ArrowRight className="hidden sm:block w-5 h-5 text-[#7ED957] mb-10 mx-2" />

                            <div className="flex flex-col items-center gap-3">
                                <div className="p-3 border rounded-xl border-[#7ED957]/30 bg-mata-950/60 backdrop-blur-md">
                                    <FileText className="w-7 h-7 text-white" strokeWidth={1.5} />
                                </div>
                                <span className="text-[0.8rem] text-center font-medium font-geom tracking-wide">Aprovação <br /> Legal</span>
                            </div>

                            <ArrowRight className="hidden sm:block w-5 h-5 text-[#7ED957] mb-10 mx-2" />

                            <div className="flex flex-col items-center gap-3">
                                <div className="p-3 border rounded-xl border-[#7ED957]/30 bg-mata-950/60 backdrop-blur-md">
                                    <Sprout className="w-7 h-7 text-white" strokeWidth={1.5} />
                                </div>
                                <span className="text-[0.8rem] text-center font-medium font-geom tracking-wide">Captação de <br /> Recursos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile version of the Process flow */}
                <div className="flex sm:hidden flex-col items-start gap-8 mt-12 mb-8 relative z-40 w-full">
                    <img src="/assets/saibamais.svg" alt="Saiba+" className="w-28 h-auto opacity-90 drop-shadow-md" />

                    <div className="flex flex-col items-start gap-4 text-white w-full max-w-xs">
                        <div className="flex items-center gap-4 w-full">
                            <div className="p-3 border rounded-xl border-[#7ED957]/30 bg-mata-950/60 backdrop-blur-md shrink-0">
                                <Recycle className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium font-geom">Projeto Técnico</span>
                        </div>
                        <div className="w-px h-6 bg-[#7ED957]/50 ml-6 self-start"></div>

                        <div className="flex items-center gap-4 w-full">
                            <div className="p-3 border rounded-xl border-[#7ED957]/30 bg-mata-950/60 backdrop-blur-md shrink-0">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium font-geom">Aprovação Legal</span>
                        </div>
                        <div className="w-px h-6 bg-[#7ED957]/50 ml-6 self-start"></div>

                        <div className="flex items-center gap-4 w-full">
                            <div className="p-3 border rounded-xl border-[#7ED957]/30 bg-mata-950/60 backdrop-blur-md shrink-0">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium font-geom">Captação de Recursos</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
