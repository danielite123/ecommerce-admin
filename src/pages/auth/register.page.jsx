import InputBox from "../../components/input.components";
import GoogleLogo from "../../img/google.png";
import FaceebookLogo from "../../img/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import Design1 from "../../img/login-design.png";
import Design2 from "../../img/login-design2.png";
import Design3 from "../../img/login-design3.png";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../../common/session";
import { UserContext } from "../../App";

const RegisterPage = () => {
  let { setUserAuth } = useContext(UserContext);

  const [isChecked, setIsChecked] = useState(false);
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

    let { username, email, password } = formData;
    let formErrors = {};

    if (!username) {
      formErrors.username = "Enter Username";
    }

    if (!email) {
      formErrors.email = "Enter Email";
    }

    if (!password) {
      formErrors.password = "Enter Password";
    }

    if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email";
    }

    if (password && password.length < 8) {
      formErrors.password =
        "Your password is not strong enough. Use at least 8 characters";
    }

    if (!isChecked) {
      return toast.error("Please agree to the Terms & Conditions to proceed.");
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);

      setTimeout(() => {
        setErrors({});
      }, 3000);

      return;
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/admin/signup", formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
        navigate("/");
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleCheckBoxChage = (e) => {
    setIsChecked(e.target.checked);
  };

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
            <div className="w-[400px] h-[400px] bg-white rounded-full opacity-5 max-lg:hidden"></div>
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

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
        <div className="sm:hidden absolute top-6 left-4 flex flex-row items-center gap-2 pl-10">
          <div className="flex flex-row items-center relative">
            <div className="w-6 h-6  bg-blue-700 rounded-md"></div>
            <i className="fi fi-sr-bolt text-white absolute left-1 top-0.5"></i>
          </div>
          <h1 className="text-[22px] font-inter font-[600] line-clamp-1 text-black">
            Hiphonic
          </h1>
        </div>

        <div className="flex-grow flex justify-center sm:mb-5">
          <form id="formElement" onSubmit={handleSubmit}>
            <div className="h-full max-sm:w-[350px] max-md:w-[300px] max-lg:w-[350px] w-[350px] flex flex-col justify-center px-1">
              <h1 className="text-black font-inter font-bold text-x pb-5">
                Sign Up For An Account
              </h1>
              <div className="flex flex-col items-center">
                <InputBox
                  name="username"
                  type="text"
                  placeholder="Username"
                  icon="fi fi-rr-user"
                  error={errors.username}
                />

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
                />
              </div>

              {errors.password ? (
                <p className="font-inter text-[10px] text-red-500 -mt-2 ml-0.5">
                  {errors.password}
                </p>
              ) : (
                <p className="font-inter text-[10px] text-gray-400 -mt-2 ml-0.5">
                  Your password must be at least 8 characters
                </p>
              )}

              <div className="mt-4 flex flex-row gap-2">
                <label className="ios-checkbox blue mt-0.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckBoxChage}
                  />
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
                      />
                    </svg>
                  </div>
                </label>
                <p className="text-[11px] text-gray-400 font-inter">
                  By creating an account means you agree to the{" "}
                  <span className="text-black font-semibold">
                    Terms & Conditions
                  </span>{" "}
                  and our{" "}
                  <span className="text-black font-semibold">
                    Privacy Policy
                  </span>
                </p>
              </div>

              <button className="button mt-6 mb-1 text-[12px] font-inter cursor-pointer">
                Sign Up
              </button>

              <div className="relative w-full flex items-center gap-2 my-5 ">
                <hr className="w-1/2  border-black opacity-10 -mr-5" />
                <p className="text-[12px] text-gray-500 w-[200px] flex justify-center">
                  Or sign up with
                </p>
                <hr className="w-1/2 border-black opacity-10 -ml-5" />
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-4">
                <button className="w-1/2 border border-gray-300 flex flex-row items-center justify-center px-12 py-3.5 rounded-lg gap-2 cursor-pointer">
                  <img src={GoogleLogo} className="h-3.5 w-3.5" />
                  <p className="font-inter text-[12px] font-semibold">Google</p>
                </button>

                <button className=" w-1/2 border border-gray-300 flex flex-row items-center justify-center px-10 py-3.5 rounded-lg gap-2 cursor-pointer">
                  <img src={FaceebookLogo} className="h-3.5 w-3.5" />
                  <p className="font-inter text-[12px] font-semibold">
                    Faceebook
                  </p>
                </button>
              </div>

              <p className="text-[12px] font-inter flex justify-center mt-6">
                Already have an account?{" "}
                <span className="text-blue-600 font-semibold ml-1">
                  <Link to="/login">Log In</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
