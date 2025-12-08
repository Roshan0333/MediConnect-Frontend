import { useEffect, useState } from "react"
import ProfileImage from "../../assets/photos/profile.png";
import Styles from "./upcomingAppointment.module.css";

function UpcomingAppointmentCard({ data, cancelAppointment }) {

    const [paymentStatus, setpaymentStatus] = useState("Pay Now");


    const cancelAppointmentHandle = (appointmentId) => {
        let confirmation = confirm("Conform this Appointment is Cancelling")
        
        if(confirmation === true){
            cancelAppointment(appointmentId)
        }
    }


    useEffect(() => {
        if (data.PaymentStatus) {
            setpaymentStatus("Payed");
        }
    }, [])


    return (
        <div className={Styles.cardMain}>
            <div className={Styles.ImageDiv}>
                <img src={ProfileImage} alt="Doctor Image" className={Styles.Image} />
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Doctor Name:</p>
                <p className={Styles.inputValue}>{data.DoctorName}</p>
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Specialization:</p>
                <p className={Styles.inputValue}>{data.DoctorSpecialization}</p>
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Appointment Date:</p>
                <p className={Styles.inputValue}>{data.AppointmentDate}</p>
            </div>

            <div className={Styles.inputDiv}>
                <p className={Styles.inputLabel}>Appointment Time:</p>
                <p className={Styles.inputValue}>{data.AppointmentTime}</p>
            </div>

            <div className={Styles.buttons}>
                {(paymentStatus === "Pay Now") ? <button className={Styles.PayNow}>Pay Now</button> : <button className={Styles.Payed}>Payed</button>}
                <button className={Styles.CancelButton} onClick={() => cancelAppointmentHandle(data._id)}>Cancel</button>
            </div>

        </div>
    )
}


export default UpcomingAppointmentCard;