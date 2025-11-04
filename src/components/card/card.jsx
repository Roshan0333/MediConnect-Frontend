import profile from '../../assets/photos/profile.png';
import { Link } from 'react-router-dom';
import './card.css'

function Card({info,date}) {

    return (
        <Link 
            to={`/AppointmentBooking`}
            state={{
                id:info._id,
                doctorName:info.doctorName,
                specialization:info.specialization,
                experience:info.experience,
                date:date,
                fee:info.fee
            }}
        >
            <div id="mainDiv">
                <div id='cardMain'>

                    <img src={profile} className='doctorImage' alt="doctor profile"/>

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