import { FaTimes, FaPlus } from "react-icons/fa";
import Styles from "./appointmentPost.module.css"
import { useState } from "react";

function TimeCard({data, slotIndex, deleteFunction, switchValue}) {

    let [editValue, setEditedValue] = useState(true);

    return (
        <div className={(switchValue && !data.Status)?Styles.time: Styles.unCheckTime}>
            <p className={Styles.timeValue}>{data.time}</p>
            {(!data.Status)?(editValue)?<FaTimes onClick={() => {
                if(switchValue){
                    deleteFunction(slotIndex);
                    setEditedValue(editValue = !editValue)
                }
            }}/>:<FaPlus onClick={() => {
                if(switchValue){
                    deleteFunction(slotIndex);
                    setEditedValue(editValue =!editValue)
                }
            }}/>:null}
        </div>
    )
}

export default TimeCard;