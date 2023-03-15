import { Header } from "./";

const Layout = ({ children }: any) => {
  return (
    <div className="w-screen min-h-screen relative">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
