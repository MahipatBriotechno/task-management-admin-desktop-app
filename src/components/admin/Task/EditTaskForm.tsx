import React, { useEffect, useState } from "react";
import Input from "../../shared/Input";
import { ClipLoader } from "react-spinners";
import { ButtonFull } from "../../shared/Buttons/OutlineButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SelectBox } from "../../shared/SelectBox";
import { updateTask } from "../../../state-management/admin/task/action";
const statusOption = [
  { name: "Pending" },
  { name: "Active" },
  { name: "Completed" },
];
const EditTaskForm = ({
  setIsOpen,
  setIsEditOpen,
  user,
  selectId,
  setSelectId,
}: any) => {
  const dispatch: any = useDispatch();

  const [isLoader, setLoader] = useState(false);

  const [empnameError, setEmpnameError] = useState<string | null>(null);

  const [submissionDateError, setSubmissionDateError] = useState<string | null>(
    null
  );
  const [taskUpdateData, setTaskUpdateData] = useState(false);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const taskUpdate = useSelector((state: any) => state?.taskUpdate);

  let empsList = useSelector((state: any) => state.emps.emps);

  const [selectEmpName, setSelectEmpName] = useState<any>("");
  const [selectStatus, setSelectStatus] = useState<any>("");
  const [title, setTitle] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [empName, setEmpName] = useState<any>("");

  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState<any>("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [taskId, setTaskId] = useState("");
  const [startTime, setStartTime] = useState("0:0:0");
  const [endTime, setEndTime] = useState("");
  const [totalTimeDuration, setTotalTimeDuration] = useState("");
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
    if (user) {
      setTaskId(user?._id || "");
      setTitle(user?.title || "");
      setEmpName(user?.empName || "");
      setEmpId(user?.empId || "");
      setStatus(user?.status || "");
      setAssignDate(user?.assignDate || "");
      setSubmissionDate(user?.submissionDate || "");
      setStartTime(user?.startTime || "");
      setEndTime(user?.endTime || "");
      // setTotalTimeDuration(user?.totalTimeDuration || "");
    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     setTitle(user.title || "");
  //     setEmpName(user.empName || "");
  //     setStatus(user.status || "");
  //     setAssignDate(user.assignDate || "");
  //     // setSelectEmpName(user.empName || "");
  //     // setSelectStatus(user.status || "");
  //   }
  // }, [user]);

  const EditTaskHandal = async () => {
    const isTitleValid = validateTitle(title);
    const isEmpNameValid = validateEmpName(empName);
    const isStatusValid = validateStatus(status);
    const isAssignDateValid = validateAssignDate(assignDate);

    if (isTitleValid && isEmpNameValid && isStatusValid && isAssignDateValid) {
      dispatch(
        updateTask(
          taskId,
          title,
          empId,
          empName,
          status,
          assignDate,
          submissionDate,
          startTime,
          endTime,
          totalTimeDuration
        )
      );

      setLoader(taskUpdate?.loading);
      setIsEditOpen(false);

      if (taskUpdate?.status === true) {
        setIsEditOpen(false);
        toast.success(taskUpdate?.message);
      } else {
        toast.error(taskUpdate?.error);
        console.log(taskUpdate?.error);
      }
    }
  };

  return (
    <div>
      <Input
        label="Title"
        placeholder="Title"
        type="text"
        name="title"
        value={title}
        // onChange={handleChangeTitle}
        onChange={(e: any) => {
          setTitle(e.target.value);
          setTitleError(null);
          if (title.length >= 2) {
            setTitleError(null);
          }
        }}
        error={titleError}
      />
      <div className="mb-4">
        <SelectBox
          label="Employee Name"
          palaceHolder={empName}
          option={empsList}
          selected={selectEmpName}
          setSelected={setSelectEmpName}
          name="empName"
          // onChange={handleChangeEmpname}
          onChange={(selectedOption: any) => {
            setSelectEmpName(selectedOption.empName);
            setEmpName(selectedOption.name); // Update the actual value if needed
            setEmpNameError(null);
          }}
          // onChange={(e: any) => {
          //   console.log("update" ,e)
          //   // setEmpName(e.empName);
          //   setSelectEmpName(selectEmpName);
          //   setEmpName(selectEmpName);
          // }}
          error={empNameError}
        />
      </div>
      <div className="mb-4">
        <SelectBox
          label="Status"
          palaceHolder={status}
          option={statusOption}
          selected={selectStatus}
          setSelected={setSelectStatus}
          name="status"
          // onChange={handleChangeStatus}
          // onChange={(e: any) => {
          //   console.log("status" ,e.status)
          //   // setStatus(e.status);
          onChange={(selectedOption: any) => {
            setSelectStatus(selectedOption.status);
            setStatus(selectedOption.name);
            setStatusError(null);
          }}
          error={statusError}
        />
      </div>
      <Input
        type="date"
        label="Assign Date"
        placeholder="Assign Date"
        name="assignDate"
        value={assignDate}
        // onChange={handleChangeDate}
        onChange={(e: any) => {
          setAssignDate(e.target.value);
          setAssignDateError(null);
        }}
        error={assignDateError}
      />
      <div className="w-full mt-6">
        {taskUpdate?.loading ? (
          <div className="bg-primary  rounded-lg text-white w-full text-center pt-2 pb-1 cursor-not-allowed">
            <ClipLoader color="text-white" size={30} />
          </div>
        ) : (
          <ButtonFull onClick={EditTaskHandal} title={"Update Task"} />
        )}
      </div>
    </div>
  );
};

export default EditTaskForm;
