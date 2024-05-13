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

const EditEmpForm = ({
  setIsOpen,
  setIsEditOpen,
  user,
  selectId,
  setSelectId,
}: any) => {
  const dispatch: any = useDispatch();

  const [isLoader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [empUpdateData, setEmpUpdateData] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const empUpdate = useSelector((state: any) => state?.empUpdate);

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

  // Update
  const handalUpdateEmployee = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = validateName(name);

    if (isEmailValid && isPasswordValid && isNameValid) {
      dispatch(updateUser(selectId, name, email, password, role));
      setLoader(empUpdate?.loading);
      setEmpUpdateData(true);
      setIsEditOpen(false);
    }
  };

  useEffect(() => {
    if (empUpdateData) {
      // Your toast notifications logic
    }
  }, [empUpdateData, empUpdate.messageArray]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPassword(user.password || "");
      setRole(user.role || "");
    }
  }, [user]);

  return (
    <div>
      <Input
        label="Employee Name"
        placeholder="Employee Name"
        value={name}
        onChange={(e: any) => {
          setName(e.target.value);
          if (name.length >= 2) {
            setNameError(null);
          }
        }}
        required={true}
        error={nameError} 
      />

      <Input
        label="Email Id"
        placeholder="Employee Email Id"
        value={email}
        onChange={(e: any) => {
          setEmail(e.target.value);
          setEmailError(null); 
        }}
        required
        error={emailError} 
      />
      <div className="flex items-center relative">
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => {
            setPassword(e.target.value);
            if (password.length > 6) {
              setPasswordError(null);
            } 
          }}
          required
          error={passwordError} 
        />
        <button
          className={`absolute right-2 z-10  ${passwordError == null && 'mt-2'} `}
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
        {empUpdate?.loading ? (
          <div className="bg-primary  rounded-lg text-white w-full text-center pt-2 pb-1 cursor-not-allowed">
            <ClipLoader color="text-white" size={30} />
          </div>
        ) : (
          <ButtonFull onClick={handalUpdateEmployee} title={"Update Task"} />
        )}
      </div>
    </div>
  );
};

export default EditEmpForm;
