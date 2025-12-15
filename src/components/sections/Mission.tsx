'use client';
import { FiArrowUpRight } from "react-icons/fi";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { topLogos, bottomLogos } from "@/constants/missionLogos";
import type { LogoItem } from "@/constants/missionLogos";

const NeuHero = () => {
  return (
    <section className="overflow-hidden py-12 md:py-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center rounded-t-2xl bg-white/95 backdrop-blur-sm px-8 pb-48 pt-12 shadow-xl md:px-12 md:pt-16">
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
          href="#"
          target="_blank"
          rel="nofollow"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="rounded-full bg-mata-600 px-2 py-0.5 font-medium uppercase text-white">
            Olá!
          </span>
          <span className="ml-1.5 mr-1 inline-block">
            Veja no que estamos trabalhando!
          </span>
          <FiArrowUpRight className="mr-2 inline-block" />
        </a>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-6xl md:leading-[1.15]">
        Juntos, construímos soluções reais para um futuro sustentável
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-xl md:leading-relaxed">
        Atuamos diretamente na redução de impactos socioambientais por meio de 
        ações transparentes, mensuráveis e acessíveis. Sua participação viabiliza mudanças concretas.
      </p>
      <Link
        to="/contato"
        className="group flex px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
      >
        <span className="font-medium">Saiba como participar</span>
        <FiArrowUpRight className="h-4 w-4" />
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

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const generateSquares = () => {
  return shuffle([...squareData]).slice(0, 9).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
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
      <div className="flex items-center justify-between px-2 py-1">
        <span className="rounded px-2 py-0.5 text-xs text-zinc-100">
          Nossos Parceiros
        </span>
      </div>
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

const LogoItem = ({ Icon, name }: LogoItem) => {
  return (
    <span className="flex items-center justify-center gap-4 px-4 py-2 md:py-4">
      <Icon className="text-2xl text-mata-600 md:text-3xl" />
      <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
        {name}
      </span>
    </span>
  );
};

const LogoItemsTop = () => (
  <>
    {topLogos.map((logo) => (
      <LogoItem key={logo.name} Icon={logo.Icon} name={logo.name} />
    ))}
  </>
);

const LogoItemsBottom = () => (
  <>
    {bottomLogos.map((logo) => (
      <LogoItem key={logo.name} Icon={logo.Icon} name={logo.name} />
    ))}
  </>
);