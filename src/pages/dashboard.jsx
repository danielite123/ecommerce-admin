import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar.component";
import SideNavbar from "../components/sidenavbar.component";
import { useEffect, useState } from "react";
import SubNav from "../components/subnav.component";

const DashBoard = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("overview");

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path && path !== activePage) {
      setActivePage(path);
    }
  }, [location.pathname]);

  const pageData = {
    overview: {
      title: "Overview",
      description: "Detailed information about your store",
    },
    analytics: {
      title: "Analytics",
      description: "Monitor progress regularly to increase sales",
    },
    orders: {
      title: "Orders",
      description: "Detailed information about your orders",
    },
    products: {
      title: "Product List",
      description: "Detailed information about your products",
    },
    customers: {
      title: "Customers",
      description: "View and manage your store's customers",
    },
    settings: {
      title: "Settings",
      description: "Update preferences and configure your store",
    },
  };

  const { title, description } = pageData[activePage] || pageData["overview"];

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavbar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1">
        <Navbar
          setActivePage={setActivePage}
          noBorder={activePage === "products"}
          title={title}
          description={description}
        />
        <div className="max-md:hidden">
          {activePage === "products" && <SubNav />}
        </div>

        <main className="bg-[#F8FAFC] h-screen p-6">
          <div className="md:hidden mb-4">
            <h1 className="font-inter font-semibold text-2xl">{title}</h1>
            <p className="text-[13px] text-gray-500 whitespace-nowrap">
              {description}
            </p>
          </div>

          <div className="min-md:hidden">
            {activePage === "products" && <SubNav />}
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
