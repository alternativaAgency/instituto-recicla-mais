import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Example = () => {
  return (
    <div className="">
      <div className="flex h-24 items-center justify-center">
      </div>
      <Solutions />
      <div className="flex h-24 items-center justify-center">
      </div>
    </div>
  );
};

const Solutions = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[320vh] bg-[#1a3a2e]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {/* Header Section */}
          <div className="flex h-[450px] w-[450px] flex-col justify-center pl-12 pr-14">
            {/* Banner */}
            <div className="mb-8 w-fit rounded-full bg-[#7a9a7a] px-6 py-2">
              <span className="text-sm font-medium text-white">Faça a Diferença</span>
            </div>
            
            {/* Title */}
            <h2 className="mb-6 text-5xl font-bold leading-tight">
              <span className="text-white">Nossas</span>
              <br />
              <span className="text-[#a8e63e]">Soluções</span>
            </h2>
            
            {/* Description */}
            <p className="text-lg leading-relaxed text-white">
              Oferecemos soluções completas em reciclagem e gestão de resíduos para empresas comprometidas com a sustentabilidade ambiental.
            </p>
          </div>

          {/* Cards */}
          {cards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === cards.length - 1;
            return <Card card={card} key={card.id} isFirst={isFirst} isLast={isLast} />;
          })}

          {/* Call-to-Action Section */}
          <div className="flex h-[450px] w-[450px] flex-col justify-center pl-12">
            {/* Banner */}
            <div className="mb-8 w-fit rounded-full bg-mata-200 px-6 py-2">
              <span className="text-sm font-medium text-mata-950">Se Interessou?</span>
            </div>
            
            {/* Title */}
            <h2 className="mb-6 text-5xl font-bold leading-tight text-white">
              Junte-se a essa transformação
            </h2>
            
            {/* Description */}
            <p className="mb-8 text-base leading-relaxed text-white">
              Vamos lhe ajudar a reduzir seu impacto sobre o meio ambiente.
            </p>
            
            {/* Button */}
            <Link
              to="/contato"
              className="group flex w-fit px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
            >
              <span className="font-medium uppercase">Fale Conosco</span>
              <FiArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card, isFirst, isLast }: { card: CardType; isFirst?: boolean; isLast?: boolean }) => {
  // Apply rounded corners - left for first card, right for last card
  const roundedClasses = isFirst 
    ? "rounded-l-2xl" 
    : isLast 
    ? "rounded-r-2xl" 
    : "";
  
  return (
    <div
      key={card.id}
      className={`group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 ${roundedClasses}`}
      style={{ transform: 'skewX(-15deg)' }}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: 'skewX(15deg) scale(1.2)',
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div 
        className="absolute inset-0 z-10 grid place-content-center"
        style={{ transform: 'skewX(15deg)' }}
      >
        <p className="bg-linear-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/imgs/abstract/1.jpg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/imgs/abstract/2.jpg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/abstract/7.jpg",
    title: "Title 7",
    id: 7,
  },
];