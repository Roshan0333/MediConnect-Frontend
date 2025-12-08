import { useEffect, useState } from "react"
import profile from "../../assets/photos/profile.png"
import { Link, useLocation } from "react-router-dom";
import styles from "../doctorAvailable/doctorAvailable.module.css"
import { useMediaQuery } from "react-responsive";

function DoctorAvailableAndBooking() {

    let iSmallScreen = useMediaQuery({ maxWidth: "768px" });

    let location = useLocation();

    let { id, doctorName, specialization, experience, date, fee, doctorPhoto } = location.state;


    let [selectedDate, setDate] = useState(date)

    let [timeList, setTimeList] = useState([]);

    let [selectTime, setSelectTime] = useState("");

    const nextWeekDate = new Date();
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);

    let maxDate = nextWeekDate.toLocaleDateString("en-CA");
    const formatDateForAPI = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDateForAPI(selectedDate);




    let fetch_DoctorData = async () => {
        try {
            let fetch_Response = await fetch(`http://localhost:3000/mediconnect/SearchBy/DoctorId?id=${id}&AppointmentDate=${formattedDate}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            let response = await fetch_Response.json();

            if (response.status === 200) {
                setTimeList(response.DoctorAvailable.Available);
            }
            else if (response.status === 404) {
                alert(response.msg);
            }
            else {
                console.log(response.err);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setDate(date)
    }, [date])

    useEffect(() => {
        if (!selectedDate) return;
        fetch_DoctorData();
    }, [selectedDate]);

    return (
        <div className={styles.mainDiv}>
            {!iSmallScreen && <div className={styles.DoctorInfo_Div}>
                <div className={styles.DoctorProfile}>
                    {(doctorPhoto === "" || doctorPhoto === null)
                        ? <img src={profile} alt="profile" className={styles.DoctorProfile_Image} />
                        : <img src={`data:image/*;base64,${doctorPhoto}`} alt="profile" className={styles.DoctorProfile_Image} />
                    }
                    <div className={styles.DoctorProfile_Detail}>
                        <p>
                            <span>Doctor Name: </span>
                            <span>{doctorName}</span>
                        </p>
                        <p>
                            <span>Specialization: </span>
                            <span>{specialization}</span>
                        </p>
                        <p>
                            <span>Experience: </span>
                            <span>{`${experience} years`}</span>
                        </p>
                        <p>
                            <span>Fee: </span>
                            <span>{fee}</span>
                        </p>
                    </div>
                </div>
            </div>}

            <div className={styles.AppointmentInfo_Div}>
                <div className={styles.AppointmentDate}>
                    <p className={styles.DateLabel}>Appointment Date: </p>
                    <input type="Date" placeholder="Date" max={maxDate} value={selectedDate} onChange={(e) => setDate(e.target.value)} id="Date" className={styles.Date} />
                </div>

                <div className={styles.AppointmentTime}>
                    {timeList.map((item) => (
                        <p
                            key={item._id}
                            className={`
                                ${styles.Time} 
                                ${selectTime === item.time ? styles.TimeSelect : styles.Time}
                                ${(item.Status ? styles.TimeUnclickAble : styles.Time)}
                                `}
                            onClick={() => {
                                if (!item.Status) {
                                    setSelectTime(item.time)
                                }
                                else {
                                    alert("This Appointment Time is Already Booked By Another Patient")
                                }
                            }}>
                            {item.time}
                        </p>
                    ))}
                </div>

                <div className={styles.BookingButtonDiv}>
                    <Link
                        to={"/AppointmentBookingConformation"}
                        replace
                        state={{
                            DoctorName: doctorName,
                            DoctorId: id,
                            DoctorSpecialization: specialization,
                            AppointmentDate: formattedDate,
                            AppointmentTime: selectTime,
                            experience,
                            specialization,
                            date: selectedDate,
                            fee: fee,
                            doctorName: doctorPhoto
                        }
                        }
                    >
                        <button className={styles.BookingButton}>Book</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default DoctorAvailableAndBooking;