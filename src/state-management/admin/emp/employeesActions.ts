import { Dispatch } from "redux";
import { UserActionTypes, UserAction, UPDATE_USER_REQUEST } from "./types";
import { GET_USER_SUCCESS, UPDATE_USER_SUCCESS, USER_ERROR } from "./types";
import axios from "axios";
import { toast } from "react-toastify";

// =======================================
// =======================================
export const fetchEmpsRequest = () => ({
  type: "FETCH_EMPS_REQUEST",
});

export const fetchEmpsSuccess = (emps: any) => ({
  type: "FETCH_EMPS_SUCCESS",
  payload: emps,
});

export const fetchEmpsFailure = (error: any) => ({
  type: "FETCH_EMPS_FAILURE",
  payload: error,
});

export const fetchEmps = () => async (dispatch: any) => {
  dispatch(fetchEmpsRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/emps`);
    const data = await response.json();
    dispatch(fetchEmpsSuccess(data.emps));
  } catch (error: any) {
    dispatch(fetchEmpsFailure(error.message));
  }
};

// Delete
// --------------------------------------
// export const deleteEmp = (empId: any) => {
//   return async (dispatch: any) => {
//     console.log("payload", dispatch);
//     dispatch({ type: "DELETE_EMP_REQUEST", payload: empId });
//     try {
//       await fetch(
//         `${process.env.REACT_APP_BASE_URL}/deleteEmp?empid=${empId}`,
//         { method: "DELETE" }
//       );
//       dispatch({ type: "DELETE_EMP_SUCCESS", payload: empId });
//       dispatch(fetchEmps());
//     } catch (error) {
//       console.error("Error deleting Emp:", error);
//       // Dispatch an error action if needed
//     }
//   };
// };

// export const deleteEmp = (empId: any) => {
//   return async (dispatch: any) => {
//     console.log("payload", dispatch);
//     dispatch({ type: UserActionTypes.REGISTRATION_REQUEST, payload: empId });
//     try {
//       await fetch(
//         `${process.env.REACT_APP_BASE_URL}/deleteEmp?empid=${empId}`,
//         { method: "DELETE" }
//       );
//       dispatch({ type: "DELETE_EMP_SUCCESS", payload: empId });
//       dispatch(fetchEmps());
//     } catch (error) {
//       console.error("Error deleting Emp:", error);
//       // Dispatch an error action if needed
//     }
//   };
// };

export const deleteEmp = (empId:any) => async (dispatch:any) => {
  dispatch({ type: 'DELETE_EMP_REQUEST' }); // to set loading state true
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/deleteEmp?empid=${empId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_EMP_SUCCESS', payload: data });
      dispatch(fetchEmps()); // re-fetching list of employees
    } else {
      throw new Error(data.message || 'Failed to delete the employee');
    }
  } catch (error:any) {
    dispatch({
      type: 'DELETE_EMP_FAILURE',
      payload: error.message || 'Unexpected error occurred'
    });
  }
};



//  Add Employee
// --------------------------------------
export const registerUser = (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: UserActionTypes.REGISTRATION_REQUEST });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: UserActionTypes.REGISTRATION_SUCCESS, payload: data });
        dispatch(fetchEmps());
        toast.success(data.message)
      } else {
        dispatch({
          type: UserActionTypes.REGISTRATION_FAILURE,
          payload: data.message,
        });
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error registering user:", error);
      dispatch({
        type: UserActionTypes.REGISTRATION_FAILURE,
        payload: "Something went wrong",
      });
    }
  };
};

//  Update Employee
// -------------------------------

// Fetch user details
export const getSingleUser = (userId: any) => async (dispatch: any) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/singleEmp/?empid=${userId}`
    );
    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.data.message,
    });
  }
};

// Update user details

export const updateUser = (
  empid: string,
  name: string,
  email: string,
  password: string,
  role: string
) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateEmp`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empid, name, email, password, role }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
        dispatch(fetchEmps());
        toast.success(data.message)
      } else {
        dispatch({ type: USER_ERROR, payload: data.message });
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error registering user:", error);
      dispatch({ type: USER_ERROR, payload: "Something went wrong" });
    }
  };
};
