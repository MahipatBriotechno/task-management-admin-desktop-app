import React, { useRef, useEffect } from "react";
import { IOTPInput } from "../../Interface/IOTPInput";

const OTPInput = ({ numInputs, setOtp, className }: IOTPInput) => {
  const inputRefs = Array.from({ length: numInputs }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleInput = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const input = e.target as HTMLInputElement;
    const keyPressed = e.nativeEvent as KeyboardEvent;

    if (keyPressed.keyCode === 8 && index > 0 && input.value === "") {
      inputRefs[index - 1].current?.focus();
      logOTPValue();
    } else if (input.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
      logOTPValue();
    }
  };

  const logOTPValue = () => {
    const otpValue = inputRefs
      .map((inputRef) => inputRef.current?.value || "")
      .join("");

    if (otpValue.length === inputRefs.length) {
      console.log("Complete OTP:", otpValue);
      setOtp(parseInt(otpValue));
    }
    if (otpValue.length <= 0) {
      setOtp(0);
    }
  };

//   useEffect(() => {
//     if (inputRefs.length > 0 && inputRefs[0].current) {
//       inputRefs[0].current.focus();
//     }
//   }, [inputRefs]);

  return (
    <div className={`grid grid-cols-${numInputs} gap-4`}>
      {inputRefs.map((inputRef, index) => (
        <input
          key={index}
          ref={inputRef}
          className={" w-auto border-b-[2.5px] border-turnary-800  text-center focus:outline-none focus:border-turnary-800 " + className}
          type="text"
          maxLength={1}
          onChange={(e) => handleInput(index, e)}
          onBlur={logOTPValue}
          onKeyDown={(e) => handleInput(index, e)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
