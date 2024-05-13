import React from "react"
import { isRadio } from "../../Interface/IRadio"

const Radio = ({id, name, label, className, classNameLabel}:isRadio) => {
    return (
        <div className="flex items-center me-4 ">
            <input id={id} type="radio" value="" name={name} className={className ? className : `w-4 h-4 text-turnary-800 bg-gray-100 border-turnary-800 dark:ring-offset-gray-800 focus:ring-0  cursor-pointer`} />
            <label htmlFor={id} className={classNameLabel ? classNameLabel : `ms-2 text-sm font-medium text-gray-900  cursor-pointer`}>{label}</label>
            </div>
    )
}

export default Radio