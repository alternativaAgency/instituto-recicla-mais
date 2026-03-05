import { getRandomWhatsAppUrl } from "@/utils/whatsapp";
import { SectionDivider } from "./SectionDivider";

const HeroSub = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center bg-transparent">
      {/* 
        The site has a global fixed background image (bigleaf.jpg).
        We add a dark overlay that covers the entire Hero section.
      */}
      <div className="absolute inset-0 bg-[#07160d]/85 z-0" />

      {/* 
        The bright transparent "logo window" layer.
        We recreate the same fixed background here, but mask it using the logo.
        This provides a perfectly aligned "hole" through the darkness!
      */}
      <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <div
          className="absolute inset-0 bg-[url('/assets/images/bigleaf.jpg')] bg-cover bg-center md:bg-fixed"
          style={{
            WebkitMaskImage: "url('/assets/logo/big-logo.png')",
            maskImage: "url('/assets/logo/big-logo.png')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
          id="hero-glass-mask"
        />
        {/* Adds a slight white glossy overlay to the exact same shape */}
        <div
          className="absolute inset-0 bg-white/5"
          style={{
            WebkitMaskImage: "url('/assets/logo/big-logo.png')",
            maskImage: "url('/assets/logo/big-logo.png')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
          id="hero-glass-gloss"
        />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        #hero-glass-mask, #hero-glass-gloss {
          /* Mobile default */
          -webkit-mask-position: right -35vw bottom -5vh;
          mask-position: right -35vw bottom -5vh;
          -webkit-mask-size: 180vw;
          mask-size: 180vw;
        }
        @media (min-width: 640px) {
          #hero-glass-mask, #hero-glass-gloss {
            -webkit-mask-position: right -25vw bottom -10vh;
            mask-position: right -25vw bottom -10vh;
            -webkit-mask-size: 150vh;
            mask-size: 150vh;
          }
        }
        @media (min-width: 1024px) {
          #hero-glass-mask, #hero-glass-gloss {
            /* Desktop configuration */
            -webkit-mask-position: right -20vh center;
            mask-position: right -20vh center;
            -webkit-mask-size: 135vh;
            mask-size: 135vh;
          }
        }
      `}} />

      <div className="relative z-20 flex h-full w-full flex-col justify-start pt-24 sm:pt-0 sm:justify-center px-6 sm:px-12 lg:px-24 xl:px-32 max-w-[1400px] mx-auto pointer-events-none">
        <div className="max-w-[92%] sm:max-w-2xl lg:max-w-[55%] xl:max-w-[52%] pointer-events-auto mt-12 sm:mt-0">
          <h2 className="mb-6 font-geom text-[1.9rem] font-normal leading-[1.15] text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] lg:leading-[1.15]">
            Transformamos iniciativas de reciclagem em projetos <span className="text-limpeza">aptos a captar recursos</span> via Lei de Incentivo a Reciclagem
          </h2>

          <p className="mb-8 max-w-[85%] sm:max-w-full font-object-sans text-[1.05rem] sm:text-lg md:text-xl font-light leading-relaxed tracking-wide text-gray-200 lg:pr-8">
            Elaboração, gestão e acompanhamento técnico para cooperativas, associações de catadores e empresas de reciclagem.
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row mt-2 relative z-30">
            <a
              href={getRandomWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-[11.5rem] sm:w-56 aspect-[884/418] transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 drop-shadow-md"
            >
              <img
                src="/assets/saibamais.svg?v=4"
                alt="Saiba Mais"
                className="absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:brightness-110"
              />
              <span className="absolute z-10 text-[0.9rem] sm:text-base font-bold text-mata-950 left-[62%] top-[54%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                SAIBA +
              </span>
            </a>
          </div>
        </div>
      </div>

      <SectionDivider type="waves" position="bottom" fill="fill-mata-950" />
    </section>
  );
};

export default HeroSub;
