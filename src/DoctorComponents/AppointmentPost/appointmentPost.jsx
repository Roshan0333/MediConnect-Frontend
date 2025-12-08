import { useEffect, useState } from "react";
import DayAppointmentPost from "./dayAppointmentPost";
import Styles from "./appointmentPost.module.css"

function AppoiontmentPost() {

    let [weekDates, setWeekDates] = useState([]);
    let [url, setUrl] = useState("Edit");

    let date = new Date();

    useEffect(() => {
        let timeStamp = [];
        let dateArray = [];
        let today = date.getDay();


        let currentTime = date.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit',  
            hour12: true
        })

        for (let i = 0; i <= 7 - today; i++) {
            let todayDate = new Date();
            timeStamp.push(todayDate.setDate(date.getDate() + i))

        }


        for (let i = 0; i < timeStamp.length; i++) {
            let date = new Date(timeStamp[i]);
            let dates = date.toISOString().split('T')[0]
            let [year, month, day] = dates.split("-")
            dateArray.push(`${day}/${month}/${year}`)
        }


        if (today === 1 && currentTime >= "12:00 PM") {
            setUrl("Post")
        }

        setWeekDates(dateArray);
    }, [])

    useEffect(() => {

    }, [weekDates])

    return (
        <div className={Styles.mainDiv}>
            <div>
                {weekDates.map((data, index) => {
                    return <DayAppointmentPost key={index} date={data} urlType={url} />
                })}
            </div>
        </div>
    )
}

export default AppoiontmentPost;