import { Outlet } from "react-router-dom";
import Header from "./shared/Header";
import { Animate } from "@/lib/Animate";

const MainLayout = () => {
  return (
    <div 
      className="flex flex-col min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/images/background-one.jpg)',
      }}
    >
      <Header />
      <main className="flex-1">
        <Animate>
          <Outlet />
        </Animate>
      </main>
    </div>
  );
};

export default MainLayout;
