import React, { useEffect, useState } from "react";
import { Container } from "../../../components/shared/Container";
import { Card } from "../../../components/shared/card";
import MyModal from "../../../components/shared/MyModal";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../../components/shared/Input";
import { SelectBox } from "../../../components/shared/SelectBox";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AddButton,
  ButtonFull,
  DeleteButton,
  EditButton,
  EyeButton,
} from "../../../components/shared/Buttons/OutlineButton";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  SingleTask,
  tasksList,
  updateTask,
} from "../../../state-management/admin/task/action";
import { AppDispatch, RootState } from "../../../state-management/store";
import axios from "axios";
import { fetchEmps } from "../../../state-management/admin/emp/employeesActions";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import NoTask from "../../shared/NoTask";

// const EmpNameOption = [
//   { name: "Yogesh" },
//   { name: "Mayank" },
//   { name: "Soham" },
// ];
// const statusOption = [
//   { name: "Pending" },
//   { name: "Active" },
//   { name: "Success" },
// ];
const Task = () => {
  const { tasks, data, loading, error } = useSelector(
    (state: RootState) => state.task
  );
  const dispatch = useDispatch<AppDispatch>();

  let empsList = useSelector((state: any) => state.emps.emps);

  useEffect(() => {
    dispatch(fetchEmps());
  }, [dispatch]);

  const singleTask = useSelector((state: any) => state?.task?.singleTask?.task);

  console.log(singleTask);

  const [tasksList1, setTasksList1] = useState([]);
  const [selectEmpName, setSelectEmpName] = useState<any>();
  const [selectStatus, setSelectStatus] = useState<any>();
  const [selectId, setSelectId] = useState<any>();
  let [isOpenViewSingle, setIsOpenViewSingle] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [isLoader, setLoader] = useState(false);
  const [taskUpdateData, setTaskUpdateData] = useState(false);

  const user = useSelector((state: any) => state?.taskSingle?.user?.task);
  const taskAdd = useSelector((state: any) => state?.taskAdd);
  const taskUpdate = useSelector((state: any) => state?.taskUpdate);

  let [taskDeleteData, setDeleteData] = useState(false);
  const taskDelete = useSelector((state: any) => state?.taskDelete);

  const DeleteTaskHandel = (taskId: any) => {
    dispatch(deleteTask(taskId));
    toast.success(taskId?.message);
    setDeleteData(true);
  };
  useEffect(() => {
    if (taskDeleteData) {
      if (taskDelete?.message != "") {
        toast.success(taskDelete?.message, {
          autoClose: 3000,
        });
        setIsOpenDelete(false);
        setDeleteData(false);
      } else if (taskDelete?.error != "") {
        toast.error(taskDelete?.error, {
          autoClose: 3000,
        });
      } else {
        toast.error(taskDelete?.error, {
          autoClose: 3000,
        });
      }
    }
  }, [taskDeleteData, taskDelete?.message, taskDelete?.error]);

  useEffect(() => {
    if (tasks != null) {
      if (tasks && tasks?.status) {
        toast.success(tasks?.message);
        setTimeout(() => {}, 2500);
      } else {
        toast.error(tasks?.message);
      }
    }
    if (error) {
      toast.error(error);
    }
  }, [tasks, error]);

  // Delete Task
  function closeModalDelete() {
    setIsOpenDelete(false);
  }

  function openModalDelete(_id: any) {
    setSelectId(_id);
    setIsOpenDelete(true);
  }

  useEffect(() => {
    dispatch(tasksList());
  }, []);

  // console.log(data);
  useEffect(() => {
    if (selectId) {
      dispatch(SingleTask(selectId));
    }
  }, [selectId]);

  const singleData = data && data?.filter((task: any) => task._id === selectId);

  // console.log(singleData)
  const EmptyState = () => {
    setTaskid("");
    setDate("");
    setTitle("");
    setEmpname("");
    setStatus("");
    setSubmissionDate("");
  };
  const [assignDate, setAssignDate] = useState("");
  const [taskid, setTaskid] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [empname, setEmpname] = useState("");
  const [empId, setEmpId] = useState("");
  const [status, setStatus] = useState("");
  const [empName, setEmpName] = useState("");
  const [data1, setData1] = useState({
    title: "",
    date: "",
    empname: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setTitle(user.title || "");
      setEmpname(user.empName || "");
      setStatus(user.status || "");
      setSubmissionDate(user.submissionDate || "");
    }
  }, [user]);

  // Add / Edit Task
  function closeModalViewSingle() {
    setIsOpenViewSingle(false);
  }
  function openModalViewSingle(id: any) {
    setSelectId(id);
    setIsOpenViewSingle(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeEditModal() {
    setIsEditOpen(false);
    setSelectId("");
  }
  // Add Modal
  function openModal() {
    setIsOpen(true);
    EmptyState();
  }

  function openEditModal(id: any) {
    setSelectId(id);
    setIsEditOpen(true);
  }
  console.log(selectId);
  return (
    <>
      <ToastContainer position="top-right" />
      <Card>
        <Container>
          <div className="w-full flex items-center  justify-end mb-5">
            <h1 className="text-2xl font-semibold">Task</h1>{" "}
            <AddButton title={"Add Task"} onClick={openModal} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96 w-full">
              <ClipLoader color="text-primary" size={50} />
            </div>
          ) : (
            <div className=" overflow-x-auto">
              <div className="min-w-[768px] ">
                <div className="grid grid-cols-12 gap-4 p-3 ">
                  {/* <div className="col-span-1 font-medium text-base">No</div> */}
                  <div className="col-span-2 font-medium text-base">
                    <div className="flex ">
                      <div className="w-9 text-xs">No</div>
                      <h5 className="text-xs font-medium">Assign Date</h5>
                    </div>
                  </div>
                  <div className="col-span-2 font-medium text-base">
                    <h5 className="text-xs font-medium">Title</h5>
                  </div>
                  <div className="col-span-3 font-medium text-base">
                    <h5 className="text-xs font-medium">Emp Name</h5>
                  </div>
                  <div className="col-span-1 font-medium text-base">
                    <h5 className="text-xs font-medium">Status</h5>
                  </div>
                  <div className="col-span-2 font-medium text-base">
                    <h5 className="text-xs font-medium">Submission Date</h5>
                  </div>
                  <div className="col-span-1 ... font-medium text-base">
                    <h5 className="text-xs font-medium">Action</h5>
                  </div>
                </div>

                {data?.length ? (
                  data.map((db: any, index: number) => {
                    // console.log(db, "db");
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-12 gap-4 hover:shadow-md hover:bg-slate-100 p-3 mb-2 rounded-md border-[1px] border-solid "
                      >
                        {/* <div className="col-span-1 font-normal text-sm">{index +1}</div> */}
                        <div className="col-span-2 font-normal text-xs ">
                          <div className="flex ">
                            <div className="w-9">
                              <label>{index + 1}.</label>
                            </div>
                            <label className="">{db.assignDate}</label>
                          </div>
                        </div>
                        <div className="col-span-2 font-normal text-xs">
                          {db.title}
                        </div>
                        <div className="col-span-3 font-normal text-xs">
                          {db.empName}
                        </div>
                        <div className={"col-span-1 font-normal text-xs"}>
                          <div
                            className={`shadow-sm text-white rounded-lg px-2 py-[2px] w-fit text-[10px]  
                      ${
                        db.status == "Pending"
                          ? "bg-yellowpending"
                          : db.status == "Active"
                          ? "bg-activeblue"
                          : db.status == "Completed"
                          ? "bg-greensuccess"
                          : ""
                      }`}
                          >
                            {db.status}
                          </div>
                        </div>
                        <div className="col-span-2 font-normal text-xs text-center lg:text-left">
                          {db.submissionDate}
                        </div>
                        <div className="col-span-1 ... font-normal text-xs flex items-center gap-4">
                          <EyeButton
                            onClick={() => openModalViewSingle(db._id)}
                            className="w-4 h-4"
                            title={""}
                          />
                          <EditButton
                            onClick={() => openEditModal(db._id)}
                            title={""}
                          />
                          <DeleteButton
                            onClick={() => openModalDelete(db._id)}
                            title={""}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <NoTask />
                )}
              </div>
            </div>
          )}
        </Container>
      </Card>

      {/* Task Add / Edit  Modal 
      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        className={`w-[450px] max-w-full py-5 px-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            {selectId ? "Edit Task" : "Add Task"}{" "}
          </h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>

        <Input
          label="Title"
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          // onChange={handleChangeTitle}
          onChange={(e: any) => {
            setName(e.target.value);
            setNameError(null);
          }}
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
          />
        </div>
        <Input
          type="date"
          label="Assign Date"
          placeholder="Assign Date"
          name="date"
          onChange={handleChangeDate}
        />
        <div className="w-full mt-6">
          {selectId ? (
            <>
              {taskUpdate?.loading ? (
                <div className="bg-primary  rounded-lg text-white w-full text-center pt-2 pb-1 cursor-not-allowed">
                  <ClipLoader color="text-white" size={30} />
                </div>
              ) : (
                <ButtonFull
                  onClick={EditTaskHandal}
                  title={"Update Task"}
                />
              )}
            </>
          ) : (
            <>
              {taskAdd?.loading ? (
                <div className="bg-primary  rounded-lg text-white w-full text-center pt-2 pb-1 cursor-not-allowed">
                  <ClipLoader color="text-white" size={30} />
                </div>
              ) : (
                <ButtonFull onClick={AddTaskHandal} title={"Add Task"} />
              )}
            </>
          )}
        </div>
      </MyModal> */}

      {/* Add Task  */}
      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        className={`w-[450px] max-w-full py-5 px-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Add Task</h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <AddTaskForm
          setIsOpen={setIsOpen}
          user={user}
          title={title}
          setTitle={setTitle}
          empName={empname}
          setEmpName={setEmpname}
          status={status}
          setStatus={setStatus}
          submissionDate={submissionDate}
          setSubmissionDate={setSubmissionDate}
        />
      </MyModal>

      {/* Edit Task  */}
      <MyModal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        className={`w-[450px] max-w-full py-5 px-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Edit Task</h1>
          <CloseIcon onClick={closeEditModal} className="cursor-pointer" />
        </div>
        <EditTaskForm
          setIsEditOpen={setIsEditOpen}
          user={singleTask}
          selectId={selectId}
          setSelectId={setSelectId}
          title={title}
          setTitle={setTitle}
          empName={empname}
          setEmpName={setEmpName}
          status={status}
          setStatus={setStatus}
          assignDate={assignDate}
          setAssignDate={setAssignDate}
        />
      </MyModal>

      {/* Delete Task Modal  */}
      <MyModal
        isOpen={isOpenDelete}
        closeModal={closeModalDelete}
        className={`max-w-full py-5 px-5`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Delete</h1>
          <CloseIcon onClick={closeModalDelete} className="cursor-pointer" />
        </div>
        <div>Are you sure you want to permanently remove this Task ?</div>
        <div className="mt-5 w-full flex justify-end">
          <Button autoFocus onClick={closeModalDelete}>
            Cancel
          </Button>
          <Button
            onClick={() => DeleteTaskHandel(selectId)}
            title={""}
            disabled={loading}
          >
            Confirm
          </Button>
        </div>
      </MyModal>

      {/* View All detail of single Task - Modal  */}
      <MyModal
        isOpen={isOpenViewSingle}
        closeModal={closeModalViewSingle}
        className={`w-[450px] max-w-full py-5 px-5`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">View Detail</h1>
          <CloseIcon
            onClick={closeModalViewSingle}
            className="cursor-pointer"
          />
        </div>

        <div>
          {singleData?.map((db: any, index: any) => (
            <div
              key={index}
              className="flex flex-col gap-2 hover:shadow-md hover:bg-slate-100 p-3 mb-2 rounded-md border-[1px] border-solid border-lightGray"
            >
              <div className="grid grid-cols-2 font-normal text-sm">
                {/* <div className="font-light">Id:</div>
                <div className="font-medium">{db._id}</div> */}
              </div>
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Assign Date:</div>
                <div className="font-medium">{db.assignDate}</div>
              </div>
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Title:</div>
                <div className="font-medium">{db.title}</div>
              </div>
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Emp Name:</div>
                <div className="font-medium">{db.empName}</div>
              </div>
              <div className={"grid grid-cols-2 font-normal text-sm"}>
                <div className="font-light">Status:</div>
                <div
                  className={`shadow-sm text-white rounded-lg px-2 py-[2px] w-fit text-xs  
                  ${
                    db.status == "Pending"
                      ? "bg-yellowpending"
                      : db.status == "Active"
                      ? "bg-activeblue"
                      : db.status == "Completed"
                      ? "bg-greensuccess"
                      : ""
                  }`}
                >
                  {db.status}
                </div>
              </div>
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Submission Date:</div>
                <div className="font-medium">{db.submissionDate}</div>
              </div>
            </div>
          ))}
        </div>
      </MyModal>
    </>
  );
};

export default Task;
