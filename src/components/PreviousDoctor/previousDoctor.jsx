import { useEffect, useState } from "react"
import Card from "../card/card"

function PreviousDoctors() {

    const [previousDoctorDetail, setPreviousDoctorDetail] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([])


    let Fetch_AppointmentHistory = async () => {
        let appointmentHistory = await fetch("http://localhost:3000/appointment/booking/AppointmentHistory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        let response = await appointmentHistory.json();

        let status = response.status;
        if (status === 500) {
            console.log(`Error: ${response.error}`)
        }
        else {
            if (!response.length) {
                console.log("Not Found")
                alert(response.msg)
            }
            else {
                setPreviousDoctorDetail(response.Data)
            }
        }
    }


    useEffect(() => {
        Fetch_AppointmentHistory();
    }, []);


    useEffect(() => {
        let doctorDetail = []

        let DoctorList = async () => {

            const ids = [...new Set(previousDoctorDetail.map((doc) => doc.DoctorId))];

            for (const id of ids) {
                try {
                    let fetch_DoctorDetail = await fetch(`http://localhost:3000/appointment/booking/PreviousDoctor?DoctorId=${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });

                    let response = await fetch_DoctorDetail.json();

                    let DoctorDetail = response.DoctorDetail;

                    doctorDetail.push(DoctorDetail)
                }
                catch (err) {
                    console.log(`Error: ${err.message}`)
                }
            }
        }

    DoctorList()

        setDoctorDetails(doctorDetail);
    }, [previousDoctorDetail]);


    return (
        <div>
            {Object.values(doctorDetails).map((data, index) => {
                return <Card info={data} key={index}></Card>
            })}
        </div>
    )
}


export default PreviousDoctors;