import { getRandomWhatsAppUrl } from "@/utils/whatsapp";

const Hero = () => {

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-2 sm:px-4 pt-2 sm:pt-4 md:pt-8 lg:pt-10 pb-4 sm:pb-8 md:pb-16 lg:pb-20">
      <div className="mx-auto w-full max-w-7xl text-center">
        {/* Logo */}
        <div className="">
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
                  WebkitMask:
                    "url(/assets/logo/small-logo.png) no-repeat center / contain",
                  WebkitMaskSize: "contain",
                  mask: "url(/assets/logo/small-logo.png) no-repeat center / contain",
                  maskSize: "contain",
                }}
              />
            </div>
          </div>
        </div>

        <h2 className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-3xl sm:text-xl md:text-2xl lg:text-5xl xl:text-6xl font-black leading-tight text-limpeza">
          Transformamos iniciativas de reciclagem em projetos aptos a captar
          recursos via Lei de Incentivo a Reciclagem
        </h2>

        <p className="mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14 max-w-6xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-limpeza">
          Elaboração, gestão e acompanhamento técnico para cooerativas,
          associações de catadores e empresas de reciclagem.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={getRandomWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full bg-mata-600 px-6 py-3 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
          >
            <span className="font-medium">Saiba como participar</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
