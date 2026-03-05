import "@/index.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Contact, Home, News, Services, Sobre, Transparency, CitiesList, CityDetails } from "./components/pages";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/transparencia" element={<Transparency />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/cidades" element={<CitiesList />} />
        <Route path="/:state/:citySlug" element={<CityDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
