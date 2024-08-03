import { configureStore } from "@reduxjs/toolkit";
import sortReducer from './State/Sortstate';
import activeTab from "./State/Avtivesidebartab";
import loading from './State/Loading'
import edit from './State/Editask'
import error from "./State/Error"
export default configureStore({
    reducer:{
        sort:sortReducer,
        activetab:activeTab,
        loading:loading,
        edittask:edit,
        error:error
    }
})