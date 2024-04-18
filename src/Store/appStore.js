import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import registerReducer from "./registerSlice";
import courseReducer from "./courseSlice"

const appStore= configureStore({
    reducer:{
      authUser:authReducer,
      registerUser:registerReducer,
      course:courseReducer,
    }
})

export default appStore