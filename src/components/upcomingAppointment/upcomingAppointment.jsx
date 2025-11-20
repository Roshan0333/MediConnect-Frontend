import { useEffect, useState } from "react";
import UpcomingAppointmentCard from "./upcomingAppointmentCard";
import Styles from "./upcomingAppointment.module.css";

function UpcomingAppointment() {

    const [appointementList, setAppointmentList] = useState([]);

    let fetchAppointment = async () => {
        try {
            let result = await fetch("http://localhost:3000/mediconnect/booking/CurrentAppointment", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            let resultResponse = await result.json();

            let responseStatus = resultResponse.status;

            if (responseStatus === 404) {
                alert(`Message : ${resultResponse.msg}`)
                console.log(`Message: ${resultResponse.msg}`)
            }
            else if(responseStatus === 401){
                alert("Please Login Your Account")
            }
            else if (responseStatus === 200) {
                console.log(resultResponse.currentAppointment);
                setAppointmentList(resultResponse.currentAppointment);
            }
            else {
                console.log(`Error: ${resultResponse.error}`)
            }

        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    useEffect(() => {
        fetchAppointment();
    }, []);

    return (
        <div className={Styles.Appointment_MainDiv}>
            {appointementList.map((listItem, index) => {
                <UpcomingAppointmentCard data={listItem} key={index}/>
            })}
        </div>
    )
}

export default UpcomingAppointment;