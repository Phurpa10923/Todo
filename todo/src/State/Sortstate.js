import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
    name:'sort',
    initialState:{
        value:'',
        showSortPopup:false,
        searchfield:''
    },
    reducers:{
        setSortValue:(state,action)=>{
            state.value = action.payload;
        },
        setShowSortPopup:(state,action)=>{
            state.showSortPopup = action.payload;
        },
        setSearchField:(state,action)=>{
            state.searchfield = action.payload;
        }
    }
})

export const {setSortValue,setShowSortPopup,setSearchField} = sortSlice.actions;
export default sortSlice.reducer;