import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import styles from "./HistoryComponent.module.css";

function AppointmentHistoryComponent() {

    const [AppointmentList, setAppointmentList] = useState([]);

    let userType = localStorage.getItem("UserType");

    let fetch_AppointmentHistory = async () => {
        let res_History = await fetch((userType === "Doctor") ? "http://localhost:3000/mediconnect/doctor/appointment/HistoryAppointment" : "http://localhost:3000/mediconnect/booking/AppointmentHistory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        let response = await res_History.json();

        let status = response.status;

        if (status === 500) {
            console.log(`Error: ${response.error}`)
        }
        else {
            if (!response.length) {
                alert(response.msg)
                return (<div className={styles.notFoundDiv}>
                    <h1 className={styles.notFound}>Not Appointment History Found</h1>
                </div>)
            } else {
                console.log(response.appointmentHistoryData)
                setAppointmentList(response.appointmentHistoryData)
            }
        }
    }


    useEffect(() => {
        fetch_AppointmentHistory()
    }, [])

    return (
        <div className={styles.HistoryMainComponent}>
            {AppointmentList.map((appointment, index) => {
                return <HistoryCard info={appointment} key={index} />
            }).reverse()}
        </div>
    )
}


export default AppointmentHistoryComponent;