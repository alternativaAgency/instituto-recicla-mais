import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactElement;
}

interface FooterLink {
  label: string;
  path: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;
const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }: { examples: string[] }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, [examples.length]);

  return (
    <p className="mb-2.5 text-sm font-light uppercase">
      <span className="inline-block size-2 bg-gray-800" />
      <span className="ml-3">
        EXEMPLO:{" "}
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-px right-0 top-[3px] bg-gray-800"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

const BlockInTextCard = ({
  tag,
  text,
  examples,
}: {
  tag: string;
  text: React.ReactNode;
  examples: string[];
}) => {
  return (
    <div className="w-full space-y-6">
      <div>
        <p className="mb-1.5 text-sm font-light uppercase text-gray-400">{tag}</p>
        <hr className="border-gray-300" />
      </div>
      <p className="max-w-lg text-base leading-relaxed text-gray-700">{text}</p>
      <div>
        <Typewrite examples={examples} />
        <hr className="border-gray-300" />
      </div>
      <div className="w-full rounded-full bg-zinc-600">
        <Link
          to="/contato"
          className="flex w-full origin-top-left items-center justify-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="ml-1.5 mr-1 inline-block">
          Entre em Contato
          </span>
          <FiArrowUpRight className="mr-2 inline-block" />
        </Link>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
          <circle cx="16.806" cy="7.207" r="1.078" />
          <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
          />
        </svg>
      ),
    },
  ];

  const footerSections: FooterSection[] = [
    {
      title: "Instituto",
      links: [
        { label: "Sobre Nós", path: "/sobre" },
        { label: "Nossos Serviços", path: "/" },
        { label: "Notícias", path: "/noticias" },
        { label: "Transparência", path: "/transparencia" },
      ],
    },
    {
      title: "Ajuda",
      links: [
        { label: "Contato", path: "/contato" },
        { label: "Perguntas Frequentes", path: "#" },
        { label: "Termos de Uso", path: "#" },
        { label: "Política de Privacidade", path: "#" },
      ],
    },
  ];


  return (
    <footer className="py-10 bg-limpeza sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-380">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Link to="/" className="inline-block">
              <div className="h-16 relative inline-block">
                <img
                  src="/assets/logo/main.png"
                  alt="Instituto Recicla Mais"
                  className="h-16 w-auto opacity-0"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: 'var(--color-mata-900)',
                    WebkitMask: 'url(/assets/logo/main.png) no-repeat center / contain',
                    WebkitMaskSize: 'contain',
                    mask: 'url(/assets/logo/main.png) no-repeat center / contain',
                    maskSize: 'contain',
                  }}
                />
              </div>
            </Link>
            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Juntos, construímos soluções reais para um futuro sustentável através de ações transparentes, mensuráveis e acessíveis.
            </p>

            {/* Social Links */}
            <ul className="flex items-center space-x-3 mt-9" role="list">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visite nosso ${social.name}`}
                    className="flex items-center justify-center text-gray-800 transition-all duration-200 hover:text-mata-600 focus:text-mata-600 focus:outline-none focus:ring-2 focus:ring-mata-600 focus:ring-offset-2"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">{section.title}</p>
              <ul className="mt-6 space-y-4" role="list">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex text-base text-black transition-all duration-200 hover:text-mata-600 focus:text-mata-600 focus:outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Support */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <BlockInTextCard
              tag="WhatsApp"
              text={
                <>
                  <strong>Tem dúvidas?</strong> Adoraríamos ajudar! Entre em contato
                  conosco para qualquer questão que você possa ter.
                </>
              }
              examples={[
                "Como posso participar dos projetos?",
                "Onde posso encontrar mais informações?",
                "Como funciona a transparência?",
                "Como posso fazer uma doação?",
              ]}
            />
          </div>
        </div>

        {/* Copyright */}
        <hr className="mt-16 mb-10 border-gray-200" />
        <div className="flex items-center">
          <img
            src="/assets/logo/small-logo.png"
            alt="Instituto Recicla Mais"
            className="h-8 w-auto"
          />
          <p className="flex-1 text-sm text-center text-gray-600">
            © {currentYear} Instituto Recicla Mais. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-600">
            Desenvolvido por Mateus Loubach
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;