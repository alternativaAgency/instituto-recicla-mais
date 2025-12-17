import { getRandomWhatsAppUrl } from "@/utils/whatsapp";
import { FiArrowUpRight } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen bg-limpeza py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-mata-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Tem dúvidas? Adoraríamos ajudar! Entre em contato conosco através do WhatsApp para qualquer questão que você possa ter.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.209.994.36 1.423.36 1.538 0 .198.05.371.223.52.174.149.39.223.669.297.278.074 1.816.868 2.13 1.023.313.156.52.223.595.347.074.124.074.71-.149 1.39-.222.68-1.54 1.39-2.112 1.51-.572.12-1.39.198-1.816.074-.426-.124-2.508-.99-4.85-3.18-1.79-1.58-3-3.48-3.33-4.07-.33-.58-2.48-3.48-2.48-6.64 0-3.16 1.65-4.72 2.25-5.33.58-.61 1.29-.76 1.72-.76.42 0 .84.01 1.21.01.37 0 .84-.01 1.35.37.51.38 1.74 1.7 1.99 2.23.25.52.42.84.57 1.16.15.33.2.55.1.85-.1.3-.15.5-.3.68-.15.18-.3.4-.42.55-.12.15-.25.33-.1.68.15.35.67 1.65 1.45 2.66.98 1.28 1.84 1.69 2.18 1.88.34.19.54.16.74-.1.2-.25.85-1 1.08-1.34.23-.34.46-.28.77-.17.31.11 1.97.93 2.31 1.1.34.17.57.25.66.41.09.17.09.98-.22 1.92z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-mata-900 mb-4">
              Fale Conosco pelo WhatsApp
            </h2>
            <p className="text-gray-600 mb-8">
              Clique no botão abaixo para iniciar uma conversa conosco. Estamos prontos para ajudar!
            </p>
            <a
              href={getRandomWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-600 text-white font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-green-700 active:bg-green-800 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.209.994.36 1.423.36 1.538 0 .198.05.371.223.52.174.149.39.223.669.297.278.074 1.816.868 2.13 1.023.313.156.52.223.595.347.074.124.074.71-.149 1.39-.222.68-1.54 1.39-2.112 1.51-.572.12-1.39.198-1.816.074-.426-.124-2.508-.99-4.85-3.18-1.79-1.58-3-3.48-3.33-4.07-.33-.58-2.48-3.48-2.48-6.64 0-3.16 1.65-4.72 2.25-5.33.58-.61 1.29-.76 1.72-.76.42 0 .84.01 1.21.01.37 0 .84-.01 1.35.37.51.38 1.74 1.7 1.99 2.23.25.52.42.84.57 1.16.15.33.2.55.1.85-.1.3-.15.5-.3.68-.15.18-.3.4-.42.55-.12.15-.25.33-.1.68.15.35.67 1.65 1.45 2.66.98 1.28 1.84 1.69 2.18 1.88.34.19.54.16.74-.1.2-.25.85-1 1.08-1.34.23-.34.46-.28.77-.17.31.11 1.97.93 2.31 1.1.34.17.57.25.66.41.09.17.09.98-.22 1.92z" />
              </svg>
              <span>Abrir WhatsApp</span>
              <FiArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-mata-900 mb-4">
              Outras formas de contato
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong className="text-mata-900">Instagram:</strong>{" "}
                <a
                  href="https://www.instagram.com/institutoreciclamais/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mata-600 hover:text-mata-700 underline"
                >
                  @institutoreciclamais
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
