import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className="tw:flex tw:flex-col tw:h-screen">
      <header className="tw:h-12.5">
        <Header />
      </header>
       <main className="tw:grow">
        <Outlet />
      </main>
    </div>
  );
};
