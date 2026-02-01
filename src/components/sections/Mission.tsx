'use client';



import { Link } from "react-router-dom";

import ImageShuffle from "./ImageShuffle";

const NeuHero = () => {
  return (
    <section className="overflow-hidden pt-8 sm:pt-12 md:pt-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center rounded-t-2xl bg-white/95 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 pb-[22rem] pt-8 sm:pt-10 md:pt-12 lg:pt-16 shadow-xl">
        <Copy />
        <ImageShuffle />
      </div>
      {/* <Logos /> */}
    </section>
  );
};

export default NeuHero;

const Copy = () => {
  return (
    <>
      <h2 className="max-w-4xl text-center text-2xl sm:text-4xl md:text-6xl font-black leading-[1.15] mb-4 sm:mb-6 md:mb-8">
        Juntos, construímos soluções que fortalecem a reciclagem e transformam realidades.
      </h2>
      <p className="mx-auto my-4 sm:my-5 md:my-6 max-w-3xl text-center text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed">
        Atuamos na elaboração de projetos que geram impacto socioambiental e fortalecem empresas, cooperativas e associações de catadores.
      </p>
      <Link
        to="https://www.instagram.com/institutoreciclamais/"
        className="group flex px-4 py-3 sm:px-4 sm:py-2.5 items-center gap-2 sm:gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800 text-base sm:text-base"
      >
        <span className="font-medium">Saiba como participar</span>
      </Link>
    </>
  );
};

