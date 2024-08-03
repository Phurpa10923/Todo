import { useSelector } from 'react-redux'
import style from './Loading.module.css'

export default function Loading(){
    const loading = useSelector((state)=>state.loading);
    return(
        <div className={`${style.mainLoadContainer} d-flex flex-column gap-3 justify-content-center align-items-center`}>
            <div className={`${style.loadingContainer} d-flex justify-content-center align-items-center`}>
            </div>
            <span>{loading.loadingmessage}</span>
        </div>
    )
}