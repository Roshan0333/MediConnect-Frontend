import Styles from "./HistoryComponent.module.css"

function HistoryCard({info}) {

    let userType = localStorage.getItem("UserType");
    return (
        <div className={Styles.Card}>
            {(userType === "Doctor")?cardForDoctor(info):cardForPatient(info)}
        </div>
    )
}


let cardForPatient = (info) => {
    return (
        <div className={Styles.Card}>
            <div className={Styles.dataField}>
                <label>Doctor Name: </label>
                <p className={Styles.ApiData}>{info.DoctorName}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Specialzation :</label>
                <p className={Styles.ApiData}>{info.DoctorSpecialization
}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Date :</label>
                <p className={Styles.ApiData}>{info.AppointmentDate}</p>
            </div>
            <div className={Styles.dataField}>
                <label>Time :</label>
                <p className={Styles.ApiData}>{info.AppointmentTime}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Appointment Status :</label>
                <p className={Styles.ApiData}>{info.AppointmentStatus}</p>
            </div>
            
        </div>
    )
}


let cardForDoctor = (info) => {
    return (
        <div className={Styles.Card}>
            <div className={Styles.dataField}>
                <label>Patient Name: </label>
                <p className={Styles.ApiData}>{info.PatientName}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Date :</label>
                <p className={Styles.ApiData}>{info.AppointmentDate}</p>
            </div>
            <div className={Styles.dataField}>
                <label>Time :</label>
                <p className={Styles.ApiData}>{info.AppointmentTime}</p>
            </div>
        </div>
    )
}

export default HistoryCard;