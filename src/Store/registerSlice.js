import {createSlice} from '@reduxjs/toolkit'

const registerSlice=createSlice({
    name:'registerUser',
    initialState:{
        user:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload;
        },
        deleteUser:(state)=>{
            state.user=null
        }
    }
})
export const{ addUser,deleteUser}= registerSlice.actions
export default registerSlice.reducer