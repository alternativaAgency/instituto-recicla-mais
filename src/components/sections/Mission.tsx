'use client';



import { Link } from "react-router-dom";

import ImageShuffle from "./ImageShuffle";
import { SectionDivider } from "./SectionDivider";

const NeuHero = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-32">
      <SectionDivider type="waves" position="top" fill="fill-mata-950" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-2xl bg-limpeza/95 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 pt-8 pb-4 sm:pt-10 sm:pb-6 md:pt-12 md:pb-8 lg:pt-16 lg:pb-10 shadow-xl z-20">
        <Copy />
        <ImageShuffle />
      </div>
      <SectionDivider type="waves" position="bottom" fill="fill-limpeza" />
    </section>
  );
};

export default NeuHero;

const Copy = () => {
  return (
    <>
      <h2 className="font-family-primary max-w-4xl text-center text-2xl sm:text-4xl md:text-6xl font-semibold leading-[1.15] mb-3 sm:mb-4 md:mb-6 text-gray-900">
        Juntos, construímos soluções que fortalecem a reciclagem e transformam realidades.
      </h2>
      <p className="font-family-secondary mx-auto my-4 sm:my-5 md:my-6 max-w-3xl text-center text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700">
        Atuamos na elaboração de projetos que geram impacto socioambiental e fortalecem empresas, cooperativas e associações de catadores.
      </p>
      <Link
        to="https://www.instagram.com/institutoreciclamais/"
        className="group flex px-4 py-3 sm:px-4 sm:py-2.5 items-center gap-2 sm:gap-2 rounded-full bg-mata-600 text-limpeza transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800 text-base sm:text-base"
      >
        <span className="font-medium">Saiba como participar</span>
      </Link>
    </>
  );
};

