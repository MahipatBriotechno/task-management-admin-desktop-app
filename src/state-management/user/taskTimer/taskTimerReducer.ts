
import {
    CREATE_TASK_TIMER_REQUEST,
    CREATE_TASK_TIMER_SUCCESS,
    CREATE_TASK_TIMER_FAILURE,
    UPDATE_TASK_TIMER_REQUEST,
    GET_TASK_TIMER_SUCCESS,
    UPDATE_TASK_TIMER_SUCCESS,
    TASK_TIMER_ERROR
} from './actionTypes';

const initialState = {
    loading: false,
    error: null,
    createdTaskTimer: null
};

export const taskTimerReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case CREATE_TASK_TIMER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                createdTaskTimer: null
            };
        case CREATE_TASK_TIMER_SUCCESS:
            return {
                ...state,
                loading: false,
                createdTaskTimer: action.payload
            };
        case CREATE_TASK_TIMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};



const initialStateUpdate = {
    user: null,
    error: '',
    loading: false,
    messageArray: null, 
  };
  
  export const updateTaskTimerReducer = (state = initialStateUpdate, action:any) => {
    switch (action.type) {
      case UPDATE_TASK_TIMER_REQUEST: 
      return {
        ...state,
        loading: true, 
      };
      case GET_TASK_TIMER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: '',
          loading: false,
        };
      case UPDATE_TASK_TIMER_SUCCESS:
        return {
          ...state,
          messageArray: action.payload,
          error: '',
          loading: false,
        };
      case TASK_TIMER_ERROR:
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


  