// src/reducers/userReducer.js
import { UPDATE_USER_REQUEST, GET_USER_SUCCESS, UPDATE_USER_SUCCESS, USER_ERROR, UserActionTypes } from './types';

// const initialState = {
//   user: null,
//   error: '',
// };

// const updateEmpReducer =(state = initialState, action:any) => {
//   switch (action.type) {
//     case GET_USER_SUCCESS:
//       return {
//         ...state,
//         user: action.payload,
//         error: '',
//       };
//     case UPDATE_USER_SUCCESS:
//       return {
//         ...state,
//         user: action.payload,
//         error: '',
//       };
//     case USER_ERROR:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default updateEmpReducer


const initialState = {
  user: null,
  error: '',
  loading: false,
  messageArray: null, 
};

const updateEmpReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST: // Dispatched when registration process starts
    return {
      ...state,
      loading: true, // Set addLoading state to true
    };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        messageArray: action.payload,
        error: '',
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        // error: action.payload,
        loading: false,
      };
    case 'UPDATE_USER_START':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default updateEmpReducer;
