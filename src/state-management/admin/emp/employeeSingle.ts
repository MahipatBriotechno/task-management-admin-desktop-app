// userReducer.ts

import { GET_USER_SUCCESS, USER_ERROR } from './types';

interface UserState {
 user: any; // Replace 'any' with the actual user type
 error: string | null;
}

const initialState: UserState = {
 user: null,
 error: null,
};

const userSingleReducer = (state = initialState, action: any) => {
 switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case USER_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
 }
};

export default userSingleReducer;
