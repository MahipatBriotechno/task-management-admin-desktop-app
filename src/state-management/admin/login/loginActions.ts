

import { ThunkAction } from "redux-thunk";
import { AppDispatch, RootState } from "../../store";
import axios from "axios";


// Define action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";



// Define action creators
export const loginAdminRequest = () => ({ type: LOGIN_REQUEST });
export const loginAdminSuccess = (data: any) => ({
  type: LOGIN_ADMIN_SUCCESS,
  payload: data,
});

// export const logoutAdmin = () => ({ type: LOGOUT });
export const loginAdminFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Define async action creator
export const loginAdmin = () => ({
  type: LOGIN_ADMIN,
 });
 
 export const logoutAdmin = () => ({
  type: LOGOUT_ADMIN,
 });

export const loginAdminAction = (email: string, password: string,) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginAdminRequest());
    try {
      let data = JSON.stringify({
        email: email,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/adminLogin`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          dispatch(loginAdminSuccess(response.data));
         
        
          

        })
        .catch((error) => {
          dispatch(loginAdminFailure(error.message));
        });
    } catch (error: any) {
      dispatch(loginAdminFailure(error.message));
    }
  };
};




// import axios from 'axios';
// import { Dispatch } from 'redux';
// import { LOGIN_ADMIN_REQUEST, LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILURE } from './types';

// const loginAdminRequest = () => ({ type: LOGIN_ADMIN_REQUEST });
// const loginAdminSuccess = (data: any) => ({ type: LOGIN_ADMIN_SUCCESS, payload: data });
// const loginAdminFailure = (error: any) => ({ type: LOGIN_ADMIN_FAILURE, payload: error });

// export const loginAdminAction = (email: string, password: string) => {
//   return async (dispatch: Dispatch) => {
//     dispatch(loginAdminRequest()); 

//     try {

//       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/adminLogin`, { email, password });

//       dispatch(loginAdminSuccess(response.data));
//     } catch (error:any) {
//       dispatch(loginAdminFailure(error.message));
//     }
//   };
// };
