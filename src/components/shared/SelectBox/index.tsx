import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import React from "react";
import { ISelectBox } from "../../Interface/IselectBox";
// import { getValue } from "@testing-library/user-event/dist/utils";
const option = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

export const SelectBox = ({
  option,
  palaceHolder,
  selected,
  setSelected,
  className,
  label,
  classNameLabel,
  classNamePHolder,
  classNameOption,
  classNameLi,
  onChange,
  error
}: ISelectBox) => {

  const handleChange = (option: any) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };
  //   const [selected, setSelected] = useState<any>();

  return (
    <div className="">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative ">
          {label &&
            <label
              htmlFor={label}
              className={`block mb-2 ml-0 text-sm font-medium text-gray-900 ${classNameLabel}`}
            >
              {label && label}
            </label>
          }

          <Listbox.Button className={`relative w-full cursor-default rounded-lg border border-gray-200 bg-white py-[10px] px-[18px] text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${className}`}>
            <span className={`block truncate text-gray-500 text-base font-normal ${classNamePHolder}`}>
              {selected ? selected.name : palaceHolder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <KeyboardArrowUpIcon
                className={`rotate-180 transform h-8 w-8 text-turnary-800`}
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 z-30 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {option.map((person:any, personIdx:any) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${classNameLi} ${active
                      ? "bg-secondory-400 text-primary-300"
                      : "text-gray-500"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate  ${selected ? "font-medium " : "font-normal "
                          } ` + classNameOption}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-300">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {error && (
        <p className="text-red text-xs mt-1">{error}</p> // Display error message if error exists
      )}

    </div>
  );
};
