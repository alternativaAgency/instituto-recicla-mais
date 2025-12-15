import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="mb-4 inline-block px-4 py-1.5">
            <div className="h-24 relative inline-block">
              <img
                src="/assets/logo/small-logo.png"
                alt="Instituto Recicla Mais"
                className="h-24 w-auto opacity-0"
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: 'white',
                  WebkitMask: 'url(/assets/logo/small-logo.png) no-repeat center / contain',
                  WebkitMaskSize: 'contain',
                  mask: 'url(/assets/logo/small-logo.png) no-repeat center / contain',
                  maskSize: 'contain',
                }}
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-black leading-tight md:text-6xl lg:text-7xl"
        >
          <span className="text-mata-950">
            Transformando resíduos em
          </span>
          <br />
          <span className="text-mata-600">
            oportunidades sustentáveis
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-limpeza md:text-lg md:leading-relaxed"
        >
          Atuamos diretamente na redução de impactos socioambientais por meio de 
          ações transparentes, mensuráveis e acessíveis. Sua participação viabiliza mudanças concretas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/contato"
            className="group flex items-center gap-2 rounded-full bg-mata-600 px-6 py-3 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
          >
            <span className="font-medium">Saiba como participar</span>
            <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          
          <Link
            to="/sobre"
            className="group flex items-center gap-2 rounded-full border-2 border-mata-600 px-6 py-3 text-mata-600 transition-all duration-300 ease-in-out hover:bg-mata-50 active:bg-mata-100"
          >
            <span className="font-medium">Conheça nossa missão</span>
            <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;