// In login/reducer.ts

import { LOGIN_REQUEST, LOGIN_ADMIN_SUCCESS, LOGIN_FAILURE, LOGIN_ADMIN, LOGOUT_ADMIN } from './loginActions';


interface LoginState {
  loading: boolean;
  error: string;
  data: any;
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  loading: false,
  error: '',
  data: null,
  isAuthenticated: false,

};


export const adminLoginReducer = (state = initialState, action: any): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOGIN_ADMIN_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: '' };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authAdminReducer = (state = initialState, action: any) => {
  switch (action.type) {
     case 'LOGIN_ADMIN_SUCCESS':
       return { ...state, isAuthenticated: true };
     case 'LOGOUT':
       return { ...state, isAuthenticated: false };
     default:
       return state;
  }
 };


// import { LOGIN_ADMIN_REQUEST, LOGIN_ADMIN_SUCCESS, LOGIN_ADMIN_FAILURE } from './types';

// const initialState = {
//  loading: false,
//  admin: null,
//  error: null,
// };

// const adminLoginReducer = (state = initialState, action: any) => {
//  switch (action.type) {
//     case LOGIN_ADMIN_REQUEST:
//       return { ...state, loading: true };
//     case LOGIN_ADMIN_SUCCESS:
//       return { ...state, loading: false, admin: action.payload.userData, error: null };
//     case LOGIN_ADMIN_FAILURE:
//       return { ...state, loading: false, admin: null, error: action.payload };
//     default:
//       return state;
//  }
// };

// export default adminLoginReducer;
