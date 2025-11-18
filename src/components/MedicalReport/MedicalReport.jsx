import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ReportCard from "./ReportCard";
import Styles from "./MedicalReport.module.css"

function MedicalReport() {

    const [reportList, setReportList] = useState([]);

    const [requestBy, setRequestBy] = useState("");

    

    let fetchReport = async () => {
        let fetchResult = await fetch("http://localhost:3000/appointment/management/Report/ReportGet", {
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
            setRequestBy(fetchResponse.RequestFrom)
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
            {reportList.map((reportData, index) => <ReportCard data={reportData} requestBy={requestBy} key={index}/>)}
        </div>
    )
}

export default MedicalReport;