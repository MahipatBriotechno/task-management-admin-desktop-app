import React, { useEffect, useState } from "react";
import Input from "../../shared/Input";
import { ClipLoader } from "react-spinners";
import { ButtonFull } from "../../shared/Buttons/OutlineButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SelectBox } from "../../shared/SelectBox";
import { RootState } from "../../../state-management/store";
import {
  addTask,
  tasksList,
} from "../../../state-management/admin/task/action";
const statusOption = [
  { name: "Pending" },
  { name: "Active" },
  { name: "Completed" },
];
const AddTaskForm = ({
  setIsOpen,
  setIsEditOpen,
  user,
  selectId,
  setSelectId,
}: any) => {
  const dispatch: any = useDispatch();

  const { tasks } = useSelector((state: RootState) => state.task);

  let empsList = useSelector((state: any) => state.emps.emps);
  const [selectEmpName, setSelectEmpName] = useState<any>();
  const [selectStatus, setSelectStatus] = useState<any>();
  const [title, setTitle] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [empname, setEmpname] = useState("");
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [empNameError, setEmpNameError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [assignDateError, setAssignDateError] = useState<string | null>(null);

  // VALIDATION
  const validateTitle = (title: string | any[]) => {
    const isValid = title.length >= 3;
    setTitleError(isValid ? null : "Title must be at least 3 characters");
    return isValid;
  };
  const validateEmpName = (empname: string | any[]) => {
    const isValid = empname.length >= 2;
    setEmpNameError(isValid ? null : "Please Select Employee Name");
    return isValid;
  };
  const validateStatus = (status: string | any[]) => {
    const isValid = status.length >= 2;
    setStatusError(isValid ? null : "Please Select Status");
    return isValid;
  };
  const validateAssignDate = (assignDate: string | any[]) => {
    const isValid = assignDate.length >= 2;
    setAssignDateError(isValid ? null : "Please Select Assign Date");
    return isValid;
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, setIsOpen]);

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
    if(title.length >= 2){
      setTitleError(null)
    }
  };
  const handleChangeDate = (e: any) => {
    setAssignDate(e.target.value);
    if(e.target.value){
      setAssignDateError(null)
    }
  };
  const handleChangeEmpname = (option: any) => {
    setEmpname(option.name);
    setEmpId(option._id);
    console.log("empid", option);
    if(option.name){
      setEmpNameError(null)
    }
  };
  const handleChangeStatus = (option: any) => {
    setStatus(option.name);
    if(option.name){
      setStatusError(null)
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(title, empname, status, assignDate);
  };
  const AddTaskHandal = async () => {
    try {
      const taskData = {
        title: title,
        empName: empname,
        empId: empId,
        status: status,
        assignDate: assignDate,
        submissionDate: "2024-04-26",
        startTime: "0:0:0",
        endTime: "0:0:0",
        totalTimeDuration: "0:0:0",
      };
      const isTitleValid = validateTitle(title);
      const isEmpNameValid = validateEmpName(empname);
      const isStatusValid = validateStatus(status);
      const isAssignDateValid = validateAssignDate(assignDate);

      if (isTitleValid && isEmpNameValid && isStatusValid && isAssignDateValid) {
        closeModal();
        await dispatch(addTask(taskData));
        toast.success(tasks?.messageArray, {
          autoClose: 2000,
        });
        dispatch(tasksList());
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
    // if (taskAdd?.status == true) {
    //   setTimeout(() => {
    //     setIsOpen(false);
    //     toast.success(taskAdd.data.messageArray);
    //   }, 2000);
    // } else {
    //   toast.error(taskAdd?.error);
    //   console.log(taskAdd?.error)
    // }
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Input
        label="Title"
        placeholder="Title"
        type="text"
        name="title"
        value={title}
        onChange={handleChangeTitle}
        // onChange={(e: any) => {
        //   setName(e.target.value);
        //   setNameError(null);
        // }}
        error={titleError}
      />
      <div className="mb-4">
        <SelectBox
          label="Employee Name"
          palaceHolder="Emp Name"
          option={empsList}
          selected={selectEmpName}
          setSelected={setSelectEmpName}
          name="empname"
          onChange={handleChangeEmpname}
          error={empNameError}
        />
      </div>
      <div className="mb-4">
        <SelectBox
          label="Status"
          palaceHolder="Status"
          option={statusOption}
          selected={selectStatus}
          setSelected={setSelectStatus}
          name="status"
          onChange={handleChangeStatus}
          error={statusError}
        />
      </div>
      <Input
        type="date"
        label="Assign Date"
        placeholder="Assign Date"
        name="date"
        onChange={handleChangeDate}
        error={assignDateError}
      />

      <div className="w-full mt-6">
        {loading ? (
          <div className="bg-primary  rounded-lg text-white w-full text-center pt-2 pb-1 cursor-not-allowed">
            <ClipLoader color="text-white" size={30} />
          </div>
        ) : (
          <ButtonFull onClick={AddTaskHandal} title={"Add Task"} />
        )}
      </div>
    </div>
  );
};

export default AddTaskForm;
