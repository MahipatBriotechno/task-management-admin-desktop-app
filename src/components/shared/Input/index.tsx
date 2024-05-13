import React from "react";
import { isInput } from "../../Interface/IInput";

const Input = ({
  label,
  type,
  value,
  placeholder,
  className,
  classNameLabel,
  classNameParent,
  onChange,
  required,
  error, // Added error prop
}: isInput & {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // error: string | null; // Define error prop
}) => {
  return (
    <div className={classNameParent ? classNameParent : "mb-4 w-full"}>
      {label && (
        <label
          htmlFor={label}
          className={`block mb-2 ml-0 text-sm font-medium text-gray-900 ${classNameLabel}`}
        >
          {label}
        </label>
      )}
      {type === "tel" ? (
        <input
          type={"tel"}
          id={label}
          className={`bg-white border border-gray-300 text-grey-500 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[10px] px-3 focus:ring-0 ${
            error &&  error ? "border-red-500" : "" // Apply error styling if error exists
          } ${className}`}
          placeholder="011-4725-2000"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type ? type : "text"}
          id={label}
          className={`bg-white border border-gray-300 text-grey-500 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[10px] px-3 focus:ring-0 ${
            error && error ? "border-red-500" : "" // Apply error styling if error exists
          } ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
      {error && (
        <p className="text-red text-xs mt-1">{error}</p> // Display error message if error exists
      )}
    </div>
  );
};

export default Input;
