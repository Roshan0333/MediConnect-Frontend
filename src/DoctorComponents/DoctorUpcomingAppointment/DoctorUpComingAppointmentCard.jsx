import { useEffect, useState } from "react"
import ProfileImage from "../../assets/photos/profile.png";
import Styles from "./DoctorUpcomingAppointment.module.css";

function DoctorUpcomingAppointmentCard({ data}) {


    return (
        <div className={Styles.cardMain}>
            <div className={Styles.ImageDiv}>
                <img src={ProfileImage} alt="Doctor Image" className={Styles.Image} />
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Patient Name:</p>
                <p className={Styles.inputValue}>{data.PatientName}</p>
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Appointment Date:</p>
                <p className={Styles.inputValue}>{data.AppointmentDate}</p>
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Appointment Time:</p>
                <p className={Styles.inputValue}>{data.AppointmentTime}</p>
            </div>


        </div>
    )
}


export default DoctorUpcomingAppointmentCard;