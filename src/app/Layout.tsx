import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";


const BaseLayout = () => {
  return (
    <div className="tw:flex tw:flex-col">
      <header className="tw:h-(--header-h-base)">
        <Header />
      </header>
       <main className="tw:grow tw:h-[calc(100vh-var(--header-h-base))]">
        <Outlet />
      </main>
    </div>
  );
};

export { BaseLayout }
