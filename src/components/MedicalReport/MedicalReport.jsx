import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ReportCard from "./ReportCard";
import Styles from "./MedicalReport.module.css"

function MedicalReport() {

    const [reportList, setReportList] = useState([]);

    const userType = localStorage.getItem("UserType")

    

    let fetchReport = async () => {
        let fetchResult = await fetch((userType === "Doctor")?"http://localhost:3000/mediconnect/management/Report/ReportGetByDoctor":"http://localhost:3000/mediconnect/management/Report/ReportGetByPatient", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: "include"
        }
        )


        let fetchResponse = await fetchResult.json();

        let responseStatus = fetchResponse.status;

        if (responseStatus === 500) {
            console.log(`Error: ${fetchResponse.error}`);
            alert(`Error: ${fetchResponse.error}`);
        }
        else if (responseStatus === 204) {
            console.log(`Message : ${fetchResponse.msg}`);
        }
        else if(responseStatus === 401){
            alert("Please Login Your Account")
        }
        else {
            setReportList(fetchResponse.Reports);
            console.log(`Medical Reports: ${fetchResponse.Reports}`);
        }
    }


    useEffect(() => {
        fetchReport();
    },[])


    if (reportList.length === 0) {
    return <ClipLoader color="#32cd32" size={40} />;
}


    return (
        <div className={Styles.ReportMainDiv}>
            {reportList.map((reportData, index) => <ReportCard data={reportData} key={index}/>)}
        </div>
    )
}

export default MedicalReport;