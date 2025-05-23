import { InputBox } from "../../components/input.components";
import GoogleLogo from "../../img/google.png";
import FaceebookLogo from "../../img/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import Design1 from "../../img/login-design.png";
import Design2 from "../../img/login-design2.png";
import Design3 from "../../img/login-design3.png";
import { storeInSession } from "../../common/session";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../App";

const LoginPage = () => {
  let { setUserAuth } = useContext(UserContext);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let form = new FormData(e.target);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { email, password } = formData;
    let formErrors = {};

    if (!email) {
      formErrors.email = "Enter Email";
    }

    if (!password) {
      formErrors.password = "Enter Password";
    }

    if (email && !emailRegex.test(email)) {
      formErrors.email = "Invalid email";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTimeout(() => {
        setErrors({});
      }, 3000);
      return;
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/login", formData)
      .then(({ data }) => {
        if (data.role !== "admin") {
          return toast.error("Only admin can login");
        }

        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
        navigate("/");
        return toast.success("Login succesfully");
      })
      .catch(({ response }) => {
        if (response.data?.errors) {
          setErrors({
            ...formErrors,
            ...response.data.errors,
          });

          setTimeout(() => {
            setErrors({});
          }, 3000);
        } else {
          toast.error(response.data?.error || "An error occurred");
        }
      });
  };

  return (
    <div className="min-h-screen flex overflow-hidden flex-col md:flex-row">
      <div className="hidden md:flex flex-col justify-between w-[50%] h-screen bg-blue-700">
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

        <div className="flex flex-col items-center justify-center text-center mt-5 mb-10">
          <h1 className="font-inter font-bold text-white text-[18px] max-md:text-[14px]">
            Customizable Multipurpose Dashboard
          </h1>
          <p className="text-[12px] text-white font-inter mt-2 max-md:text-[8px]">
            Everything you need in an easily customizable dashboard.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 min-h-screen flex flex-col px-4 max-md:pb-10 relative">
        <div className="md:hidden py-4 flex flex-row items-center gap-2">
          <div className="flex flex-row items-center relative">
            <div className="w-6 h-6  bg-blue-700 rounded-md"></div>
            <i className="fi fi-sr-bolt text-white absolute left-1 top-0.5"></i>
          </div>
          <h1 className="text-[22px] font-inter font-[600] line-clamp-1 text-black">
            Hiphonic
          </h1>
        </div>

        <div className="flex flex-col flex-grow md:justify-center md:items-center">
          <form
            id="formElement"
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto my-4"
          >
            <div className="w-full flex flex-col justify-center px-1">
              <h1 className="text-black font-inter font-bold text-x pb-3 text-left">
                Sign In For An Account
              </h1>

              <p className="text-gray-400 font-inter text-[12px] max-sm:pb-5 text-left">
                Welcome back! please enter your detail
              </p>

              <div className="flex flex-col items-center">
                <InputBox
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon="fi fi-rr-envelope"
                  error={errors.email}
                />

                <InputBox
                  name="password"
                  type="password"
                  placeholder="Password"
                  icon="fi fi-rr-lock"
                  error={errors.password}
                />
              </div>

              <div className="flex flex-row items-center justify-between w-full -mt-1">
                <div className="flex flex-row gap-2">
                  <label className="ios-checkbox blue mt-0.5">
                    <input type="checkbox" />
                    <div className="checkbox-wrapper">
                      <div className="checkbox-bg"></div>
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="checkbox-icon"
                      >
                        <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="3"
                          stroke="currentColor"
                          d="M4 12L10 18L20 6"
                          className="check-path"
                        ></path>
                      </svg>
                    </div>
                  </label>
                  <p className="text-[11px] text-gray-400 font-inter">
                    Remember me
                  </p>
                </div>

                <p>
                  <Link
                    to="/reset-password"
                    className="text-[11px] text-blue-600 font-semibold font-inter"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>

              <button className="button mt-6 mb-1 text-[12px] font-inter w-full">
                Sign In
              </button>

              <div className="relative w-full flex items-center gap-2 my-5">
                <hr className="w-1/2 border-black opacity-10" />
                <p className="text-[12px] text-gray-500 w-auto px-2">
                  Or sign in with
                </p>
                <hr className="w-1/2 border-black opacity-10" />
              </div>

              <div className="w-full flex flex-row max-md:flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  className="w-1/2 max-md:w-full border border-gray-300 flex flex-row items-center justify-center px-4 py-3.5 rounded-lg gap-2 cursor-pointer"
                >
                  <img src={GoogleLogo} className="h-3.5 w-3.5" alt="Google" />
                  <p className="font-inter text-[12px] font-semibold">Google</p>
                </button>

                <button
                  type="button"
                  className="w-1/2 max-md:w-full border border-gray-300 flex flex-row items-center justify-center px-4 py-3.5 rounded-lg gap-2 cursor-pointer"
                >
                  <img
                    src={FaceebookLogo}
                    className="h-3.5 w-3.5"
                    alt="Facebook"
                  />
                  <p className="font-inter text-[12px] font-semibold">
                    Facebook
                  </p>
                </button>
              </div>

              <p className="text-[12px] font-inter flex justify-center mt-6 max-md:hidden">
                Don't have an account?{" "}
                <span className="text-blue-600 font-semibold ml-1">
                  <Link to="/register">Sign Up</Link>
                </span>
              </p>
            </div>
          </form>
          <p className="text-[12px] font-inter flex justify-center mb-4 mt-auto min-md:hidden">
            Don't have an account?{" "}
            <span className="text-blue-600 font-semibold ml-1">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
