
import React from "react"
import { isText } from "../../Interface/IText"

export function Text14({ className, children, color }: isText) {
    return (
        <p className={`${color ? color : 'text-grey-500'} text-sm  leading-6 ${className}`}>{children}</p>
    )
}
export function Text16({ className, children, color }: isText) {
    return (
        <p className={`${color ? color : 'text-grey-500'} text-base  leading-6 ${className}`}>{children}</p>
    )
}
export function Text1620({ className, children, color }: isText) {
    return (
        <p className={`${color ? color : 'text-grey-500'} text-base lg:text-xl  ${className}`}>{children}</p>
    )
}
export function Text18({ className, children, color }: isText) {
    return (
        <h6 className={`${color ? color : 'text-grey-500'} text-lg  leading-[26px] ${className}`}>{children}</h6>
    )
}
export function Text20({ className, children, color }: isText) {
    return (
        <h5 className={`${className} ${color ? color : 'text-grey-500'} text-xl  `}>{children}</h5>
    )
}
export function Text24({ className, children, color }: isText) {
    return (
        <h2 className={` ${color ? color : 'text-grey-500'} leading-7 lg:leading-8 text-base lg:text-2xl ${className}`}>{children}</h2>
    )
}
export function Text32({ className, children, color }: isText) {
    return (
        <h1 className={`text-black text-2xl lg:text-[32px] leading-8 lg:leading-10 font-bold ${className}`}>{children}</h1>
    )
}
export function TextSky({ className, children }: isText) {
    return (
        <span className={`text-turnary-800  ${className}`}>{children}</span>
    )
}
export function TextPink({ className, children }: isText) {
    return (
        <span className={`text-pink-800  ${className}`}>{children}</span>
    )
}


export function TextOldPrice({ className, children }: isText) {
    return (
        <div className="flex items-center gap-1 relative">
            <Text24 color="text-grey-800" className="font-bold">{children}</Text24>
        </div>
    )
}