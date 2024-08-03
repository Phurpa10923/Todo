import style from "./Task.module.css";
import { useEffect, useRef, useState } from "react";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import { CiCalendarDate } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { FaSave ,FaEdit} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setEditObject, setEditTaskVisibility } from "../../State/Editask";
import { setVisibility } from "../../State/Loading";
import moment from "moment";
import { setErrorMessage, setErrorVisibility } from "../../State/Error";
export default function Edittask() {
  const dateRef = useRef();
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "",
    _id: "",
  });
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
  const edittask = useSelector((state) => state.edittask);
  const dispatch = useDispatch();
  const handleSelect = (eventKey) => {
    setSelectedItem({...selectedItem,status:eventKey});
  };
  const triggerDate = () => {
    dateRef.current.showPicker();
  };
  const autoGrow = (event) => {
    handleTaskInputChange(event);
    event.currentTarget.style.height = "auto"; // Reset height to auto to calculate scrollHeight
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px"; // Set height to scrollHeight
  };
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  useEffect(() => {
    setSelectedItem(edittask.taskobj);
  }, []);

  const handleCancel = () => {
    dispatch(setEditTaskVisibility(false));
    dispatch(
      setEditObject({
        title: "",
        description: "",
        duedate: "",
        status: "",
        _id: "",
      })
    );
  };
  const handleSave = () => {
    dispatch(setVisibility(true));
    fetch(`/updatetask/${selectedItem._id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'data':selectedItem})
    }).then((response)=>response.json()).then((data)=>{
      if(!data){
        dispatch(setErrorVisibility(true));
        dispatch(setErrorMessage('Could not update the item with id :' + selectedItem._id))
      }
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      dispatch(setVisibility(false));
      handleCancel();
    })
  };

  return (
    <div
      className={`${style.edittaskContainer} d-flex justify-content-center align-items-center`}
    >
      <div className={`${style.editBox} col-10 col-md-4`}>
        <header className="d-flex justify-content-between ">
          <span className="d-flex  align-items-center gap-2">Edit <FaEdit></FaEdit></span>
          <div className={`${style.editactions} d-flex gap-3`}>
            <button
              className={`${style.editcancel} d-flex align-items-center gap-2`}
              id="editcancel"
              onClick={handleCancel}
            >
              <MdCancel></MdCancel>
              <span className="d-none d-md-flex">Cancel</span>
            </button>
            <button
              className={`${style.editsave} d-flex align-items-center gap-2 ${selectedItem.title==='' || selectedItem.duedate ===''?style.disabled:''}`}
              disabled={selectedItem.title===''||selectedItem.duedate===''?true:false}
              id="editsave" onClick={handleSave}
            >
              <FaSave></FaSave> <span className="d-none d-md-flex">Save</span>
            </button>
          </div>
        </header>
        <div className={`${style.editcontrols} d-flex flex-column mt-2`}>
          <input
            name="title"
            value={selectedItem.title}
            type="text"
            placeholder="Title"
            onChange={handleTaskInputChange}
          ></input>
          <textarea
            name="description"
            placeholder="description"
            rows={5}
            value={selectedItem.description}
            onChange={autoGrow}
          ></textarea>

          <div className="d-flex align-items-center py-2 px-1 gap-2">
            <span>Due date :</span>
            <span
              className={`${style.dateContainer} d-flex align-items-center justify-content-center gap-2`}
              onClick={triggerDate}
            >
              <CiCalendarDate></CiCalendarDate> {selectedItem.duedate!=='' ? moment(selectedItem.duedate).format('YYYY-MM-DD') : "Date"}
              <input
                type="date"
                onChange={handleTaskInputChange}
                ref={dateRef}
                name="duedate"
                placeholder="Due date"
                onReset={handleTaskInputChange}
              ></input>
              {}
            </span>
          </div>
          <div className="d-flex align-items-center py-2 px-1 gap-2">
            <span>Status :</span>
            <DropdownButton
              className={`${style.customdropdown}`}
              title={statusDisplay[selectedItem.status] ?statusDisplay[selectedItem.status].displaytext:''}
              onSelect={handleSelect}
              variant=""
              onChange={handleTaskInputChange}
              style={statusDisplay[selectedItem.status]? {backgroundColor:`${statusDisplay[selectedItem.status].backgroundcolor}`,color:`${statusDisplay[selectedItem.status].textcolor}`}:{}}
            >
              <DropdownItem eventKey={"todo"}>To Do</DropdownItem>
              <DropdownItem eventKey={"inprogress"}>In Progress</DropdownItem>
              <DropdownItem eventKey={"done"}>Done</DropdownItem>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
}
