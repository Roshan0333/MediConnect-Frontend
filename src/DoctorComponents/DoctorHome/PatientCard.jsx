import Styles from "./DoctorHome.module.css"

function PatientCard({data}) {
    return (
        <div className={Styles.patientCard}>
            <div className={Styles.dataField}>
                <p>Patient Name:</p>
                <p>{data.PatientName}</p>
            </div>

            <div className={Styles.dataField}>
                <p>Appointment Date:</p>
                <p>{data.AppointmentDate}</p>
            </div>

            <div className={Styles.dataField}>
                <p>Appointment Time:</p>
                <p>{data.AppointmentTIme}</p>
            </div>
        </div>
    )
}

export default PatientCard;