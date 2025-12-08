import profile from '../../assets/photos/profile.png';
import { Link } from 'react-router-dom';
import './card.css'
import { useEffect, useState } from 'react';

function Card({ info, date }) {

    const [doctorPhoto, setDoctorPhoto] = useState("");

    useEffect(() => {
        ; (
            async () => {
                let fetchResult = await fetch(`http://localhost:3000/mediconnect/doctor/profile/GetDoctorProfileById?doctorId=${info._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                let resultResponse = await fetchResult.json();
                let responseStatus = resultResponse.status;

                if (responseStatus === 500) {
                    console.log(`Error: ${resultResponse.error}`)
                }
                else {
                    setDoctorPhoto(resultResponse.doctorDetail.DoctorPhoto)
                }
            }
        )()
    }, [])

    return (
        <Link
            to={`/AppointmentBooking`}
            state={{
                id: info._id,
                doctorName: info.doctorName,
                specialization: info.specialization,
                experience: info.experience,
                date: date,
                fee: info.fee,
                doctorPhoto: doctorPhoto
            }}
        >
            <div id="mainDiv">
                <div id='cardMain'>

                    {(doctorPhoto === "" || doctorPhoto === null)
                        ? <img src={profile} alt="profile" className="doctorImage" />
                        : <img src={`data:image/*;base64,${doctorPhoto}`} alt="profile" className="doctorImage" />
                    }

                    <p id='doctorName'>{info.doctorName}</p>

                    <div id='specialzation' className='about'>
                        <p>Field:</p>
                        <p className='value'>{info.specialization}</p>
                    </div>

                    <div id="experience" className='about'>
                        <p>Expertise:</p>
                        <p className='value'>{info.experience} years</p>
                    </div>

                    <div id='rating' className='about'>
                        <p>Fee:</p>
                        <p className='value'>{info.fee}</p>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default Card;