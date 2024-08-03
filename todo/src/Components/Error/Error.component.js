import { MdCancel } from 'react-icons/md'
import style from './Error.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorMessage, setErrorVisibility } from '../../State/Error';

export default function Errortoast(){
    const errorObj = useSelector((state)=>state.error);
    const dispatch = useDispatch();
    const handleErrorDismiss =()=>{
        dispatch(setErrorVisibility(false));
        dispatch(setErrorMessage(''));
    }
    return(
        <div className='col-12 d-flex justify-content-center' style={{position:'fixed',zIndex:'1001',top:'2%'}}>
            <div className={`${style.errorContainer} col-10 col-md-4 d-flex justify-content-between align-items-center`}>
            <span>{errorObj.message}</span>
            <span onClick={handleErrorDismiss}><MdCancel></MdCancel></span>
        </div>
        </div>
    )
}