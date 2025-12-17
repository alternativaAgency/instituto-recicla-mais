import { FiArrowUpRight, FiArrowDown  } from "react-icons/fi";
import { getRandomWhatsAppUrl } from "@/utils/whatsapp";

const Hero = () => {
  const handleScrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const solutionsElement = document.getElementById('solutions');
    if (solutionsElement) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = solutionsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-2 sm:px-4 py-4 sm:py-8 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl text-center">
        {/* Logo */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="inline-block">
            <div className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-64 relative inline-block">
              <img
                src="/assets/logo/small-logo.png"
                alt="Instituto Recicla Mais"
                className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-64 w-auto opacity-0"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "white",
                  WebkitMask: "url(/assets/logo/small-logo.png) no-repeat center / contain",
                  WebkitMaskSize: "contain",
                  mask: "url(/assets/logo/small-logo.png) no-repeat center / contain",
                  maskSize: "contain",
                }}
              />
            </div>
          </div>
        </div>

        <h2 className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-4xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-7xl font-black leading-tight text-limpeza px-2">
          Transformando resíduos em oportunidades sustentáveis
        </h2>

        <p className="mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-5xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-limpeza px-2">
          Atuamos diretamente na redução de impactos socioambientais por meio de
          ações transparentes, mensuráveis e acessíveis. Sua participação
          viabiliza mudanças concretas.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={getRandomWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-mata-600 px-6 py-3 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
          >
            <span className="font-medium">Saiba como participar</span>
            <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <a
            href="#solutions"
            onClick={handleScrollToSolutions}
            className="group flex items-center gap-2 rounded-full border-2 border-mata-600 bg-mata-50 px-6 py-3 text-mata-600 transition-all duration-300 ease-in-out hover:bg-mata-100 active:bg-mata-100"
          >
            <span className="font-medium">Lei de Incentivo à Reciclagem</span>
            <FiArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
