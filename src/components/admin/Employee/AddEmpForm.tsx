import React, { useEffect, useState } from "react";
import Input from "../../shared/Input";
import { ClipLoader } from "react-spinners";
import { ButtonFull } from "../../shared/Buttons/OutlineButton";
import {
  registerUser,
  updateUser,
} from "../../../state-management/admin/emp/employeesActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AddEmpForm = ({
  setIsOpen,
  setIsEditOpen,
  user,
  selectId,
  setSelectId,
}: any) => {
  const dispatch: any = useDispatch();
  const { message, addLoading } = useSelector((state: any) => state?.empAdd);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateEmail = (email: string) => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? null : "Please enter a valid email address");
    return isValid;
  };

  const validatePassword = (password: string | any[]) => {
    const isValid = password.length >= 8;
    setPasswordError(isValid ? null : "Password must be at least 8 characters");
    return isValid;
  };

  const validateName = (name: string | any[]) => {
    const isValid = name.length >= 3;
    setNameError(isValid ? null : "Name must be at least 3 characters");
    return isValid;
  };

  const handleAddEmployee = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = validateName(name);

    if (isEmailValid && isPasswordValid && isNameValid) {
      dispatch(registerUser(name, email, password, role));
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, setIsOpen]);

  return (
    <div>
      <Input
        label="Employee Name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
          if (name.length >= 2) {
            setNameError(null);
          }
        }}
        required
        error={nameError}
      />

      <Input
        label="Email Id"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
          validateEmail(email)
          // if (validateEmail(email)) {
            
          //   setEmailError(null);
          // }
        }}
        required
        error={emailError}
      />
      <div className="flex items-center relative">
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
            if (password.length > 6) {
              setPasswordError(null);
            }
          }
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

      <div className="w-full mt-6">
        {loading ? (
          <div className="bg-primary  rounded-lg text-white w-full text-center pt-2 pb-1 cursor-not-allowed">
            <ClipLoader color="text-white" size={30} />
          </div>
        ) : (
          <ButtonFull onClick={handleAddEmployee} title={"Add Task"} />
        )}
      </div>
    </div>
  );
};

export default AddEmpForm;
