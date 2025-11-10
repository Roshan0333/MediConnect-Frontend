import { useState } from "react"
import ProfileImage from "../../assets/photos/profile.png";
import Styles from "./upcomingAppointment.module.css";

function UpcomingAppointmentCard({data}) {

    const [paymentStatus, setpaymentStatus] = useState("Pay Now");

    if(data.PaymentStatus){
        setpaymentStatus("Payed");
    }


    return (
        <div>
            <div className={Styles.ImageDiv}>
                <img src={ProfileImage} alt="Doctor Image" className={Styles.Image}/>
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

            <div>
                {(paymentStatus === "Pay Now")?<button className={Styles.PaymentStatus}>Pay Now</button>:<button className={Styles.PaymentStatus}>Payed</button>};
                <button className={Styles.CancelButton}>Cancel</button>
            </div>

        </div>
    )
}


export default UpcomingAppointmentCard;