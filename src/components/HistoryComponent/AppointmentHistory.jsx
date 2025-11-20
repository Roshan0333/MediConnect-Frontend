import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import styles from "./HistoryComponent.module.css";

function AppointmentHistoryComponent () {

    const [AppointmentList, setAppointmentList] = useState([]);

    let fetch_AppointmentHistory = async () => {
        let res_History = await fetch("http://localhost:3000/mediconnect/booking/AppointmentHistory", {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
            credentials:"include"
        });

        let response = await res_History.json();

        let status = response.status;

        if(status === 500){
            console.log(`Error: ${response.error}`)
        }
        else{
            if(!response.length){
                alert(response.msg)
            }else{
                setAppointmentList(response.Data)
            }
        }
    }


    useEffect(() => {
        fetch_AppointmentHistory()
    },[])
 
    return (
        <div className={styles.HistoryMainComponent}>
            {Object.values(AppointmentList).map((appointment, index) => {
               return <HistoryCard info={appointment} key={index}/>
            }).reverse()}
        </div>
    )
}


export default AppointmentHistoryComponent;