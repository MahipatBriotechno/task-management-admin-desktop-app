import { Key, useState } from "react";
import { Tab } from "@headlessui/react";
import { debug } from "console";
import React from "react";
import { ITabs } from "../../Interface/ITabs";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const Tabs = ({
  tabList,
  tabListArray,
  className,
  classNameBody,
  activeClass,
  defaultClass,
}: ITabs) => {
  // console.log("tabList", tabList[0]?.content);
  return (
    <div className="sm:w-full xs:w-full">
      <Tab.Group>
        <Tab.List
          className={
            className
              ? className
              : `flex gap-3 rounded-xl bg-white p-[6px] w-fit sm:w-full xs:w-full`
          }
        >
          {tabListArray
            ? tabListArray.map((el: any, key: any) => (
                <Tab
                  key={key}
                  className={({ selected }) =>
                    classNames(
                      "w-auto sm:w-full xs:w-full rounded-xl 11py-2 11px-6 text-sm font-medium leading-5",
                      "",
                      selected
                        ? `bg-secondory-400 text-primary-300 border border-primary-300  ${activeClass}`
                        : `text-gray-500 border border-gray-300 ${defaultClass}`
                    )
                  }
                >
                  <div className={classNameBody}>
                    {el.name}
                    {/* {el.image && <Image src={el.image} alt={""} />} */}
                  </div>
                </Tab>
              ))
            : tabList.map((category: any) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-auto sm:w-full xs:w-full rounded-xl py-2 px-6 text-sm font-medium leading-5",
                      "",
                      selected
                        ? `bg-secondory-400 text-primary-300 border border-primary-300  ${activeClass}`
                        : `text-gray-500 border border-gray-300  ${defaultClass}`
                    )
                  }
                >
                  {category?.name}
                </Tab>
              ))}
        </Tab.List>

        {tabList.map((item: any, idx:any) => {
          return (
            <Tab.Panels className="">
              <Tab.Panel
                key={idx}
                className={classNames(
                  `rounded-xl bg-white ${item.content}`,
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                {item.content}
              </Tab.Panel>
            </Tab.Panels>
          );
        })}
      </Tab.Group>
    </div>
  );
};
