import style from "./Sidebar.module.css";
import { MdToday } from "react-icons/md";
import { HiMiniCalendar } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { IoAdd } from "react-icons/io5";
import { setShowSortPopup } from "../../State/Sortstate";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../State/Avtivesidebartab";
export default function Sidebar({showSidebar,toggleSideBar,setAddTaskVisibility}) {
  const dispatch = useDispatch();
  const activeTab = useSelector((state)=>state.activetab);
  const hideSortPopup=()=>{
    dispatch(setShowSortPopup(false));
    toggleSideBar();
  }
  const toggleAddTask = ()=>{
    toggleSideBar();
    setAddTaskVisibility(true);
  }
  const updateActiveTab = (event)=>{
    dispatch(setActiveTab(event.target.getAttribute('data-tab')))
  }
  return (
    <div
      className={` d-flex flex-column ${style.sidebarContainer} ${
        showSidebar ? style.showSidebar +' col-6 col-md-2' : style.hideSidebar + ' col-0'
      }`}
    >
      <div
        className={`${style.profile} d-flex align-items-center justify-content-between my-2 p-2`}
      >
        <div
          className={`${style.userProfileContainer} align-self-center col-md-1 rounded-circle`}
        >
          <img
            className=""
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
          ></img>
        </div>
        <span className={style.toggleSidebar} onClick={hideSortPopup}>
          <VscLayoutSidebarLeft></VscLayoutSidebarLeft>
        </span>
      </div>
      <div className={`${style.sidebarTabs} mt-2`}>
        <ul className="d-flex flex-column gap-1">
          <li onClick={toggleAddTask}>
            <IoAdd></IoAdd> Add task
          </li>
          <li className={activeTab.value==='today'?style.activeTab:''} data-tab='today' onClick={updateActiveTab}>
            <MdToday></MdToday> Today
          </li>
          <li className={activeTab.value==='upcoming'?style.activeTab:''} data-tab='upcoming'  onClick={updateActiveTab}>
            <HiMiniCalendar></HiMiniCalendar> Upcoming days
          </li>
          <li className={activeTab.value===''?style.activeTab:''} data-tab = ''  onClick={updateActiveTab}>
            <FaTasks></FaTasks> All tasks
          </li>
        </ul>
      </div>
    </div>
  );
}
