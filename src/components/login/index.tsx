import React, { useEffect, useState } from "react";
import { RootState } from "../../state-management/store";
import Input from "../shared/Input";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Dispatch } from "redux";
import { LOGIN_ADMIN_SUCCESS } from "../../state-management/admin/login/types";
import {
  loginAdmin,
  loginAdminAction,
  loginAdminSuccess,
} from "../../state-management/admin/login/loginActions";
;



const LoginAdmin: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch: any = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.adminLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      localStorage.setItem("adminLogin", "true");
      await dispatch(loginAdminAction(email, password));
    }
  };

  const validateEmail = (email: string) => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? null : "Please enter a valid email address");
    return isValid;
  };

  const validatePassword = (password: string | any[]) => {
    const isValid = password.length >= 4;
    setPasswordError(isValid ? null : "Password must be at least 4 characters");
    return isValid;
  };
  const adminLogin: any = localStorage.getItem("adminLogin");
  const isLoginAdminData: any = localStorage.getItem("admin");
  const isLogin: any = localStorage.getItem("user");

  console.log("adminLogin", adminLogin);
  useEffect(() => {
    if (adminLogin == "true") {
      if (data != null) {
        if (data && data?.status) {
          toast.success(data?.message);
          console.log("data", data);
          localStorage.setItem("admin", JSON.stringify(data));
          localStorage.setItem("adminLogin", "true");
          setTimeout(() => {
            navigate("/dashboard?tab=task");
          }, 1500);
          dispatch(loginAdminSuccess({ type: "LOGIN_ADMIN_SUCCESS" }));
          dispatch(loginAdmin());
        } else {
          toast.error(data?.message);
        }
      }
    } else {
      navigate("/");
    }
  }, [data, isLoginAdminData]);

  
  return (
    <>
      <ToastContainer position="top-right" />
      <div className="min-h-[95vh] flex items-center justify-center">
        <div className="max-w-[350px] p-10 w-full shadow-2xl">
          <div>
            <div className="m-auto flex items-center justify-center bg-primary w-14 h-14 rounded-full">
              <LockOutlinedIcon className="text-white" />
            </div>
            <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <div
            className="mt-4 11space-y-6"
            // onSubmit={handleSignIn}
          >
            <input type="hidden" name="remember" value="true" />
            
            <Input
              label="Email Id"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
              error={emailError}
            />
            <div className="flex items-center relative mt-3">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
                error={passwordError}
              />
              <button
                className={`absolute right-2 z-10  ${
                  passwordError == null && "mt-2"
                } `}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VisibilityIcon className="w-5 h-3" />
                ) : (
                  <VisibilityOffIcon className="w-5 h-3" />
                )}
              </button>
            </div>

            <div>
              <button
                // type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSignIn}
              >
                {loading ? (
                  <ClipLoader color="text-primary" size={30} />
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* <div className="flex gap-3 items-center">
            <p>Don't have an account?</p>
            <Link to={"/signup"} className="flex justify-center font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
