import { InputBox } from "../../components/input.components";
import { Link } from "react-router-dom";
import Design1 from "../../img/login-design.png";
import Design2 from "../../img/login-design2.png";
import Design3 from "../../img/login-design3.png";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex overflow-hidden flex-row">
      <div className="w-[50%] h-screen bg-blue-700 max-sm:hidden">
        <div className=" flex flex-row items-center gap-2 pl-10 py-5">
          <div className="flex flex-row items-center relative">
            <div className="w-6 h-6  bg-white rounded-md"></div>
            <i className="fi fi-sr-bolt text-blue-700 absolute left-1 top-0.5"></i>
          </div>
          <h1 className="text-[22px] font-inter font-[600] line-clamp-1 text-white">
            Hiphonic
          </h1>
        </div>

        <div className="pt-15 flex justify-center items-center">
          <div className="relative w-[400px] h-[400px]">
            {/* Circle Background */}
            <div className="w-[400px] h-[400px] bg-white rounded-full opacity-5 max-lg:hidden"></div>
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Overlay Images */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <img
                src={Design3}
                alt="Chart 3"
                className="absolute bottom-[30%] left-[15%] w-[42%] rounded-xl"
              />

              <img
                src={Design2}
                alt="Chart 2"
                className="absolute top-[17%] left-[29%] w-[65%] rounded-xl"
              />

              <img
                src={Design1}
                alt="Chart 1"
                className="absolute top-[40%] left-[30%] w-[60%] rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-[50%] h-screen flex flex-col max-sm:pt-6 px-4 relative">
        {/* Logo - Small Screens Only */}
        <div className="sm:hidden absolute top-6 left-4 flex flex-row items-center gap-2 pl-5">
          <div className="flex flex-row items-center relative">
            <div className="w-6 h-6  bg-blue-700 rounded-md"></div>
            <i className="fi fi-sr-bolt text-white absolute left-1 top-0.5"></i>
          </div>
          <h1 className="text-[22px] font-inter font-[600] line-clamp-1 text-black">
            Hiphonic
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center h-full -mt-25 pt-0.5 max-sm:-mt-52">
          <div className="h-full max-sm:w-[350px] max-md:w-[300px] max-lg:w-[350px] w-[350px] flex flex-col justify-center px-1 mt-45">
            <h1 className="text-black font-inter font-bold text-x pb-3">
              Reset your password
            </h1>

            <p className="text-gray-400 font-inter text-[12px] pb-5">
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>

            <div className="flex flex-col items-center">
              <InputBox
                name="email"
                type="email"
                placeholder="Email"
                icon="fi fi-rr-envelope"
              />
            </div>

            <button className="button mt-4 mb-1 text-[12px] font-inter">
              Continue
            </button>

            <p>
              <Link
                to="/login"
                className="font-inter text-[11px] text-blue-600 font-semibold flex justify-center mt-5"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-[12px] font-inter flex justify-center max-sm:mt-40 mt-15">
          Don’t have an account?{" "}
          <span className="text-blue-600 font-semibold ml-1">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
