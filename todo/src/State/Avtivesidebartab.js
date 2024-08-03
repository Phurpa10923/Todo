import { createSlice } from "@reduxjs/toolkit"


export const activesidebartab = createSlice({
    name:'activetab',
    initialState:{
        value:'today',
    },
    reducers:{
        setActiveTab :(state,action)=>{
            state.value =action.payload
        }
    }
})

export const {setActiveTab} = activesidebartab.actions;
export default activesidebartab.reducer;