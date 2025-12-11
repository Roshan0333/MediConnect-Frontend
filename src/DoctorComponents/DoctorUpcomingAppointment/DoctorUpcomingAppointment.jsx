import { useEffect, useState } from "react";
import DoctorUpcomingAppointmentCard from "./DoctorUpComingAppointmentCard";
import Styles from "./DoctorUpcomingAppointment.module.css";
import ClipLoader from "react-spinners/ClipLoader";

function DoctorUpcomingAppointment() {

    const [appointmentList, setAppointmentList] = useState([]);
    const [loadingFlag, setLoadingFlag] = useState(false);

    let today = new Date().toLocaleDateString();

    let fetchAppointment = async () => {
        try {
            let result = await fetch(`http://localhost:3000/mediconnect/doctor/appointment/FutureAppointment?todayDate=${today}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let resultResponse = await result.json();

            let responseStatus = resultResponse.status;

            if (responseStatus === 404) {
                setLoadingFlag(true)
            }
            else if (responseStatus === 401) {
                alert("Please Login Your Account");
                setLoadingFlag(true)
            }
            else if (responseStatus === 200) {
                setAppointmentList(resultResponse.Appointment);
                setLoadingFlag(true)
                console.log(resultResponse.Appointment)
            }
            else {
                
                console.log(`Error: ${resultResponse.error}`)
                setLoadingFlag(true)
            }

        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }


    useEffect(() => {
        console.log("Enter")
        fetchAppointment();
    }, []);


    if (!loadingFlag) {
        return <div className="loadingDiv">
            <ClipLoader color="#32cd32" size={40} className="loadingAnimation" />
            <p className="loadingPara">Loading...</p>
        </div>
    }

    if (appointmentList.length === 0) {
        return (<div className={Styles.notFoundDiv}>
            <h1 className={Styles.notFound}>Not Appointment Found</h1>
        </div>)
    }

    return (
        <div className={Styles.Appointment_MainDiv}>
            {appointmentList.map((listItem, index) => {
                return <DoctorUpcomingAppointmentCard data={listItem} key={index}/>
            })}
        </div>
    )
}

export default DoctorUpcomingAppointment;