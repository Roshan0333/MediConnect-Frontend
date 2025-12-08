import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ReportCard from "./ReportCard";
import Styles from "./MedicalReport.module.css"

function MedicalReport() {

    const [reportList, setReportList] = useState([]);

    const userType = localStorage.getItem("UserType");

    const [loadingFlag, setLoadingFlag] = useState(false)



    let fetchReport = async () => {
        let fetchResult = await fetch((userType === "Doctor") ? "http://localhost:3000/mediconnect/management/Report/ReportGetByDoctor" : "http://localhost:3000/mediconnect/management/Report/ReportGetByPatient", {
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
            setLoadingFlag(true);
        }
        else if (responseStatus === 404) {
            console.log(`Message : ${fetchResponse.msg}`);
            setLoadingFlag(true);
        }
        else if (responseStatus === 401) {
            alert("Please Login Your Account")
            setLoadingFlag(true);
        }
        else {
            setReportList(fetchResponse.Reports);
            setLoadingFlag(true);
        }
    }

    useEffect(() => {
        fetchReport();
    }, [])


     if (!loadingFlag) {
        return <div className="loadingDiv">
            <ClipLoader color="#32cd32" size={40} className="loadingAnimation" />
            <p className="loadingPara">Loading...</p>
        </div>
    }

    if(reportList.length === 0){
        return <div className={Styles.notFoundDiv}>
                <h1 className={Styles.notFound}>No Found</h1>
            </div>
    }


    return (
        <div className={Styles.ReportMainDiv}>
            {reportList.map((reportData, index) => <ReportCard data={reportData} key={index} />)}
        </div>
    )
}

export default MedicalReport;