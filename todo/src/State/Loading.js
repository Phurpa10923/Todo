import { createSlice } from "@reduxjs/toolkit";


export const loadinSlice = createSlice({
    name:'loading',
    initialState:{
        visible:false,
        loadingmessage:'Loading...'
    },
    reducers:{
        setVisibility:(state,action)=>{
            state.visible=action.payload;
        },
        setLoadingMessage:(state,action)=>{
            state.visible=action.payload;
        }
    }
})

export const {setLoadingMessage,setVisibility} = loadinSlice.actions;

export default loadinSlice.reducer;