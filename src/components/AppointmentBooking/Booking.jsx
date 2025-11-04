import { useNavigate, useLocation, replace } from "react-router-dom";
import styles from "../AppointmentBooking/Booking.module.css"

function AppointmentBooking() {
    let location = useLocation();
    let Navigate = useNavigate();

    let { DoctorName, DoctorId, AppointmentDate, AppointmentTime, experience, specialization, date, fee } = location.state;


    let AppointmentBookingConformation = async () => {
        let Booking = await fetch(
            "http://localhost:3000/appointment/booking/AppointmentBooking",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    DoctorName,
                    DoctorId,
                    AppointmentDate,
                    AppointmentTime
                }),
                credentials:"include"

            }
        )

        let response = await Booking.json();

        if (response.status === 200) {
            alert(response.msg)
            
            setTimeout(Navigate("/", {replace:true}),1000)
        }
        else if(response.status === 401 || response.error === "You must be Login"){
            Navigate("/Login", {replace:true})
        }
        else {
            alert(response.error);
            console.log(`Error: ${response.error}`);
        }
    }


    let Cancel = async () => {
        try{

            Navigate("/AppointmentBooking", 
                {state:{id:DoctorId, doctorName:DoctorName, specialization, experience, date:date},},
                {replace: true}    
            )
        }
        catch(err){
            console.log(err)
        }
    }
    return (
            <div className={styles.mainDiv}>
                <div className={styles.inputDiv}>
                    <label className={styles.inputFieldLabel}>Hosipital Name : </label>
                    <p className={styles.inputFieldValue}>Apollo Hosipital</p>
                </div>

                <div className={styles.inputDiv}>
                    <label className={styles.inputFieldLabel}>Hosipital Address : </label>
                    <p className={styles.inputFieldValue}>Delhi</p>
                </div>

                <div className={styles.inputDiv}>
                    <label className={styles.inputFieldLabel}>Doctor Name : </label>
                    <p className={styles.inputFieldValue}>{DoctorName}</p>
                </div>

                <div className={styles.inputDiv}>
                    <label className={styles.inputFieldLabel}>Appointment Date : </label>
                    <p className={styles.inputFieldValue}>{AppointmentDate}</p>
                </div>

                <div className={styles.inputDiv}>
                    <lablel className={styles.inputFieldLabel}>Appointment Time : </lablel>
                    <p className={styles.inputFieldValue}>{AppointmentTime}</p>
                </div>

                <div className={styles.inputDiv}>
                    <label className={styles.inputFieldLabel}>Appointment Fee</label>
                    <p className={styles.inputFieldValue}>{fee}</p>
                </div>

                <div className={styles.ButtonDiv}>
                    <button 
                    onClick={() => {Cancel()}}
                    className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button
                        onClick={() => { AppointmentBookingConformation() }}
                        className={styles.conformButton}>
                        Conform
                    </button>
                </div>
            </div>
    )
}

export default AppointmentBooking;