import { useEffect, useRef, useState } from "react";
import style from "./Todocontainer.module.css";
import { FaSearch} from "react-icons/fa";
import Tasks from "../Task/Tasks.js";
import { GiSettingsKnobs } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchField, setShowSortPopup, setSortValue } from "../../State/Sortstate.js";
export default function Todocontainer({addNewItemRef,showAddTask,setAddTaskVisibility }) {
  const [showSortSetting,setSortSetting] = useState(false);
  const searchRef = useRef();
  const sortState = useSelector((state)=>state.sort);
  const dispatch = useDispatch();
  const toggleSortSetting = ()=>{
    setSortSetting(!showSortSetting);
    dispatch(setShowSortPopup(!showSortSetting));
  }
  const hideSort = ()=>{
    setSortSetting(false);
    dispatch(setShowSortPopup(false));
  }
  const setSortState = (event)=>{
    dispatch(setSortValue(event.target.getAttribute('value')));
  }
  const setSortField = (event)=>{
    dispatch(setSearchField(event.target.value));
  }
  useEffect(()=>{
    setSortSetting(sortState.showSortPopup)
  },[sortState.showSortPopup])
  return (
    <div
      className={`col-12 col-md-10 col-lg-8 d-flex flex-column align-items-center ${style.mainContainer}`}
    >
      <div
        className={`col-11 col-md-12 m-2 d-flex flex-column align-items-end gap-2 ${style.flexItemOne}`}
      >
        <span className={`${style.settingIcon} align-self-end`} onClick={toggleSortSetting}>
          <GiSettingsKnobs></GiSettingsKnobs>
        </span>
        <div
          className={`${sortState.showSortPopup?' d-flex':'d-none'} col-10 col-sm-6 col-md-4 flex-column align-items-center  gap-2 ${style.sortSetting}`}
          
        >
          {/* <div
            className={`col-10 mt-2 d-flex align-items-center justify-content-between  ${style.searchcontainer}`}
          >
            <input ref={searchRef} type="text" className="col-10" placeholder="Search by title" onBlur={setSortField}></input>
            <span onClick={setSortField}>
              <FaSearch></FaSearch>
            </span>
          </div> */}
          <span className={style.breakline}></span>
          <div
            className={`col-11 d-flex flex-column gap-2 `}
          >
            <span className="d-flex " style={{fontWeight:'bold'}}>Sort by : <span style={{fontWeight:'normal'}}>&nbsp;&nbsp;Status</span></span>
            <div className={`${style.sortoptions} col-12 align-self-center d-flex flex-column`} style={{textAlign:'start'}}>
                <span className={sortState.value ===''?style.isSelected:''} onClick={setSortState} value="">All</span>
                <span className={sortState.value ==='todo'?style.isSelected:''}  onClick={setSortState} value="todo">To Do</span>
                <span className={sortState.value ==='inprogress'?style.isSelected:''}  onClick={setSortState} value="inprogress">In Progress</span>
                <span className={sortState.value ==='done'?style.isSelected:''} onClick={setSortState} value="done">Done</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`col-12 col-m-10 mt-3 d-flex justify-content-center ${style.flexItemTwo} `} onMouseDown={hideSort}>
        <Tasks addNewItemRef={addNewItemRef} showAddTask={showAddTask} setAddTaskVisibility={setAddTaskVisibility} ></Tasks>
      </div>
    </div>
  );
}
