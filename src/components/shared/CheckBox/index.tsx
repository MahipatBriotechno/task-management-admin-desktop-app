import React from "react";
import { useState } from "react";
import { ICheckbox } from "../../Interface/ICheckBox";

export const CheckBox = ({ label }: ICheckbox) => {
  const [isChecked, setCheckBox] = useState<boolean>(false);
  const OnchnageCheck = (e: any) => {
    setCheckBox(e.target.checked);
  };
  return (
    <div className="flex items-center gap-2">
      <label
        className="relative flex cursor-pointer items-center rounded-full ml-0 mt-0 "
        htmlFor="checkbox"
        data-ripple-dark="true"
      >
        <input
          type="checkbox"
          className="peer !m-0 relative !h-5 !shadow-none !w-5 cursor-pointer appearance-none !rounded-md !border !border-gray-200 !bg-gray-50 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary-300 checked:!bg-primary-300  hover:before:opacity-10"
          id="checkbox"
          checked={isChecked}
          onChange={OnchnageCheck}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            width="10"
            height="10"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.99922 5.80001C2.79453 5.80001 2.58984 5.72189 2.43359 5.56564L0.433594 3.56564C0.121094 3.25314 0.121094 2.74689 0.433594 2.43439C0.746094 2.12189 1.25234 2.12189 1.56484 2.43439L2.99922 3.86876L6.43359 0.434387C6.74609 0.121887 7.25234 0.121887 7.56484 0.434387C7.87734 0.746887 7.87734 1.25314 7.56484 1.56564L3.56484 5.56564C3.40859 5.72189 3.20391 5.80001 2.99922 5.80001Z"
              fill="white"
            />
          </svg>
        </div>
      </label>
      {label && (
        <span
          className={`text-base ${
            isChecked ? "text-primary-300" : "text-gray-500"
          } mt-[2px]`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
