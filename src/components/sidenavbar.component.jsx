import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = ({ setActivePage }) => {
  const { setUserAuth } = useContext(UserContext);
  const location = useLocation();

  const [activeButton, setActiveButton] = useState("overview");

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setActivePage(button);
  };

  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path) {
      setActiveButton(path);
      setActivePage(path); // Also update the parent's activePage
    }
  }, [location.pathname, setActivePage]);

  return (
    <div className="flex flex-col justify-between w-55 border-r border-gray-200 bg-white h-screen pt-6 max-md:hidden">
      <div className="pl-8">
        <div className="flex flex-row gap-2 items-center border-gray-200 pb-6">
          <div className="flex flex-row items-center relative">
            <div className="w-5.5 h-5.5  bg-blue-700 rounded-md"></div>
            <i className="fi fi-sr-bolt text-[14px] text-white absolute left-1 top-0.5"></i>
          </div>
          <h1 className="text-[18px] font-inter font-[600] line-clamp-1 text-black">
            Hiphonic
          </h1>
        </div>
        <hr className="border-gray-200 -ml-8" />
      </div>

      <div className="flex flex-col gap-5 pt-12 pl-11 text-gray-400 -mt-30">
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

      <div className="flex flex-col gap-5 pl-12.5 text-gray-400 ">
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

export default SideNavbar;
