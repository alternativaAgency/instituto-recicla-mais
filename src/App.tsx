import "@/index.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { Home, Sobre } from "./components/pages";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
}

export default App;
