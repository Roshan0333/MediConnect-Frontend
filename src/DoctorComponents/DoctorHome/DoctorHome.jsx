import { useEffect, useState } from "react"
import PatientCard from "./PatientCard";
import Styles from "./DoctorHome.module.css";
import ClipLoader from "react-spinners/ClipLoader";

function DoctorHome() {

    const [todayAppointmentList, setTodayAppointmentList] = useState([]);
    const [loadingFlag, setLoadingFlag] = useState(false)

    const todayDate = new Date().toLocaleDateString("en-CA");

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");

        return `${day}/${month}/${year}`
    }


    const appointmentFetch = async () => {
        const fetchResult = await fetch(`http://localhost:3000/mediconnect/doctor/appointment/TodayAppointment?todayDate=${formatDate(todayDate)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const fetchResponse = await fetchResult.json();

        const responseStatus = fetchResponse.status;

        if (responseStatus === 404) {
            alert(fetchResponse.msg);
            setLoadingFlag(true)
        }
        else if (responseStatus === 500) {
            console.log(`Error: ${fetchResponse.error}`)
            setLoadingFlag(true)
        }
        else if (responseStatus === 401) {
            alert("Please Login Your Account");
            setLoadingFlag(true)
        }
        else {
            setTodayAppointmentList(fetchResponse.Appointment)
            setLoadingFlag(true)
        }
    }

    useEffect(() => {
        appointmentFetch();
    }, [])

    if(!loadingFlag){
        return <div className="loadingDiv">
            <ClipLoader color="#32cd32" size={40} className="loadingAnimation" />
            <p className="loadingPara">Loading...</p>
        </div>
    }


    if (todayAppointmentList.length === 0) {
        return <div className={Styles.notFoundDiv}>
            <h1 className={Styles.notFound}>{fetchResponse.msg}</h1>
        </div>
    }


    return (
        <div className={Styles.doctorHomeMainDiv}>
            {todayAppointmentList.map((item, index) => {
                return <PatientCard data={item} key={index} />
            })}
        </div>
    )
}

export default DoctorHome;