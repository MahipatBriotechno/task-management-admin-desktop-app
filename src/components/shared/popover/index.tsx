import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import React from "react";
import { IPopover } from "../../Interface/IPopover";

export const PopoverComponent = ({
    buttonTitle,
  popoverClass,
  children,
}: IPopover) => {
  return (
    <div className="w-[37%]">
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button
            className={
              "text-gray-500 border border-gray-300 py-2 px-6 rounded-[12px] text text-base lg:hidden xl:hidden 2xl:hidden 3xl:hidden md:hidden xs:w-full sm:w-full"
            }
          >
            {buttonTitle}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`box-shadow-menu absolute right-0 mt-2 w-[345px] origin-top-right divide-y divide-gray-100 rounded-[16px] bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${popoverClass}`}
          >
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
