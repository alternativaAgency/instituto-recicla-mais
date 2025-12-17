'use client';
import { FiArrowUpRight } from "react-icons/fi";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { topLogos, bottomLogos } from "@/constants/missionLogos";
import type { LogoItem } from "@/constants/missionLogos";

const NeuHero = () => {
  return (
    <section className="overflow-hidden py-8 sm:py-12 md:py-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center rounded-t-2xl bg-white/95 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 pb-96 sm:pb-[22rem] pt-8 sm:pt-10 md:pt-12 lg:pt-16 shadow-xl">
        <Copy />
        <Mission />
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
          <span className="rounded-full bg-mata-600 px-1 py-0.5 sm:px-2 text-xs sm:text-sm font-medium uppercase text-white">
            Olá!
          </span>
          <span className="ml-1.5 mr-1 inline-block text-xs sm:text-sm">
            Veja no que estamos trabalhando!
          </span>
          <FiArrowUpRight className="mr-2 inline-block h-3 w-3 sm:h-4 sm:w-4" />
        </a>
      </div>
      <h2 className="max-w-4xl text-center text-2xl sm:text-4xl md:text-6xl font-black leading-[1.15] mb-4 sm:mb-6 md:mb-8">
        Juntos, construímos soluções reais para um futuro sustentável
      </h2>
      <p className="mx-auto my-4 sm:my-5 md:my-6 max-w-3xl text-center text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed">
        Atuamos diretamente na redução de impactos socioambientais por meio de 
        ações transparentes, mensuráveis e acessíveis. Sua participação viabiliza mudanças concretas.
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

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Position controls CSS backgroundPosition to determine which part of the image is displayed
// Options: "center", "top", "bottom", "left", "right", "top left", "top right", "bottom left", "bottom right"
// Or use percentages like "50% 50%", "30% 70%", etc.
// If position is not specified, defaults to "center"
const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    position: "center", // Controls which part of the image is displayed
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    position: "center",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3480494/pexels-photo-3480494.jpeg",
    position: "center",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    position: "center",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/3735208/pexels-photo-3735208.jpeg",
    position: "center",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/7728705/pexels-photo-7728705.jpeg",
    position: "center",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/167538/pexels-photo-167538.jpeg",
    position: "center",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/3608056/pexels-photo-3608056.jpeg",
    position: "center",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/5029853/pexels-photo-5029853.jpeg",
    position: "center",
  },
];

const generateSquares = () => {
  // Shuffle images randomly
  return shuffle([...squareData]).slice(0, 9).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: sq.position || "center", // Use position property for backgroundPosition
      }}
    ></motion.div>
  ));
};

const Mission = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="absolute bottom-0 left-1/2 h-80 w-[calc(100vw-56px)] max-w-[1100px] -translate-x-1/2 overflow-hidden rounded-t-xl bg-zinc-900 p-0.5">
      <div className="relative z-0 grid h-full w-full grid-cols-3 grid-rows-3 gap-1 overflow-hidden rounded-t-lg bg-white p-2">
        {squares.map((sq) => sq)}
      </div>
    </div>
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