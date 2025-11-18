import { useEffect, useState } from "react"
import PatientCard from "./PatientCard";

function DoctorHome() {

    const [todayAppointmentList, setTodayAppointmentList] = useState([]);

    const todayDate = new Date().toISOString().split("T")[0];

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");

        return `${day}/${month}/${year}`
    }


    const appointmentFetch = async () => {
        const fetchResult = await fetch(`http://localhost:3000/appointment/doctor/appointment/TodayAppointment?todayDate=${formatDate(todayDate)}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })

        const fetchResponse = await fetchResult.json();

        const responseStatus = fetchResponse.status;

        if(responseStatus === 404){
            alert(fetchResponse.msg);

            return <div><h1>{fetchResponse.msg}</h1></div>
        }
        else if(responseStatus === 500){
            console.log(`Error: ${fetchResponse.error}`)
        }
        else if(responseStatus === 401){
            alert("Please Login Your Account");
        }
        else{
            setTodayAppointmentList(fetchResponse.Appointment)
        }
    }

    useEffect(() => {
        appointmentFetch();
    },[])
    

    return (
        <div>
            {todayAppointmentList.map((item, index) => {
               return <PatientCard data={item} key= {index}/>
            })}
        </div>
    )
}

export default  DoctorHome;