import { useContext, useState } from "react";
import { SearchInputBox } from "./input.components";
import { UserContext } from "../App";
import UserNavigationPanel from "../components/navigation.component";
import SidebarPanel from "./sidebar-navigation.component";

const Navbar = ({ setActivePage, noBorder = false, title, description }) => {
  const {
    userAuth: { profile_img },
  } = useContext(UserContext);

  const [userNavPanel, setUserNavPanel] = useState(false);
  const [sidebarPanel, setSidebarPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleSidebarPanel = () => {
    setSidebarPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
      setSidebarPanel(false);
    }, 200);
  };

  return (
    <div
      className={`${
        noBorder
          ? "max-md:border-b max-md:border-gray-200"
          : "border-b border-gray-200"
      } h-[75.5px] flex flex-row justify-between pt-1`}
    >
      <div className="hidden md:flex flex-col pl-6 pt-2.5">
        <h1 className="font-inter font-semibold text-xl">{title}</h1>
        <p className="text-[12px] text-gray-500 whitespace-nowrap">
          {description}
        </p>
      </div>

      <div className="md:hidden flex flex-row ">
        <div className="absolute top-6 left-6 flex flex-row items-center gap-2 -mt-2">
          <div className="flex flex-row items-center relative">
            <div className="w-6 h-6 bg-blue-700 rounded-md"></div>
            <i className="fi fi-sr-bolt text-white absolute left-1 top-0.5"></i>
          </div>
          <h1 className="text-[22px] font-inter font-[600] line-clamp-1 text-black">
            Hiphonic
          </h1>
        </div>

        <div
          className="max-sm:hidden absolute top-[23px] left-40 cursor-pointer"
          onClick={handleSidebarPanel}
        >
          <i className="fi fi-rr-menu-burger text-xl text-gray-600"></i>
        </div>
      </div>

      <div className="flex flex-row items-center pl-6 pt-2.5 gap-5 max-sm:hidden">
        <SearchInputBox
          name="search"
          placeholder="Search anything..."
          icon="fi-rr-search"
        />

        <div className="-mt-[9px] cursor-pointer">
          <i className="fi fi-rs-bell text-gray-500"></i>
        </div>

        <div
          className="flex flex-row items-center -mt-4 overflow-hidden mr-5 p-5 -ml-4.5 cursor-pointer"
          onClick={handleUserNavPanel}
          onBlur={handleBlur}
        >
          <img
            src={profile_img}
            className="w-8 h-8 object-cover rounded-full"
          />
          <i className="fi fi-rr-angle-small-down mt-2 ml-2"></i>

          {userNavPanel ? <UserNavigationPanel /> : ""}
        </div>
      </div>

      <div className="mt-6 mr-8 min-sm:hidden" onClick={handleSidebarPanel}>
        <i className="fi fi-rr-menu-burger text-xl text-gray-600"></i>
      </div>

      {sidebarPanel && (
        <SidebarPanel
          setActivePage={setActivePage}
          isOpen={sidebarPanel}
          sidebarPanel={sidebarPanel}
          setSidebarPanel={setSidebarPanel}
        />
      )}
    </div>
  );
};

export default Navbar;
