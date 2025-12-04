import { useEffect, useState } from "react";
import UpcomingAppointmentCard from "./upcomingAppointmentCard";
import Styles from "./upcomingAppointment.module.css";

function UpcomingAppointment() {

    const [appointmentList, setAppointmentList] = useState([]);

    let fetchAppointment = async () => {
        try {
            let result = await fetch("http://localhost:3000/mediconnect/booking/CurrentAppointment", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let resultResponse = await result.json();

            console.log(resultResponse)

            let responseStatus = resultResponse.status;

            if (responseStatus === 404) {
                alert(`Message : ${resultResponse.msg}`)
                console.log(`Message: ${resultResponse.msg}`)
            }
            else if (responseStatus === 401) {
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


    let cancelAppointment = async (appointmentId) => {
        try {
            let fetchResult = await fetch("http://localhost:3000/mediconnect/booking/CancelAppointment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    AppointmentId: appointmentId
                }),
                credentials: 'include'
            });

            let resultResponse = await fetchResult.json();
            let responseStatus = resultResponse.status;

            if (responseStatus === 200) {
                alert(resultResponse.msg)
            }
            else if (responseStatus === 400) {
                alert(resultResponse.msg)
            }
            else {
                console.log(resultResponse.error);
                alert("Please Try Again")
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAppointment();
    }, []);

    return (
        <div className={Styles.Appointment_MainDiv}>
            {appointmentList.map((listItem, index) => {
                return <UpcomingAppointmentCard data={listItem} key={index} cancelAppointment={cancelAppointment} />
            })}
        </div>
    )
}

export default UpcomingAppointment;