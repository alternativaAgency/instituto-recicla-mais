'use client';
import { FiArrowUpRight } from "react-icons/fi";

import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { topLogos, bottomLogos } from "@/constants/missionLogos";
import type { LogoItem } from "@/constants/missionLogos";
import ImageShuffle from "./ImageShuffle";

const NeuHero = () => {
  return (
    <section className="overflow-hidden py-8 sm:py-12 md:py-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center rounded-t-2xl bg-white/95 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 pb-96 sm:pb-[22rem] pt-8 sm:pt-10 md:pt-12 lg:pt-16 shadow-xl">
        <Copy />
        <ImageShuffle />
      </div>
      <Logos />
    </section>
  );
};

export default NeuHero;

const Copy = () => {
  return (
    <>
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <a
          href="https://www.instagram.com/institutoreciclamais/"
          target="_blank"
          rel="nofollow"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-xs sm:text-sm transition-transform hover:-rotate-2"
        >
          <span className="chip bg-mata-600 text-white text-sm sm:text-base">
            Olá!
          </span>
          <span className="ml-1.5 mr-1 inline-block text-xs sm:text-sm">
            Veja no que estamos trabalhando!
          </span>
          <FiArrowUpRight className="mr-2 inline-block h-3 w-3 sm:h-4 sm:w-4" />
        </a>
      </div>
      <h2 className="max-w-4xl text-center text-2xl sm:text-4xl md:text-6xl font-black leading-[1.15] mb-4 sm:mb-6 md:mb-8">
        Juntos, construímos soluções que fortalecem a reciclagem e transformam realidades.
      </h2>
      <p className="mx-auto my-4 sm:my-5 md:my-6 max-w-3xl text-center text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed">
        Atuamos na elaboração de projetos que geram impacto socioambiental e fortalecem empresas, cooperativas e associações de catadores.
      </p>
      <Link
        to="https://www.instagram.com/institutoreciclamais/"
        className="group flex px-2.5 py-1.5 sm:px-4 sm:py-2.5 items-center gap-1.5 sm:gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800 text-xs sm:text-base"
      >
        <span className="font-medium">Saiba como participar</span>
        <FiArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Link>
    </>
  );
};

const Logos = () => {
  return (
    <div className="relative -mt-2 -rotate-1 scale-[1.01] border-y-2 border-zinc-900 bg-white">
      <div className="relative z-0 flex overflow-hidden border-b-2 border-zinc-900">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
      <div className="relative z-0 flex overflow-hidden">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-linear-to-r from-white to-white/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-linear-to-l from-white to-white/0" />
    </div>
  );
};

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: React.ReactElement;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = (logo: LogoItem) => {
  const { name } = logo;

  return (
    <span className="flex items-center justify-center gap-4 px-4 py-2 md:py-4">
      {logo.sourceType === "icon" ? (
        <logo.Icon className="text-2xl text-mata-600 md:text-3xl" />
      ) : logo.sourceType === "url" ? (
        <img
          src={logo.imageUrl}
          alt={name}
          className={`${logo.size || "h-10 md:h-12"} w-auto object-contain`}
          loading="lazy"
        />
      ) : (
        <img
          src={logo.imagePath}
          alt={name}
          className={`${logo.size || "h-6 md:h-8"} w-auto object-contain`}
          loading="lazy"
        />
      )}
      <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
        {name}
      </span>
    </span>
  );
};

const LogoItemsTop = () => (
  <>
    {topLogos.map((logo) => (
      <LogoItem key={logo.name} {...logo} />
    ))}
  </>
);

const LogoItemsBottom = () => (
  <>
    {bottomLogos.map((logo) => (
      <LogoItem key={logo.name} {...logo} />
    ))}
  </>
);