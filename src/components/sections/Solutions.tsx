import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getRandomWhatsAppUrl } from "@/utils/whatsapp";

const Example = () => {
  return (
    <div className="">
      <div className="flex h-24 items-center justify-center">
      </div>
      <Solutions />
    </div>
  );
};

const Solutions = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-60%"]);

  // Mobile: Vertical stack layout
  if (isMobile) {
    return (
      <section id="solutions" className="relative bg-[#1a3a2e] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header Section */}
          <div className="mb-8 sm:mb-12">
            {/* Banner */}
            <div className="mb-6 w-fit rounded-full bg-[#7a9a7a] px-4 py-2 sm:px-6">
              <span className="text-xs sm:text-sm font-medium text-white">Faça a Diferença</span>
            </div>
            
            {/* Title */}
            <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">Nossas</span>
              <br />
              <span className="text-[#a8e63e]">Soluções</span>
            </h2>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white">
              Descubra como sua empresa pode destinar parte do Imposto de Renda (IRPJ) e pessoas físicas podem destinar parte do IRPF para projetos de reciclagem, transformando obrigações fiscais em impacto socioambiental positivo.
            </p>
          </div>

          {/* Cards - Vertical Stack */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            {cards.map((card) => (
              <Card key={card.id} card={card} isMobile={true} />
            ))}
          </div>

          {/* Call-to-Action Section */}
          <div className="mt-8 sm:mt-12">
            {/* Banner */}
            <div className="mb-6 w-fit rounded-full bg-mata-200 px-4 py-2 sm:px-6">
              <span className="text-xs sm:text-sm font-medium text-mata-950">Se Interessou?</span>
            </div>
            
            {/* Title */}
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white">
              Junte-se a essa transformação
            </h2>
            
            {/* Description */}
            <p className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed text-white">
              Vamos lhe ajudar a reduzir seu impacto sobre o meio ambiente.
            </p>
            
            {/* Button */}
            <a
              href={getRandomWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800 text-sm sm:text-base"
            >
              <span className="font-medium uppercase">Fale Conosco</span>
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Horizontal scroll layout
  return (
    <section id="solutions" ref={targetRef} className="relative h-[320vh] bg-[#1a3a2e]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {/* Header Section */}
          <div className="flex h-[450px] w-full sm:w-[350px] md:w-[450px] flex-col justify-center pl-6 sm:pl-8 md:pl-12 pr-6 sm:pr-10 md:pr-14">
            {/* Banner */}
            <div className="mb-8 w-fit rounded-full bg-[#7a9a7a] px-6 py-2">
              <span className="text-sm font-medium text-white">Faça a Diferença</span>
            </div>
            
            {/* Title */}
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">Lei de</span>
              <br />
              <span className="text-[#a8e63e]">Incentivo à Reciclagem</span>
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed text-white">
              Descubra como sua empresa pode destinar parte do Imposto de Renda (IRPJ) e pessoas físicas podem destinar parte do IRPF para projetos de reciclagem, transformando obrigações fiscais em impacto socioambiental positivo.
            </p>
          </div>

          {/* Cards */}
          {cards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === cards.length - 1;
            return <Card card={card} key={card.id} isFirst={isFirst} isLast={isLast} />;
          })}

          {/* Call-to-Action Section */}
          <div className="flex h-[450px] w-full sm:w-[350px] md:w-[450px] flex-col justify-center pl-6 sm:pl-8 md:pl-12">
            {/* Banner */}
            <div className="mb-8 w-fit rounded-full bg-mata-200 px-6 py-2">
              <span className="text-sm font-medium text-mata-950">Interessante?</span>
            </div>
            
            {/* Title */}
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              Junte-se a essa transformação
            </h2>
            
            {/* Description */}
            <p className="mb-8 text-sm sm:text-base leading-relaxed text-white">
              Vamos lhe ajudar a reduzir seu impacto sobre o meio ambiente.
            </p>
            
            {/* Button */}
            <a
              href={getRandomWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
            >
              <span className="font-medium uppercase">Fale Conosco</span>
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card, isFirst, isLast, isMobile }: { card: CardType; isFirst?: boolean; isLast?: boolean; isMobile?: boolean }) => {
  // Apply rounded corners - left for first card, right for last card (desktop only)
  const roundedClasses = isMobile 
    ? "rounded-2xl" 
    : isFirst 
    ? "rounded-l-2xl" 
    : isLast 
    ? "rounded-r-2xl" 
    : "";
  
  if (isMobile) {
    return (
      <div
        key={card.id}
        className={`group relative h-[300px] sm:h-[350px] w-full overflow-hidden bg-neutral-200 ${roundedClasses}`}
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 flex items-end justify-start p-4 sm:p-6">
          {card.link ? (
            <a
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : undefined}
              rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-linear-to-br from-white/20 to-white/0 p-3 sm:p-4 text-lg sm:text-xl md:text-2xl font-black uppercase text-white backdrop-blur-lg hover:opacity-80 transition-opacity"
            >
              {card.title}
            </a>
          ) : (
            <p className="bg-linear-to-br from-white/20 to-white/0 p-3 sm:p-4 text-lg sm:text-xl md:text-2xl font-black uppercase text-white backdrop-blur-lg">
              {card.title}
            </p>
          )}
        </div>
      </div>
    );
  }
  
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
        className="absolute inset-0 z-10 flex items-end justify-start p-6"
        style={{ transform: 'skewX(15deg)' }}
      >
        {card.link ? (
          <a
            href={card.link}
            target={card.link.startsWith('http') ? '_blank' : undefined}
            rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="bg-linear-to-br from-white/20 to-white/0 p-4 text-2xl font-black uppercase text-white backdrop-blur-lg hover:opacity-80 transition-opacity"
            style={{ transform: 'skewX(-15deg)' }}
          >
            {card.title}
          </a>
        ) : (
          <p className="bg-linear-to-br from-white/20 to-white/0 p-4 text-2xl font-black uppercase text-white backdrop-blur-lg">
            {card.title}
          </p>
        )}
      </div>
    </div>
  );
};

