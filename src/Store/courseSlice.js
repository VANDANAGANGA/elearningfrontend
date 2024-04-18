import {createSlice} from '@reduxjs/toolkit'

const courseSlice=createSlice({
    name:'course',
    initialState:{
        course:null
    },
    reducers:{
        addCourse:(state,action)=>{
            state.course=action.payload;
        },
        deleteCourse:(state)=>{
            state.course=null
        }
    }
})
export const{ addCourse,deleteCourse}= courseSlice.actions
export default courseSlice.reducer