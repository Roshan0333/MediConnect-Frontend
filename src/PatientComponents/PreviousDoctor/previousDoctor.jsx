import { useEffect, useState } from "react";
import Card from "../../CommonComponents/card/card";
import Styles from "./previousDoctor.module.css";
import ClipLoader from "react-spinners/ClipLoader";

function PreviousDoctors() {

    const [previousDoctorDetail, setPreviousDoctorDetail] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const [loadingFlag, setLoadingFlag] = useState(false);


    let Fetch_AppointmentHistory = async () => {
        try {
            let appointmentHistory = await fetch("http://localhost:3000/mediconnect/booking/AppointmentHistory", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            let response = await appointmentHistory.json();

            let status = response.status;
            if (status === 500) {
                console.log(`Error: ${response.error}`);
                setLoadingFlag(true);
            } else if (status === 401) {
                alert("Please Login Your Account");
                setLoadingFlag(true);
            }
            else {
                if (!response.length) {
                    alert(response.msg)
                    setLoadingFlag(true)
                }
                else {
                    setPreviousDoctorDetail(response.Data);
                    setLoadingFlag(true);
                }
            }
        }
        catch (err) {
            console.log(err);
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
                    let fetch_DoctorDetail = await fetch(`http://localhost:3000/mediconnect/booking/PreviousDoctor?DoctorId=${id}`, {
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

            setDoctorDetails(doctorDetail);
        }



        if (previousDoctorDetail.length > 0) {
            DoctorList()
        }
    }, [previousDoctorDetail]);


    if (!loadingFlag) {
        return <div className="loadingDiv">
            <ClipLoader color="#32cd32" size={40} className="loadingAnimation" />
            <p className="loadingPara">Loading...</p>
        </div>
    }

    if (doctorDetails.length === 0) {
        return <div className={Styles.notFoundDiv}>
            <h1 className={Styles.notFound}>Not Previous Doctor Found</h1>
        </div>
    }

    return (
        <div className={Styles.cardMainDiv}>
            {Object.values(doctorDetails).map((data, index) => {
                return <Card info={data} key={index}></Card>
            })}
        </div>
    )
}


export default PreviousDoctors;