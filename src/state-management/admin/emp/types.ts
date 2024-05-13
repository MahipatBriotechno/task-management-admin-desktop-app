// Update 
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';


export enum UserActionTypes {
    REGISTRATION_REQUEST = 'REGISTRATION_REQUEST',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',
  }
  
  export interface UserState {
    message: string;
    status: boolean;
    addLoading: boolean;
  }
  
  export interface RegistrationRequestAction {
    type: UserActionTypes.REGISTRATION_REQUEST;
    payload: {
      message: string;
      status: boolean;
      addLoading: boolean;
    };
  }
  export interface RegistrationSuccessAction {
    type: UserActionTypes.REGISTRATION_SUCCESS;
    payload: {
      message: string;
      status: boolean;
      addLoading: boolean;
    };
  }
  
  export interface RegistrationFailureAction {
    type: UserActionTypes.REGISTRATION_FAILURE;
    payload: string;
  }
  
  export type UserAction = RegistrationRequestAction | RegistrationSuccessAction | RegistrationFailureAction;
  
 
  