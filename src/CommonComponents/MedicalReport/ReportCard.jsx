import Styles from "./MedicalReport.module.css"

function ReportCard({ data}) {

    let downloadReport = (ReportData, fileName = "Report.pdf") => {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${ReportData}`;
        link.download = fileName;
        link.click();
    }

    let userType = localStorage.getItem("UserType");

    return (
        (userType === "Doctor")
        ?<ReportCardforDoctor data={data} downloadReport={downloadReport}/>
        :<ReportCardForPatient data={data} downloadReport={downloadReport}/>
    )
}


let ReportCardForPatient = ({data, downloadReport}) => {
    return (
        <div className={Styles.cardMainDiv}>
            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Doctor Name:</p>
                <p className={Styles.itemValue}>{data.DoctorName}</p>
            </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Specialization:</p>
                <p className={Styles.itemValue}>{data.DoctorSpecialization}</p>
            </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Date:</p>
                <p className={Styles.itemValue}>{data.AppointmentDate}</p>
            </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Time:</p>
                <p className={Styles.itemValue}>{data.AppointmentTime}</p>
            </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Uploaded By:</p>
                <p className={Styles.itemValue}>{data.UploadedBy}</p>
            </div>

            <button onClick={() => downloadReport(data.Report, data.FileName)} className={Styles.downloadButton}>Report</button>
        </div>
    )
}


let ReportCardforDoctor = ({data, downloadReport}) => {
    return (
        <div className={Styles.cardMainDiv}>
            <div className={Styles.itemDiv}>
                    <p className={Styles.itemLabel}>Patient Name:</p>
                    <p className={Styles.itemValue}>{data.PatientName}</p>
                </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Date:</p>
                <p className={Styles.itemValue}>{data.AppointmentDate}</p>
            </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Time:</p>
                <p className={Styles.itemValue}>{data.AppointmentTime}</p>
            </div>

            <div className={Styles.itemDiv}>
                <p className={Styles.itemLabel}>Uploaded By:</p>
                <p className={Styles.itemValue}>{data.UploadedBy}</p>
            </div>

            <button onClick={() => downloadReport(data.Report, data.FileName)} className={Styles.downloadButton}>Report</button>
        </div>
    )
}


export default ReportCard;