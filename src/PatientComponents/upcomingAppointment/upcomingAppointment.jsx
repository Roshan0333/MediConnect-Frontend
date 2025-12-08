import { useEffect, useState } from "react";
import UpcomingAppointmentCard from "./upcomingAppointmentCard";
import Styles from "./upcomingAppointment.module.css";
import ClipLoader from "react-spinners/ClipLoader";

function UpcomingAppointment() {

    const [appointmentList, setAppointmentList] = useState([]);
    const [loadingFlag, setLoadingFlag] = useState(false)

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

            let responseStatus = resultResponse.status;

            if (responseStatus === 404) {
                setLoadingFlag(true)
            }
            else if (responseStatus === 401) {
                alert("Please Login Your Account");
                setLoadingFlag(true)
            }
            else if (responseStatus === 200) {
                setAppointmentList(resultResponse.currentAppointment);
                setLoadingFlag(true)
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


    if (!loadingFlag) {
        return <div className="loadingDiv">
            <ClipLoader color="#32cd32" size={40} className="loadingAnimation" />
            <p className="loadingPara">Loading...</p>
            {console.log(loadingFlag)}
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
                return <UpcomingAppointmentCard data={listItem} key={index} cancelAppointment={cancelAppointment} />
            })}
        </div>
    )
}

export default UpcomingAppointment;