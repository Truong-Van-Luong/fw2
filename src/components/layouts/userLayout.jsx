import { Outlet } from "react-router-dom";
import Header from "./header";

const UserLayout = () => (
  <div className="UserLayout" style={{ display: "flex" }}>
    <Header />
    <main style={{ flexGrow: 1, padding: "1rem", marginTop: "64px" }}>
      <Outlet />
    </main>
  </div>
);

export default UserLayout;
