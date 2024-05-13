import React, { useEffect, useState } from "react";
import { Container } from "../../shared/Container";
import { Card } from "../../shared/card";
import MyModal from "../../shared/MyModal";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../../shared/Input";
import { SelectBox } from "../../shared/SelectBox";
import AddIcon from "@mui/icons-material/Add";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import {
  AddButton,
  ButtonFull,
  DeleteButton,
  EditButton,
  EyeButton,
} from "../../shared/Buttons/OutlineButton";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmp,
  fetchEmps,
  getSingleUser,
  registerUser,
  updateUser,
} from "../../../state-management/admin/emp/employeesActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddEditForm from "./AddEmpForm";
import AddEmpForm from "./AddEmpForm";
import EditEmpForm from "./EditEmpForm";
import Loader from "../../shared/Loader";
import NoTask from "../../shared/NoTask";

// const HeaderAdmin = React.lazy(
//   () => import("../../../components/admin/HeaderAdmin")
// );

const EmpNameOption = [
  { name: "Yogesh" },
  { name: "Mayank" },
  { name: "Soham" },
];
const statusOption = [
  { name: "Pending" },
  { name: "Active" },
  { name: "Success" },
];
const Employee = () => {
  const [selectEmpName, setSelectEmpName] = useState<any>();
  const [selectStatus, setSelectStatus] = useState<any>();
  const [selectId, setSelectId] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [isLoader, setLoader] = useState(false);
  let [isOpenViewSingle, setIsOpenViewSingle] = useState(false);
  const [showPassword, setShowPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  let [empDeleteData, setDeleteData] = useState(false);

  const EmptyState = () => {
    setName("");
    setEmail("");
    setPassword("");
    console.log(".................11");
  };

  // Get All Employee
  const dispatch: any = useDispatch();
  const empsList = useSelector((state: any) => state.emps);
  // console.log("empsList", empsList);
  useEffect(() => {
    dispatch(fetchEmps());
  }, [dispatch]);

  // Get All Employee End

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

  // Delete Emplooye
  function closeModalDelete() {
    setIsOpenDelete(false);
  }

  function openModalDelete(id: any) {
    setSelectId(id);
    setIsOpenDelete(true);
  }

  const singleData = empsList?.emps.filter(
    (task: any) => task._id === selectId
  );
  // console.log("singleData", singleData);
  // ----------------
  const togglePasswordVisibility = (e: any) => {
    // setShowPassword(!showPassword);
    setShowPassword(e);
  };

  
  // Update
  const user = useSelector((state: any) => state?.empSingle?.user?.emp);
  const empsDelete = useSelector((state: any) => state?.empsDelete);
  console.log("empsDelete", empsDelete);

  const handleDelete = (empId: any) => {
    dispatch(deleteEmp(empId));
    // toast.success("Delete Emplooye Successfully");
    setDeleteData(true);
  };
  useEffect(() => {
    if (empDeleteData) {
      if (empsDelete?.message != "") {
        toast.success(empsDelete?.message, {
          autoClose: 3000,
        });
        setIsOpenDelete(false);
        setDeleteData(false);
      } else if (empsDelete?.error != "") {
        toast.error(empsDelete?.error, {
          autoClose: 3000,
        });
      } else {
        toast.error(empsDelete?.error, {
          autoClose: 3000,
        });
      }
    }
  }, [empDeleteData, empsDelete?.message, empsDelete?.error]);

  useEffect(() => {
    if (selectId) {
      dispatch(getSingleUser(selectId));
    }
  }, [selectId]);
 

  
  return (
    <>
      <ToastContainer position="top-right" />

      <Card>
        <Container>
          <div className="w-full flex items-center justify-end mb-5">
            <h1 className="text-2xl font-semibold">Emplooye</h1>{" "}
            <AddButton title={"Add Employee"} onClick={openModal} />
          </div>

          {empsList && empsList.loading ? (
           <Loader />
          ) : (
            <div className=" overflow-x-auto">
              <div className="11min-w-[700px] ">
                <div className="grid grid-cols-12 gap-4 p-3 min-w-[768px]">
                  <div className="col-span-1 font-medium text-xs">No</div>
                  <div className=" col-span-3 font-medium text-xs">
                    Emp Name
                  </div>
                  <div className=" col-span-3 font-medium text-xs">Email</div>
                  <div className=" col-span-3 font-medium text-xs">
                    Password
                  </div>
                  <div className="col-span-2 ... font-medium text-xs">
                    Action
                  </div>
                </div>

                {empsList?.emps?.length ?  empsList?.emps.map((db: any, index: any) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 hover:shadow-md hover:bg-slate-100 p-3 mb-2 rounded-md border-[1px] border-solid min-w-[768px]"
                  >
                    <div className="col-span-1 font-normal text-xs">
                      {index + 1}.
                    </div>
                    <div className=" col-span-3 font-normal text-xs">
                      {db.name}
                    </div>
                    <div className=" col-span-3 font-normal text-xs">
                      {db.email}
                    </div>
                    <div className=" col-span-3 font-normal text-xs">
                      <input
                        className="bg-transparent w-1/2"
                        type={showPassword == db._id ? "text" : "password"}
                        value={db.password}
                        disabled
                      />
                      {showPassword == db._id ? (
                        <button onClick={() => togglePasswordVisibility("")}>
                          <VisibilityIcon className="w-5 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => togglePasswordVisibility(db._id)}
                        >
                          <VisibilityOffIcon />
                        </button>
                      )}
                    </div>
                    <div className="col-span-2 ... font-normal text-xs flex items-center gap-4">
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
                ))
              :
              <NoTask />
              }
              </div>
            </div>
          )}
        </Container>
      </Card>

      {/* Add Employee  */}
      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        className={`w-[450px] max-w-full py-5 px-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Add Employee</h1>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>
        <AddEmpForm
          setIsOpen={setIsOpen}
          user={user}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </MyModal>

      {/* Edit Employee  */}
      <MyModal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        className={`w-[450px] max-w-full py-5 px-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Edit Employee</h1>
          <CloseIcon onClick={closeEditModal} className="cursor-pointer" />
        </div>
        <EditEmpForm
          setIsEditOpen={setIsEditOpen}
          user={user}
          selectId={selectId}
          setSelectId={setSelectId}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
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
        <div>Are you sure you want to permanently remove this Employee ?</div>
        <div className="mt-5 w-full flex justify-end">
          <Button autoFocus onClick={closeModalDelete}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectId)} disabled={isLoader}>
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
          {singleData.map((db: any, index: any) => (
            <div
              key={index}
              className="flex flex-col gap-2 hover:shadow-md hover:bg-slate-100 p-3 mb-2 rounded-md border-[1px] border-solid border-lightGray"
            >
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Emp Name</div>
                <div className="font-medium">{db.name}</div>
              </div>
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Email</div>
                <div className="font-medium">{db.email}</div>
              </div>
              <div className="grid grid-cols-2 font-normal text-sm">
                <div className="font-light">Password</div>
                <div className="font-medium">
                  <input
                    className="bg-transparent"
                    type={showPassword == db._id ? "text" : "password"}
                    value={db.password}
                    disabled
                  />
                  {showPassword == db._id ? (
                    <button onClick={() => togglePasswordVisibility("")}>
                      <VisibilityIcon className="w-5 h-3" />
                    </button>
                  ) : (
                    <button onClick={() => togglePasswordVisibility(db._id)}>
                      <VisibilityOffIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </MyModal>
    </>
  );
};

export default Employee;
