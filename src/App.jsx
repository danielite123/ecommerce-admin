import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import ResetPasswordPage from "./pages/auth/reset.password.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./common/ProtectedRoute";
import AuthRedirect from "./common/AuthRedirect";
import DashBoard from "./pages/dashboard";
import CustomerPage from "./pages/customer.page";
import ProductPage from "./pages/product.page";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashBoard />}>
            <Route path="/" element={<h1>Overview</h1>} />
            <Route path="/analytics" element={<h1>Analytics</h1>} />
            <Route path="/orders" element={<h1>Orders</h1>} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/settings" element={<h1>Settings</h1>} />
          </Route>
        </Route>

        <Route
          path="/login"
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <RegisterPage />
            </AuthRedirect>
          }
        />

        <Route
          path="/reset-password"
          element={
            <AuthRedirect>
              <ResetPasswordPage />
            </AuthRedirect>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
          style: {
            fontSize: "11px",
            padding: "6px 10px",
            borderRadius: "6px",
          },
        }}
      />
    </UserContext.Provider>
  );
}

export default App;
