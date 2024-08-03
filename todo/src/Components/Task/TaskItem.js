import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import style from "./Task.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setEditObject, setEditTaskVisibility } from "../../State/Editask";
import { setErrorMessage,setErrorVisibility } from "../../State/Error";
import moment from "moment";
import { setVisibility } from "../../State/Loading";
export default function TaskItem({ item, removeTask ,updateTask}) {
  const taskitemref = useRef();
  const dispatch = useDispatch();
  const removeElement = () => {
    taskitemref.current.classList.add(style.remove);
    setTimeout(()=>{
        removeTask(item._id);
    },400)
  };
  const statusDisplay = {
    '':{
      displaytext:'To do',
      backgroundcolor:'gray',
      textcolor:'black'
    },
    'todo':{
      displaytext:'To do',
      backgroundcolor:'gray',
      textcolor:'black'
    },
    'inprogress':{
      displaytext:'In progress',
      backgroundcolor:'#70ff70',
      textcolor:'black'
    },
    'done':{
      displaytext:'Done',
      backgroundcolor:'#A15640',
      textcolor:'black'
    }
  }
  const handleEdit=()=>{
    dispatch(setEditTaskVisibility(true));
    dispatch(setEditObject(item));
  }
  const handleMarkAsDone=()=>{
    dispatch(setVisibility(true));
    fetch(`/updatetask/${item._id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({data:{status:'done'}})
    }).then((res)=>res.json()).then(()=>{}).catch((err)=>{
      dispatch(setErrorVisibility(true));
      dispatch(setErrorMessage(err.message))
    }).finally(()=>{
      dispatch(setVisibility(false));
      updateTask(true);
    })
  }
  return (
    <div className={`${style.taskItemContainer} col-12 d-flex align-items-center justify-content-center ${item.status ==='done'?style.disabled:''}`} disabled={item.status ==='done'?true:false}>
      <input type="checkbox" onClick={item.status ==='done'?()=>{}:handleMarkAsDone}  data-toggle="tooltip" checked={item.status ==='done'?true:false}></input>
      <div
    key={item.uniqueid}
      ref={taskitemref}
      className={`${style.taskItem} col-10 col-md-10 d-flex flex-column align-items-center pb-2`}
    >
      <div
        className={`${style.tasktitleContainer} col-11 d-flex justify-content-between align-items-center`}
      >
        <span>{item.title}</span>
        <div
          className={`${style.taskitemactions} col-2 d-flex justify-content-end gap-2`}
        >
          <button disabled={item.status ==='done'?true:false} className={`${item.status ==='done'?style.disabled:''}`} onClick={handleEdit}> 
            <FaEdit></FaEdit>
          </button>
          <button disabled={item.status ==='done'?true:false} className={`${item.status ==='done'?style.disabled:''}`} onClick={removeElement}>
            <MdDelete></MdDelete>
          </button>
        </div>
      </div>
      <div className={`col-11 d-flex align-items-center ${style.taskitemdescription}`}>
        <span>{item.description}</span>
      </div>
      <div className={`col-11 d-flex justify-content-between align-items-center ${style.taskitemstatus}`} >
        <span style={statusDisplay[item.status]? {backgroundColor:statusDisplay[item.status].backgroundcolor,color:statusDisplay[item.status].textcolor}:{}}>{ statusDisplay[item.status] ?statusDisplay[item.status].displaytext:''}</span>
        <span>{item.duedate ? moment(item.duedate).format('YYYY-MM-DD'):''}</span>
      </div>
    </div>
    </div>
  );
}
