import "@/index.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Home } from "./components/pages";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/transparencia" element={<Transparency />} /> */}
        {/* <Route path="/profile/:id/*" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
