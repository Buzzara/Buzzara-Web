// src/components/layout/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import logoFooter from "../../assets/images/logoFooter.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3d433f] px-4 md:px-8 pt-10 pb-6 mt-8">
      <div className="max-w-[1200px] mx-auto">
        {/* LINHA PRINCIPAL (desktop: 7 colunas fixas) */}
        <div
          className="
            grid grid-cols-1 gap-8 items-start
            md:grid-cols-[auto_1px_1fr_1px_1fr_1px_auto]
          "
        >
          {/* 1) LOGO */}
          <div className="flex items-start">
            <Link to="/" className="block">
              <img
                src={logoFooter}
                alt="Buzzara Logo"
                className="w-[150px] md:w-[180px] h-auto object-contain"
              />
            </Link>
          </div>

          {/* | */}
          <div className="hidden md:block w-px bg-white/40 self-stretch" />

          {/* 2) LINKS LEGAIS */}
          <div>
            <ul className="space-y-3 text-[15px] leading-6">
              <li><a href="#" className="text-white/90 hover:text-white">Termos de Contrato</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Fale conosco</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Cookies</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Segurança</a></li>
            </ul>
          </div>

          {/* | */}
          <div className="hidden md:block w-px bg-white/40 self-stretch" />

          {/* 3) REGIÕES */}
          <div>
            <ul className="space-y-3 text-[15px] leading-6">
              <li><a href="#" className="text-white/90 hover:text-white">Norte</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Nordeste</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Sul</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Sudeste</a></li>
              <li><a href="#" className="text-white/90 hover:text-white">Centro Oeste</a></li>
            </ul>
          </div>

          {/* | */}
          <div className="hidden md:block w-px bg-white/40 self-stretch" />

          {/* 4) DENÚNCIA + REDES */}
          <div>
            <p className="text-white text-base font-semibold mb-1">Denuncie Anuncio</p>
            <a href="#" className="text-white/90 hover:text-white block mb-4">Aqui</a>

            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" aria-label="WhatsApp" className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M20.5 11.5a8.5 8.5 0 1 1-4.33-7.4" />
                  <path d="M8 17l-2.5.7.7-2.6" />
                  <path d="M8.5 7.5c.7 2.6 4 5.1 6.1 5.4.7.1 1.4-.4 1.7-1.1l.4-.9" />
                </svg>
              </a>
              {/* X */}
              <a href="#" aria-label="X" className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </a>
              {/* Tumblr */}
              <a href="#" aria-label="Tumblr" className="grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M10 3v6H7v3h3v4.5A4.5 4.5 0 0 0 14.5 21c1.2 0 2-.3 2.5-.6v-3a3.7 3.7 0 0 1-1.8.5c-1 0-1.7-.6-1.7-1.7V12h3V9h-3V3h-3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/20">
          <p className="text-white/90 text-sm text-left">CNPJ 59.308.647/0001-28</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
