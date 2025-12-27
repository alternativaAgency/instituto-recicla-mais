import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight  } from "react-icons/fi";
import { navigationLinks } from "@/constants/useMenuLinks";
import { getRandomWhatsAppUrl } from "@/utils/whatsapp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  // Fallback: Check if navigation links exist
  const hasNavigationLinks = navigationLinks && navigationLinks.length > 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-limpeza backdrop-blur-sm shadow-sm border-b border-gray-100">
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-2 lg:py-3">
        <div className="flex h-16 lg:h-18 items-center justify-center">
          {/* Logo */}
          <div className="absolute left-4 sm:left-6 lg:left-8">
            <Link
              to="/"
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <div className="h-12 sm:h-16 relative inline-block">
                <img
                  src="/assets/logo/main.png"
                  alt=""
                  className="h-12 sm:h-16 w-auto opacity-0"
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
          {hasNavigationLinks && (
            <div className="absolute right-4 sm:right-6 lg:right-8 hidden md:flex md:items-center md:gap-4 uppercase">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-base sm:text-lg font-bold rounded-lg ${
                    isActive(link.path)
                      ? "text-mata-600 bg-mata-50"
                      : "text-gray-700 hover:text-mata-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={getRandomWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
              >
                <span className="font-medium uppercase">Fale Conosco</span>
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Desktop Contact Button - Fallback when no nav links */}
          {!hasNavigationLinks && (
            <div className="hidden md:flex absolute right-4 sm:right-6 lg:right-8 items-center">
              <a
                href={getRandomWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
              >
                <span className="font-medium uppercase">Fale Conosco</span>
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Mobile menu button */}
          {hasNavigationLinks && (
            <div className="absolute right-4 sm:right-6 lg:right-8 hidden z-70">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 relative ${
                  isMenuOpen
                    ? "bg-mata-600 text-white shadow-lg shadow-mata-600/30"
                    : "text-gray-700 hover:text-mata-600 hover:bg-gray-100"
                } focus:outline-none focus:ring-2 focus:ring-mata-600 focus:ring-offset-2`}
                aria-expanded={isMenuOpen}
                aria-label="Abrir menu principal"
              >
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6 transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6 transition-transform duration-300 rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}

          {/* Mobile Contact Button - Fallback when no nav links */}
          {!hasNavigationLinks && (
            <div className="absolute right-4 sm:right-6 lg:right-8 md:hidden">
              <a
                href={getRandomWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex px-4 py-2.5 items-center gap-2 rounded-full bg-mata-600 text-white transition-all duration-300 ease-in-out hover:bg-mata-700 active:bg-mata-800"
              >
                <span className="font-medium uppercase">Fale Conosco</span>
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && hasNavigationLinks && (
          <div className="md:hidden fixed inset-0 z-60">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu Panel */}
            <div className="absolute inset-x-0 top-16 bottom-0 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 animate-slideDown overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Menu Items */}
                <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                        isActive(link.path)
                          ? "text-white bg-mata-600 shadow-lg shadow-mata-600/30 scale-[1.02]"
                          : "text-gray-800 hover:text-mata-600 hover:bg-mata-50 active:scale-[0.98]"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <span className="flex-1">{link.label}</span>
                      {isActive(link.path) && (
                        <div className="w-2 h-2 rounded-full bg-white ml-3" />
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Contact Button */}
                <div className="px-6 pb-8 pt-4 border-t border-gray-100">
                  <a
                    href={getRandomWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-linear-to-r from-mata-600 to-mata-700 text-white font-semibold text-lg shadow-lg shadow-mata-600/30 transition-all duration-300 hover:from-mata-700 hover:to-mata-800 hover:shadow-xl hover:shadow-mata-600/40 active:scale-[0.98]"
                  >
                    <span>Fale Conosco</span>
                    <FiArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