export default Example;

type CardType = {
  url: string;
  title: string;
  id: number;
  link?: string;
};

const cards: CardType[] = [
  {
    url: "https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/empresa-irpj-lei-incentivo-reciclagem-974.webp",
    title: "Ler Artigo",
    id: 1,
    link: "https://www.leincentivoreciclagem.com.br/post/lei-incentivo-reciclagem-irpj-como-fazer", // Add your article URL here
  },
  {
    url: "https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/irpf-lei-incentivo-reciclagem-152.webp",
    title: "Ler Artigo",
    id: 2,
    link: "https://www.leincentivoreciclagem.com.br/post/lei-incentivo-reciclagem-imposto-renda-fisica", // Add your article URL here
  },
  {
    url: "https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/empresarios-analise-custos-incentivos-fiscais-89.webp",
    title: "Ler Artigo",
    id: 3,
    link: "https://www.leincentivoreciclagem.com.br/post/como-me-ajudar-a-cortar-custos-de-uma-empresa-grande",
  },
  {
    url: "https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/escritorio-esg-reciclagem-economia-circular-191.webp",
    title: "Ler Artigo",
    id: 4,
    link: "https://www.leincentivoreciclagem.com.br/post/como-diminuir-custo-no-setor-esg-reciclagem",
  },
  {
    url: "https://ixymyhazbhztpjnlxmbd.supabase.co/storage/v1/object/images/generated/empresa-destinando-irpj-reciclagem-855.webp",
    title: "Ler Artigo",
    id: 5,
    link: "https://www.leincentivoreciclagem.com.br/post/como-destinar-a-lei-de-incentivo-reciclagem",
  },
];