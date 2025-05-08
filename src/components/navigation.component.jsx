import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const NavigationPanel = () => {
  const { setUserAuth } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <div className="bg-white absolute top-[55px] right-6 border border-gray-300 overflow-hidden w-30">
      <div className="flex flex-row items-center text-gray-400 text-[12px]">
        <button
          className="flex flex-row gap-2 text-left hover:bg-grey w-full pl-6 py-2 cursor-pointer outline-none"
          onClick={signOutUser}
        >
          <i className="fi fi-tr-sign-out-alt text-red-400 "></i>
          <h1 className="font-bold text-[12px] mg-1">Sign Out</h1>
        </button>
      </div>
    </div>
  );
};

export default NavigationPanel;
