
import { toast } from 'react-toastify';
import {
    CREATE_TASK_TIMER_REQUEST,
    CREATE_TASK_TIMER_SUCCESS,
    CREATE_TASK_TIMER_FAILURE,
    UPDATE_TASK_TIMER_REQUEST,
    UPDATE_TASK_TIMER_SUCCESS,
    TASK_TIMER_ERROR
} from './actionTypes';

export const createTaskTimer = (taskId:string, startTime:string, endTime:string, totalDurationTime:string, date:string, status:string) => {
    return async (dispatch: (arg0: { type: any; payload?: any; }) => void) => {
        try {
            dispatch({ type: CREATE_TASK_TIMER_REQUEST });
            
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addTaskTimer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({taskId, startTime, endTime, totalDurationTime, date, status})
            });

            const data = await response.json();

            if (response.ok) {
                dispatch({ type: CREATE_TASK_TIMER_SUCCESS, payload: data.taskTimer });
            } else {
                dispatch({ type: CREATE_TASK_TIMER_FAILURE, payload: data.message });
            }
        } catch (error) {
            console.error('Failed to create task timer:', error);
            dispatch({ type: CREATE_TASK_TIMER_FAILURE, payload: 'Internal server error' });
        }
    };
};


// Update Timer 
export const updateTaskTimer = (
    timerId: string,
    taskId: string,
    startTime: string,
    endTime: string,
    totalDurationTime: string,
    date: string,
    status: string,
  ) => {
    return async (dispatch: any) => {
      try {
        dispatch({ type: UPDATE_TASK_TIMER_REQUEST });
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/updateTaskTimer`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ timerId, taskId, startTime, endTime, totalDurationTime, date, status }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: UPDATE_TASK_TIMER_SUCCESS, payload: data });
        //   dispatch(fetchEmps());
          toast.success(data.message)
        } else {
          dispatch({ type: TASK_TIMER_ERROR, payload: data.message });
          toast.error(data.message)
        }
      } catch (error) {
        console.error("Error registering user:", error);
        dispatch({ type: TASK_TIMER_ERROR, payload: "Something went wrong" });
      }
    };
  };
