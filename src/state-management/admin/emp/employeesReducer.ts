// Add Employee
// --------------------------------
import { UserActionTypes, UserAction, UserState } from "./types";

const initialStateAdd: UserState = {
  message: "",
  status: false,
  addLoading: false, // Initialize loading state to false
};

export const AddUserReducer = (
  state = initialStateAdd,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.REGISTRATION_REQUEST: // Dispatched when registration process starts
      return {
        ...state,
        addLoading: true, // Set addLoading state to true
      };
    case UserActionTypes.REGISTRATION_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        addLoading: false, // Set addLoading state to false after successful registration
      };
    case UserActionTypes.REGISTRATION_FAILURE:
      return {
        ...state,
        message: action.payload,
        status: false,
        addLoading: false, // Set addLoading state to false after registration failure
      };
    default:
      return state;
  }
};

// List Employee
// --------------------------------
const initialState = {
  emps: [],
  loading: false,
  error: null,
};

export const employeesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_EMPS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_EMPS_SUCCESS":
      return { ...state, loading: false, emps: action.payload, error: null };
    case "FETCH_EMPS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//  Delete Employee
// --------------------------------
// export const empDeleteReducer = (state = { emps: [] }, action: any) => {
//   console.log("empsDelete state",state)
//   switch (action.type) {
//     case "DELETE_EMP_SUCCESS":
//       return {
//         ...state,
//         emps: state.emps.filter((emp: any) => emp._id !== action.payload),
//       };
//     // Handle other actions
//     default:
//       return state;
//   }
// };

// const initialStateDelete: UserState = {
//   message: "",
//   status: false,
//   addLoading: false, // Initialize loading state to false
// };

// export const empDeleteReducer = (
//   state = { emps: [], message: "" },
//   action: any
// ) => {
//   console.log("empDeleteReducer action", action);
//   switch (action.type) {
//     case "DELETE_EMP_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         emps: state.emps.filter((emp: any) => emp._id !== action.payload),
//         message: action.payload.message,
//         error: null,
//       };
//     case "DELETE_EMP_FAILURE":
//       return { ...state, loading: false, error: action.payload,  message: action.payload.message, };
      
//     default:
//       return state;
//   }
// };


const initialStateDelete = {
  emps: [],
  loading: false,
  message: '',
  error: null
};

export const empDeleteReducer = (state = initialStateDelete, action:any) => {
  switch (action.type) {
    case 'DELETE_EMP_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DELETE_EMP_SUCCESS':
      return {
        ...state,
        loading: false,
        emps: state.emps.filter((emp:any) => emp._id !== action.payload.empId),
        message: action.payload.message,
        error: null
      };
    case 'DELETE_EMP_FAILURE':
      return { ...state, loading: false, error: action.payload, message: '' };
    default:
      return state;
  }
};
