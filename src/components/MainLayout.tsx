import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./shared/Header";
import { Animate } from "@/lib/Animate";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
