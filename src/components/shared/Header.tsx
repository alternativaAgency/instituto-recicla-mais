import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight  } from "react-icons/fi";
import { navigationLinks } from "@/constants/useMenuLinks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-limpeza)] backdrop-blur-sm shadow-sm border-b border-gray-100">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-2 lg:py-3">
        <div className="flex h-16 lg:h-18 items-center justify-center">
          {/* Logo */}
          <div className="absolute left-4 sm:left-6 lg:left-8">
            <Link
              to="/"
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <div className="h-16 relative inline-block">
                <img
                  src="/assets/logo/main.png"
                  alt=""
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
          </div>

          {/* Desktop Navigation - Right */}
          <div className="absolute right-4 sm:right-6 lg:right-8 hidden md:flex md:items-center md:gap-4 uppercase">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-lg font-bold rounded-lg ${
                  isActive(link.path)
                    ? "text-mata-600 bg-mata-50"
                    : "text-gray-700 hover:text-mata-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-mata-600 rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/contato"
              className="group flex px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
            >
              <span className="font-medium uppercase">Fale Conosco</span>
              <FiArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="absolute right-4 sm:right-6 lg:right-8 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-700 hover:text-mata-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-mata-600 focus:ring-offset-2 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Abrir menu principal"
            >
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-mata-600 bg-mata-50"
                      : "text-gray-700 hover:text-mata-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* <Link
                to="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="group flex h-10 items-center gap-2 rounded-full bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700 mt-2"
              >
                <span>Fale Conosco</span>
              </Link> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
