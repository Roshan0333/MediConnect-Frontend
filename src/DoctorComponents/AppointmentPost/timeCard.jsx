import { FaTimes, FaPlus } from "react-icons/fa";
import Styles from "./appointmentPost.module.css"
import { useState } from "react";

function TimeCard({data, slotIndex, deleteFunction, switchValue}) {

    let [editValue, setEditedValue] = useState(true);

    return (
        <div className={(switchValue)?Styles.time: Styles.unCheckTime}>
            <p className={Styles.timeValue}>{data.time}</p>
            {(editValue)?<FaTimes onClick={() => {
                if(switchValue){
                    deleteFunction(slotIndex);
                    setEditedValue(editValue = !editValue)
                }
            }}/>:<FaPlus onClick={() => {
                if(switchValue){
                    deleteFunction(slotIndex);
                    setEditedValue(editValue =!editValue)
                }
            }}/>}
        </div>
    )
}

export default TimeCard;