// In store/index.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from '../user/login/reducer';
import { ThunkDispatch, thunk ,ThunkAction} from 'redux-thunk'; // Corrected import statement
import { adminLoginReducer, authAdminReducer } from '../admin/login/loginReducer';
import { signupReducer } from '../signup/reducer';
import taskReducer from '../admin/task/reducer';
import { AddUserReducer, empDeleteReducer, employeesReducer } from '../admin/emp/employeesReducer';
import userSingleReducer from '../admin/emp/employeeSingle';
import updateEmpReducer from '../admin/emp/employeeReducerUpdate';
import userTasksReducer from '../user/userTask/reducer';


// Combine reducers
const rootReducer = combineReducers({
 login: loginReducer,
 adminLogin: adminLoginReducer,
 authAdmin: authAdminReducer,
 signup: signupReducer,
 task:taskReducer,
//  Employee
 emps: employeesReducer,
 empAdd: AddUserReducer,
 empsDelete: empDeleteReducer,
 empSingle:userSingleReducer,
 empUpdate:updateEmpReducer,
//  User 
userTasks:userTasksReducer
});

// Configure store with thunk middleware
const store = configureStore({
 reducer: rootReducer,
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Updated middleware configuration
});

export default store;

// Exporting RootState type
export type RootState = ReturnType<typeof store.getState>;

// exporting Dispatch return
export type AppDispatch = typeof store.dispatch;

