import {createSlice} from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';

const getUser = () => {
    const access = localStorage.getItem('token');
    if (access) {
        const decodedToken = jwtDecode(access);
      
        if (decodedToken) {
          console.log(decodedToken);
          const { user_id, full_name, email, role, role_id,profile_pic } = decodedToken;
          const userData = {
            id: user_id,
            name: full_name,
            email,
            role,
            role_id,
            profile_pic
          };
          return userData;
        }
      }
      
      return null;
    }

const authSlice=createSlice({
    name:'authUser',
    initialState:{
        user:getUser()
    },
    reducers:{
        addUser:(state,action)=>{
            const decodeUser = getUser()
            state.user=decodeUser;
        },
        deleteUser:(state)=>{
            state.user=null
        }
    }
})
export const{ addUser,deleteUser}= authSlice.actions
export default authSlice.reducer