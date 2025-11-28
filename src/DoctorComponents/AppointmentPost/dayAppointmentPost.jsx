import { Switch } from '@mui/material';
import TimeCard from './timeCard';
import { useEffect, useState } from 'react';
import Styles from "./appointmentPost.module.css"

function DayAppointmentPost({ date, urlType }) {

    let [checked, setChecked] = useState(false)

    let [appointmentSlots, setAppointmentStatus] = useState([
        { time: "10:00 AM", Status: false },
        { time: "10:30 AM", Status: false },
        { time: "11:00 AM", Status: false },
        { time: "11:30 AM", Status: false },
        { time: "12:00 PM", Status: false },
        { time: "12:30 PM", Status: false },
        { time: "01:00 PM", Status: false },
        { time: "01:30 PM", Status: false },
        { time: "03:00 PM", Status: false },
        { time: "03:30 PM", Status: false },
        { time: "04:00 PM", Status: false },
        { time: "04:30 PM", Status: false },
        { time: "05:00 PM", Status: false },
        { time: "05:30 PM", Status: false },
        { time: "06:00 PM", Status: false },
    ])


    const postWeeklyAppointment = async () => {
        const fetchResult = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {},
            credentials: "include"
        })

        const fetchResponse = await fetchResult.json();

        const responseStatus = fetchResponse.status;

        if (responseStatus === 500) {
            console.log(`Error: ${fetchResponse.error}`);
        }
        else {
            alert(`Message: ${fetchResponse.msg}`);
        }
    }

    const editWeeklyAppointment = async () => {
        const fetchResult = await fetch("", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: {},
            credentials: "include"
        });

        const fetchResponse = await fetchResult.json();
        const responseStatus = fetchResponse.status;

        if (responseStatus === 500) {
            console.log(`Error: ${fetchResponse.error}`)
        }
        else {
            alert(`Message: ${fetchResponse.msg}`)
        }
    }


    let deleteSlot = (index) => {
        appointmentSlots[index].Status = !appointmentSlots[index].Status;
        console.log(appointmentSlots);
    }


    let switchChange = () => {
        setChecked(checked = !checked);
    }



    useEffect(() => {

    }, [appointmentSlots])

    return (
        <div className={Styles.dayAppointmentMainDiv}>
            <div className={Styles.dayAppointment_TopPart}>
                <div className={Styles.dayAppointment_TopSubPart}>
                    <p>Date:</p>
                    <p>{date}</p>
                </div>
                <div className={`${Styles.dayAppointment_TopSubPart} ${Styles.rightSide}`}>
                    <Switch onClick={() => {
                        switchChange();
                    }} />
                    {(urlType === "Post") ? <button className={Styles.postButton} onClick={() => postWeeklyAppointment()}>Post</button> : <button className={Styles.postButton} onClick={() => { () => editWeeklyAppointment() }}>Edit</button>}
                </div>
            </div>

            <div className={Styles.dayAppointment_SecondPart}>
                {appointmentSlots.map((time, index) => {
                    return <TimeCard data={time} key={index} slotIndex={index} deleteFunction={deleteSlot} switchValue={checked} />
                })}
            </div>
        </div>
    )
}

export default DayAppointmentPost;