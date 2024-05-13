import React from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { IOutlineBtn } from "../../Interface/IOutlineBtn";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import "./OutlineButton.css"


export const OutlineButton = ({ title, icon, onClick }: IOutlineBtn) => {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 flex gap-2 items-center text-base font-medium text-primary-300 border border-primary-300 rounded-full"
    >
      {title}
    </button>
  );
};

export const ButtonFull = ({ onClick, className, title, isLoader }: IOutlineBtn) => {
  return (
    <button  onClick={onClick} className={`bg-primary hover:opacity-90  px-3 p-3 font-semibold rounded-lg text-white w-full   `}>
      {title && title}
    </button>
  );
};

export const AddButton = ({ onClick, className, title }: IOutlineBtn) => {
  return (
    <button
      className="bg-primary hover:opacity-90 p-2 px-3 font-semibold rounded-lg text-white ml-auto flex items-center gap-1"
      onClick={onClick}
    >
      <AddIcon /> {title && title}
    </button>
  );
};

export const EyeButton = ({ onClick, className }: IOutlineBtn) => {
  return (
    <RemoveRedEyeOutlinedIcon
      onClick={onClick}
      className={`iconButton w-3 h-3 text-gray cursor-pointer transition-transform duration-300 transform hover:scale-110` + className}
      style={{ width: 16, height: 16 }}
    />
  );
};

export const EditButton = ({ onClick, className }: IOutlineBtn) => {
  return (
    <ModeEditOutlineTwoToneIcon
      onClick={onClick}
      className={`iconButton w-3 h-3 text-primary cursor-pointer ` + className}
      style={{ width: 16, height: 16 }}
    />
  );
};

export const DeleteButton = ({ onClick, className }: IOutlineBtn) => {
  return (
    <DeleteTwoToneIcon
      onClick={onClick}
      className="iconButton w-3 h-3 text-red cursor-pointer"
      style={{ width: 16, height: 16 }}
    />
  );
};
