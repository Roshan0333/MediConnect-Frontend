import { useState, useEffect } from 'react';
import Profile from "../../assets/photos/profile.png";
import { FaCamera } from "react-icons/fa";
import Styles from '../../css/profile.module.css';

function DoctorProfile() {

    const [profilePhoto, setProfilePhoto] = useState("")
    const [doctorName, setDoctorName] = useState("");
    const [doctorEmail, setDoctorEmail] = useState("");
    const [doctorPhone, setDoctorPhone] = useState();
    const [doctorAge, setDoctorAge] = useState();
    const [doctorSpecialization, setDoctorSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address , setAddress] = useState("");
    const [nearBy, setNearBy]= useState("");

    const fetch_DoctorDetail = async () => {
        let fetchResult = await fetch("http://localhost:3000/mediconnect/doctor/profile/GetDoctorProfile",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })


        let fetchResponse = await fetchResult.json();

        let responseStatus =  fetchResponse.status;

        if(responseStatus === 401){
            alert(responseStatus.msg)
        }
        else if(responseStatus === 500){
            console.log(fetchResponse.error)
        }
        else{
            setProfilePhoto(fetchResponse.profilePhoto);
            setDoctorName(fetchResponse.DoctorName);
            setDoctorEmail(fetchResponse.DoctorEmail);
            setDoctorPhone(fetchResponse.DoctorPhone);
            setDoctorAge(fetchResponse.DoctorAge);
            setDoctorSpecialization(fetchResponse.DoctorSpecialization);
            setExperience(fetchResponse.DoctorExperience);
            setCountry(fetchResponse.Address.Country);
            setZipCode(fetchResponse.Address.PinCode);
            setCity(fetchResponse.Address.City);
            setState(fetchResponse.Address.State);
            setAddress(fetchResponse.Address.Street);
            setNearBy(fetchResponse.Address.NearBy);
        }

    }

    useEffect(() => {
        fetch_DoctorDetail();
    },[])


    return (
        <div>
            <form className={Styles.userprofile_maindiv}>

                <div className={Styles.profileimage_div}>
                    <img src={(profilePhoto == "")?Profile:null} className={Styles.profileimage} alt="Profile Image" />
                    <FaCamera className={Styles.image_edit_icon} />
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Name</label>
                    <p className={Styles.value_field}>{doctorName}</p>
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Email</label>
                    <p className={Styles.value_field} style={{ borderRadius: "0 10px 10px 0" }}>{doctorEmail}</p>
                </div>

                <div className={Styles.multivalue_div}>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>Phone</label>
                        <p className={Styles.value_field}>{doctorPhone}</p>
                    </div>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>Age</label>
                        <p className={Styles.value_field}>{doctorAge}</p> 
                    </div>

                </div>

                <div className={Styles.multivalue_div}>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>Specialization</label>
                        <p className={Styles.value_field}>{doctorSpecialization}</p>
                    </div>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>Experience</label>
                        <p className={Styles.value_field}>{experience}</p>
                    </div>

                </div>

                <div className={Styles.multivalue_div}>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>Pin Code</label>
                        <p className={Styles.value_field}>{zipCode}</p>
                    </div>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>City</label>
                        <p className={`${Styles.value_field} ${Styles.noedit_field}`}>{city}</p>
                    </div>

                </div>

                <div className={Styles.multivalue_div}>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>State</label>
                        <p className={`${Styles.value_field} ${Styles.noedit_field}`}>{state}</p>
                    </div>

                    <div className={Styles.value_div}>
                        <label className={Styles.label_field}>Country</label>
                        <p className={`${Styles.value_field} ${Styles.noedit_field}`}>{country}</p>
                    </div>
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Address</label>
                    <p className={Styles.value_field}>{address}</p>
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>NearBy</label>
                    <p className={Styles.value_field}>{nearBy}</p>
                </div>

            </form>
        </div>
    )
}


export default DoctorProfile;

