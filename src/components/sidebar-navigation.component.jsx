import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const SidebarPanel = ({ setActivePage, setSidebarPanel }) => {
  const { setUserAuth } = useContext(UserContext);
  const location = useLocation();

  const [activeButton, setActiveButton] = useState("overview");
  const [isClosing, setIsClosing] = useState(false);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setActivePage(button);
    setIsClosing(true);
    setTimeout(() => {
      setSidebarPanel(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path) {
      setActiveButton(path);
      setActivePage(path);
    }
  }, [location.pathname, setActivePage]);

  return (
    <div
      className="bg-white absolute top-[75px] right-0 left-0 border border-gray-300 overflow-hidden h-[calc(100vh-75px)] w-[250px] md:hidden"
      style={{
        animation: isClosing
          ? "slideOut 0.3s ease-out forwards"
          : "slideIn 0.3s ease-out forwards",
      }}
    >
      <div className="flex flex-col gap-5 pt-12 pl-11 text-gray-400">
        <Link to="/">
          <button
            className={`flex flex-row w-full gap-4 p-2 px-8 -ml-7 items-center cursor-pointer ${
              activeButton === "overview"
                ? "text-blue-600 bg-blue-50 rounded-md"
                : "text-gray-400"
            }`}
            onClick={() => handleButtonClick("overview")}
          >
            <i className="fi fi-sr-apps text-[17px]"></i>
            <p className="text-[15px] font-inter -mt-1">Overview</p>
          </button>
        </Link>

        <Link to="/analytics">
          <button
            className={`flex flex-row w-full gap-4 p-2 px-8 -ml-7 items-center cursor-pointer ${
              activeButton === "analytics"
                ? "text-blue-600 bg-blue-50 rounded-md"
                : "text-gray-400"
            }`}
            onClick={() => handleButtonClick("analytics")}
          >
            <i className="fi fi-sr-chart-histogram text-[17px]"></i>
            <p className="text-[15px] font-inter -mt-1">Analytics</p>
          </button>
        </Link>

        <Link to="/orders">
          <button
            className={`flex flex-row w-full gap-4 p-2 px-8 -ml-7 items-center cursor-pointer ${
              activeButton === "orders"
                ? "text-blue-600 bg-blue-50 rounded-md"
                : "text-gray-400"
            }`}
            onClick={() => handleButtonClick("orders")}
          >
            <i className="fi fi-ts-order-history text-[17px]"></i>
            <p className="text-[15px] font-inter -mt-1">Orders</p>
          </button>
        </Link>

        <Link to="/products">
          <button
            className={`flex flex-row w-full gap-4 p-2 px-8 -ml-7 items-center cursor-pointer ${
              activeButton === "products"
                ? "text-blue-600 bg-blue-50 rounded-md"
                : "text-gray-400"
            }`}
            onClick={() => handleButtonClick("products")}
          >
            <i className="fi fi-rr-briefcase text-[17px]"></i>
            <p className="text-[15px] font-inter -mt-1">Products</p>
          </button>
        </Link>

        <Link to="/customers">
          <button
            className={`flex flex-row w-full gap-4 p-2 px-8 -ml-7 items-center cursor-pointer ${
              activeButton === "customers"
                ? "text-blue-600 bg-blue-50 rounded-md"
                : "text-gray-400"
            }`}
            onClick={() => handleButtonClick("customers")}
          >
            <i className="fi fi-rr-user text-[17px]"></i>
            <p className="text-[15px] font-inter -mt-1">Customers</p>
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-5 pl-12.5 text-gray-400 mt-27">
        <Link to="/settings">
          <button
            className={`flex flex-row w-full p-2 px-8 -ml-8.5 gap-4 items-center cursor-pointer ${
              activeButton === "settings"
                ? "text-blue-600 bg-blue-50 rounded-md"
                : "text-gray-400"
            }`}
            onClick={() => handleButtonClick("settings")}
          >
            <i className="fi fi-rr-settings text-[17px]"></i>
            <p className="text-[15px] font-inter -mt-1">Settings</p>
          </button>
        </Link>

        <button
          className="flex flex-row gap-4 items-center cursor-pointer mb-7"
          onClick={signOutUser}
        >
          <i className="fi fi-tr-sign-out-alt text-[17px]"></i>
          <p className="text-[15px] font-inter -mt-1">Log Out</p>
        </button>
      </div>
    </div>
  );
};

export default SidebarPanel;
