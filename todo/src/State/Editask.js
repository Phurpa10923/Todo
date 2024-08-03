import { createSlice } from "@reduxjs/toolkit";


const editslice = createSlice({
    name:'edittask',
    initialState:{
        visible:false,
        taskobj:{
            title:'',
            description:'',
            duedate:'',
            status:'',
            _id:''
        }
    },
    reducers:{
        setEditTaskVisibility:(state,action)=>{
            state.visible = action.payload;
        },
        setEditObject:(state,action)=>{
            state.taskobj = action.payload;
    }
}});

export const {setEditTaskVisibility,setEditObject} = editslice.actions;
export default editslice.reducer;