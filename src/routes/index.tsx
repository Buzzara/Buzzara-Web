
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home";
import ProfilePage from "@/pages/Profile";
import AnuncioPage from "@/pages/Anuncio";
import NotFound from "@/pages/NotFound";
import ProfileDetails from "@/pages/DetalhesPerfil";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/detalhes/:id" element={<ProfileDetails />} />
      <Route path="/anuncio/:id" element={<AnuncioPage />} />
      <Route path="/anuncios" element={<AnuncioPage />} />
      {/* ADD ALL CUSTOM ROUTES BELOW THE CATCH-ALL "*" ROUTE */}
      {/* Example: <Route path="/custom" element={<CustomComponent />} /> */}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
