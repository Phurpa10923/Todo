import { createSlice } from "@reduxjs/toolkit";

const error  = createSlice({
    name:'error',
    initialState:{
        visible:false,
        message:''
    },
    reducers:{
        setErrorVisibility:(state,action)=>{
            state.visible = action.payload;
        },
        setErrorMessage:(state,action)=>{
            state.message = action.payload;
        }
    }
})

export const {setErrorMessage,setErrorVisibility} = error.actions;
export default error.reducer;