import TaskItem from "./TaskItem";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import style from "./Task.module.css";
import { useEffect, useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { useDispatch, useSelector} from "react-redux";
import { setVisibility } from "../../State/Loading";
import moment from "moment";
import { setErrorMessage, setErrorVisibility } from "../../State/Error";
import { IoMdAddCircle } from "react-icons/io";
export default function Tasks({addNewItemRef,showAddTask,setAddTaskVisibility}) {
  const dispatch =useDispatch();
  const [tasks, setTasks] = useState([]);
  const activetab = useSelector((state)=>state.activetab);
  const [taskupdated,setTaskupdated] = useState(false);
  const [taskObject , setTaskObject] = useState({
    title: "",
    description: "",
    status: "todo",
    duedate: "",
  });
  const editTask = useSelector((state)=>state.edittask);
  const loading = useSelector((state)=>state.loading);
  const sortObj = useSelector((state)=>state.sort);
  const formRef = useRef();
  const dateRef = useRef();
  const toggleShowAddTask=()=>{
    formRef.current.reset();
    setAddTaskVisibility(!showAddTask);
  }
  const autoGrow =(event)=>{
      handleTaskInputChange(event);
      event.currentTarget.style.height = 'auto'; // Reset height to auto to calculate scrollHeight
      event.currentTarget.style.height = (event.currentTarget.scrollHeight) + 'px'; // Set height to scrollHeight
  }

  const triggerDate = ()=>{
    dateRef.current.showPicker();
  }
  const handleTaskInputChange = (e)=>{
    const {name , value} = e.target;
    setTaskObject({...taskObject,[name]:value});
  }
  const submitTask = (e)=>{
    e.preventDefault();
    dispatch(setVisibility(true));
    if(taskObject.title!==''){
      fetch('/newtask',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(taskObject)
      }).then((response)=>response.json()).then((data)=>{
        const newTask = [...tasks,data];
        setTasks(newTask);
        e.target.reset();
      }).catch((err)=>{
        console.log(err);
      }).finally(()=>{
        dispatch(setVisibility(false));
        
      })
    }
  }
  const removeTask = (id) => {
    dispatch(setVisibility(true));
    fetch(`/removeTask/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    }).then((response)=>response.json()).then((data)=>{
      const removedIndex = tasks.findIndex((item)=>item._id===data._id);
      tasks.splice(removedIndex,1);
      setTasks(tasks);
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      dispatch(setVisibility(false));
    })
  };
  const tasksElement = tasks.map((item) => {
    return (
      <TaskItem
        key={item._id}
        data-uniqueid={item._id}
        item={item}
        removeTask={removeTask}
        updateTask={setTaskupdated}
      ></TaskItem>
    );
  });

  useEffect(()=>{
    var query =sortObj.searchfield?'?name='+sortObj.searchfield:'';
    query = activetab.value? (query!==''? `${query}&&day=${activetab.value}`:`${query}?day=${activetab.value}`):query;
    fetch(`/tasks${sortObj.value?'/'+sortObj.value:''}${query}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      },
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      setTasks(data);
    }).catch((err)=>{
      dispatch(setErrorVisibility(true));
      dispatch(setErrorMessage(err.message))
    }).finally(()=>{
      setTaskupdated(false);
    })
  },[editTask.visible,sortObj.value,sortObj.searchfield,activetab,taskupdated,loading.visible])

  return (
    <div className="col-11 col-md-10 d-flex flex-column h-100">
      <h3 style={{textAlign:'start'}}>{activetab.value===''?'All tasks':(activetab.value=='today'?'Today':'Upcoming')}</h3>
      {/* <span style={{textAlign:'start'}}>{ tasks.length>0 ? `Found ${tasks.length} tasks.`:'No tasks'}</span> */}
      <PerfectScrollbar className={`${style.scrollbar} `}>
        <div
          className={`col-12  d-flex flex-column align-items-center my-3 gap-3`}
        >
          {tasksElement.length==0?<span>No task available</span>:tasksElement}
          <div ref={addNewItemRef} className={`${showAddTask ? 'd-flex':'d-none'} col-12 align-items-center justify-content-center`}>
            <div className={`${style.addTaskContainer} col-10 d-flex flex-column justify-content-center gap-2`}>
              <form ref={formRef}onSubmit={submitTask}>
                <input name="title" onChange={handleTaskInputChange} type="text" placeholder="* Title"></input>
                <textarea name="description" onChange={autoGrow} placeholder="description"></textarea>
                <span className={`${style.dateContainer} d-flex align-items-center justify-content-center gap-2`} onClick={triggerDate}><CiCalendarDate></CiCalendarDate> {taskObject.duedate ? moment(taskObject.duedate).format('YYYY-MM-DD') : '* Date'} <input type="date" onChange={handleTaskInputChange} ref={dateRef} name="duedate" placeholder="Due date"></input>{}</span>
                <footer className="d-flex justify-content-end gap-2 align-items-center p-2">
                    <button type="button" className={style.cancel} onClick={toggleShowAddTask}><TiCancel></TiCancel><span className="d-none d-md-flex">Cancel</span></button>
                    <button type="submit" className={`${style.save} ${taskObject.title==='' || taskObject.duedate ===''?style.disabled:''}`} disabled={taskObject.title===''||taskObject.duedate===''?true:false} ><FaSave></FaSave><span className="d-none d-md-flex">Save</span></button>
                </footer>
              </form>
            </div>
          </div>
          <div className={`${!showAddTask ? 'd-flex':'d-none'} ${style.addItem} justify-content-center col-12`}>
            <span onClick={toggleShowAddTask} className="d-flex align-items-center gap-2">
              <IoMdAddCircle></IoMdAddCircle>Add Task
            </span>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
}
