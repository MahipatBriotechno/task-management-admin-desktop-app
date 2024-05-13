import React, { useEffect, useState } from "react";
import { Container } from "../../components/shared/Container";
import { Card } from "../../components/shared/card";
import MyModal from "../../components/shared/MyModal";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../components/shared/Input";
import { SelectBox } from "../../components/shared/SelectBox";
import AddIcon from "@mui/icons-material/Add";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import {
  AddButton,
  ButtonFull,
  DeleteButton,
  EditButton,
} from "../../components/shared/Buttons/OutlineButton";
import Task from "../../components/admin/Task";
import { useLocation } from "react-router-dom";
import Employee from "../../components/admin/Employee";
import { ToastContainer, toast } from "react-toastify";

const HeaderAdmin = React.lazy(
  () => import("../../components/admin/HeaderAdmin")
);

const TaskTable = [
  {
    no: 1,
    assign_date: "11-Mar-24",
    title: "Manager",
    emp_name: "Mayank",
    status: "Pending",
    submission_date: "1-Mar-24",
  },
  {
    no: 2,
    assign_date: "11-Mar-24",
    title: "Manager",
    emp_name: "Soham",
    status: "Completed",
    submission_date: "1-Mar-24",
  },
  {
    no: 3,
    assign_date: "11-Mar-24",
    title: "Manager",
    emp_name: "Yogesh",
    status: "Active",
    submission_date: "1-Mar-24",
  },
  {
    no: 4,
    assign_date: "11-Mar-24",
    title: "Manager",
    emp_name: "Sujal",
    status: "Completed",
    submission_date: "1-Mar-24",
  },
  {
    no: 5,
    assign_date: "11-Mar-24",
    title: "Manager",
    emp_name: "Sujal",
    status: "Pending",
    submission_date: "1-Mar-24",
  },
];

const EmpNameOption = [
  { name: "Yogesh" },
  { name: "Mayank" },
  { name: "Soham" },
];
const statusOption = [
  { name: "Pending" },
  { name: "Active" },
  { name: "Completed" },
];
const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState('');

  // Use location from React Router to get the current URL
  const location = useLocation();

  const extractValue = (queryString: any) => {
    const parts = queryString.split("=");
    return parts[1];
  };

  // Get the value after "=" sign
  const activeTab = extractValue(location.search);

  // console.log("location.pathname",location.search)
 
  return (
    <>
      {activeTab == "task" ? (
        <Task />
      ) : activeTab == "employee" ? (
        <Employee />
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
