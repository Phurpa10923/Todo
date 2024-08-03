import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './Components/Sidebar/Sidebar';
import Todocontainer from './Components/Todocontainer/Todocontainer';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from './Components/Loading/Loading.component';
import Edittask from './Components/Task/Edittask.component';
import Errortoast from './Components/Error/Error.component';
function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showAddTask,setAddTaskFlag] = useState(false);
  const loading = useSelector((state)=>state.loading);
  const edittask = useSelector((state)=>state.edittask);
  const error = useSelector((state)=>state.error);
  const addNewItemRef = useRef();
  const toggleSideBar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleAddTask =(flag)=>{
    setAddTaskFlag(flag || !showAddTask);
    setTimeout(()=>{
      addNewItemRef.current.scrollIntoView();
    })
  }
  return (
    <div className="App">
      {error.visible?<Errortoast></Errortoast>:''}
      {edittask.visible?<Edittask></Edittask>:''}
      {loading.visible?<Loading></Loading>:null}
      <div className='d-flex' >
        <Sidebar showAddTask={showAddTask} setAddTaskVisibility={toggleAddTask} showSidebar={showSidebar} toggleSideBar={toggleSideBar}></Sidebar>
        <div className='col-12 d-flex justify-content-center'>
          <Todocontainer addNewItemRef = {addNewItemRef} showAddTask={showAddTask} setAddTaskVisibility={toggleAddTask} showSidebar={showSidebar}></Todocontainer>
        </div>
      </div>
    </div>
  );
}

export default App;
