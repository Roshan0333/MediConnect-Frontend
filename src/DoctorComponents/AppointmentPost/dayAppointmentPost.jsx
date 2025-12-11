import { Switch } from '@mui/material';
import TimeCard from './timeCard';
import { useEffect, useState } from 'react';
import Styles from "./appointmentPost.module.css"

function DayAppointmentPost({ date, urlType }) {

    let [checked, setChecked] = useState(false);

    let [buttonType, setButtonType] = useState(urlType);

    let [reload, setReload] = useState(false)

    let [deleteButtonFlag, setDeleteButtonFlag] = useState(true);

    let [appointmentSlots, setAppointmentStatus] = useState([])

    let regularAppointmentSlots = [
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
    ]


    const postWeeklyAppointment = async () => {
        try {
            const fetchResult = await fetch("http://localhost:3000/mediconnect/doctor/available/AddAvailable", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Date: date,
                    AvailableArray: appointmentSlots
                }),
                credentials: "include"
            })

            const fetchResponse = await fetchResult.json();

            const responseStatus = fetchResponse.status;

            if (responseStatus === 500) {
                console.log(`Error: ${fetchResponse.error}`);
            }
            else if (responseStatus === 404) {
                alert(resultResponse.msg)
            }
            else {
                alert(`Message: ${fetchResponse.msg}`);
                setReload(prev => !prev);;
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const editWeeklyAppointment = async () => {

        try {
            const fetchResult = await fetch("http://localhost:3000/mediconnect/doctor/available/EditTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Date: date,
                    AvailableTimeArray: appointmentSlots
                }),
                credentials: "include"
            });

            const fetchResponse = await fetchResult.json();
            const responseStatus = fetchResponse.status;

            if (responseStatus === 500) {
                console.log(`Error: ${fetchResponse.error}`)
            }
            else if (responseStatus === 404) {
                alert(resultResponse.msg)
            }
            else {
                alert(`Message: ${fetchResponse.msg}`)
                setReload(prev => !prev);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteDateAppointment = async () => {
        try {
            let fetchResult = await fetch("http://localhost:3000/mediconnect/doctor/available/DeleteDate", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Date: date
                }),
                credentials: "include"
            })

            let resultResponse = await fetchResult.json()

            let responseStatus = resultResponse.status;

            if (responseStatus === 500) {
                console.log(`Error: ${resultResponse.error}`)
            }
            else if (responseStatus === 404) {
                alert(resultResponse.msg)
            }
            else {
                alert(resultResponse.msg)
                setReload(prev => !prev);
                setAppointmentStatus[regularAppointmentSlots]
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const getWeeklyAppointment = async () => {
        try {
            let fetchResult = await fetch(`http://localhost:3000/mediconnect/doctor/available/GetAvailable?availableDate=${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            let resultResponse = await fetchResult.json()

            let responseStatus = resultResponse.status;

            if (responseStatus === 500) {
                console.log(`Error: ${resultResponse.error}`)
            }
            else if (responseStatus === 404) {
                setButtonType("Post")
            }
            else {
                const backendStatus = resultResponse.AvailableDetail.DoctorAvailable_Array[0].Available;
                setButtonType("Edit");
                setAppointmentStatus(prev =>
                    prev.map((slot, index) => ({
                        ...slot,
                        Status: backendStatus[index].Status
                    }))
                );

                backendStatus.filter(item => {
                    if (item.Status !== false) {
                        setDeleteButtonFlag(false)
                    }
                })

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    let deleteSlot = (index) => {
        setAppointmentStatus(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                Status: !updated[index].Status
            };
            return updated;
        });
    }


    let switchChange = () => {
        setChecked(checked = !checked);
    }

    useEffect(() => {
        setAppointmentStatus(regularAppointmentSlots);
        getWeeklyAppointment()
    }, [])

    useEffect(() => {
        setAppointmentStatus(regularAppointmentSlots);
        getWeeklyAppointment()
    }, [reload])

    return (
        <div className={Styles.dayAppointmentMainDiv}>
            <div className={Styles.dayAppointment_TopPart}>
                <div className={`${Styles.dayAppointment_TopSubPart} ${Styles.dateDiv}`}>
                    <p>Date:</p>
                    <p>{date}</p>
                </div>
                <div className={`${Styles.dayAppointment_TopSubPart} ${Styles.rightSide}`}>
                    <Switch onClick={() => {
                        switchChange();
                    }} />
                    {(buttonType === "Post")
                        ? <button className={Styles.postButton}
                            onClick={() => {
                                if (checked) {
                                    postWeeklyAppointment()
                                }
                                else {
                                    alert("Please on the Switch")
                                }
                            }}>Post</button>
                        : <div className={Styles.multipleButtonDiv}>
                            <button className={Styles.editButton} onClick={() => {
                                if (checked) {
                                    editWeeklyAppointment()
                                }
                                else {
                                    alert("Please on the Switch")
                                }
                            }}>Edit</button>
                            {deleteButtonFlag && <button className={Styles.deleteButton} onClick={() => {
                                if (checked) {
                                    deleteDateAppointment()
                                }
                                else {
                                    alert("Please on the Switch")
                                }
                            }}>Delete</button>}
                        </div>}
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