import React from "react";
import logoFooter from "../../assets/images/logoFooter.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3d433f] py-8 px-4 md:px-8 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">BUZZARA</h3>
            <p className="text-gray-400 text-sm">
              A melhor plataforma de classificados para acompanhantes no Brasil.
              Anuncie seus serviços ou encontre profissionais na sua região.
            </p>
          </div>

          {/* Coluna 2 */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-buzzara-secondary transition-colors"
                >
                  Anunciar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-buzzara-secondary transition-colors"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-buzzara-secondary transition-colors"
                >
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-buzzara-secondary transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 com logo ao lado */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Informações Legais
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-buzzara-secondary transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-buzzara-secondary transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <img
              src={logoFooter}
              alt="Buzzara Logo"
              className="h-24 md:h-32 mt-6 md:mt-0 md:ml-4"
              style={{ width: "auto" }}
            />
          </div>
        </div>

        <div className="border-t border-[#d4d2d2]mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Buzzara. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
