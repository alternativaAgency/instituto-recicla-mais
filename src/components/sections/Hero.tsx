import { getRandomWhatsAppUrl } from "@/utils/whatsapp";
import { SectionDivider } from "./SectionDivider";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Mobile Background - 95vw width with adjusted clip path */}
      <div
        className="absolute inset-y-0 left-0 w-[92vw] bg-mata-950 z-10 lg:hidden"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 32%, calc(100% - 20vw) 32%, calc(100% - 20vw) 62%, 100% 62%, 100% 100%, 0% 100%)'
        }}
      />

      {/* Desktop Background - 57vw width with clip path */}
      <div
        className="absolute inset-y-0 left-0 w-[57vw] bg-mata-950 z-10 hidden lg:block"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 32%, calc(100% - 38vh) 32%, calc(100% - 38vh) 62%, 100% 62%, 100% 100%, 0% 100%)'
        }}
      />
      <div className="absolute left-[64%] -translate-x-1/2 top-1/2 -translate-y-1/2 h-[135%] z-0 pointer-events-none flex items-center justify-center">
        <div
          className="h-full aspect-square bg-mata-300 opacity-30"
          style={{
            maskImage: 'url("/assets/logo/big-logo.png")',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: 'url("/assets/logo/big-logo.png")',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center'
          }}
        />
      </div>
      <div className="relative z-20 grid h-full w-full grid-cols-1 lg:grid-cols-[62%_1fr] pointer-events-none">
        <div className="flex flex-col justify-start pt-12 px-6 sm:justify-center sm:pt-0 sm:px-12 pointer-events-auto">
          <div className="max-w-[65%] sm:max-w-2xl pr-0 sm:pr-12 lg:pr-32">
            <h2 className="mb-4 font-family-primary text-3xl font-normal leading-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl lg:text-[46px]">
              Transformamos iniciativas de reciclagem em projetos aptos a captar recursos via Lei de Incentivo a Reciclagem
            </h2>

            <p className="mb-6 sm:mb-10 font-object-sans text-lg sm:text-xl font-light italic leading-relaxed tracking-wide text-gray-200">
              Elaboração, gestão e acompanhamento técnico para cooperativas,
              associações de catadores e empresas de reciclagem.
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <a
                href={getRandomWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-48 sm:w-60 aspect-884/418 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 drop-shadow-md"
              >
                <img
                  src="/assets/saibamais.svg?v=4"
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain transition-all duration-300 group-hover:brightness-110"
                />
                <span className="absolute z-10 font-family-primary text-lg sm:text-2xl font-bold text-mata-950 left-[65%] top-[58%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
                  SAIBA +
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block"></div>

      </div>
      <SectionDivider type="waves" position="bottom" fill="fill-mata-950" />
    </section>
  );
};

export default Hero;
