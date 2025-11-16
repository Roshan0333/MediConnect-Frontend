import { useState } from "react";
import {FaPen, FaCamera, FaCheck} from "react-icons/fa";
import Profile from "../../assets/photos/profile.png";
import Styles from "../../css/profile.module.css";

function UserProfile (){

    const [flag, setFlag] = useState(false);
    const [zipCodeFlag, setZipCodeFlag] = useState(false);

    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState("");
    const [zipCode, setZipCode] = useState();
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [nearBy, setNearBy] = useState("");


    const fetch_CityAndState = async () => {
        let fetchResult = await fetch(`http://www.postalpincode.in/api/pincode/${zipCode}`,{
            method:"GET"
        })

        let fetchResponse = await fetchResult.json();

        console.log(fetchResponse);
    }

    const fetch_UserDetail = async () => {
        let fetchResult = await fetch("", {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });

        let fetchResponse = await fetchResult.json();

        let responseStatus = fetchResponse.status;

        if(responseStatus === 500){
            console.log(`Error: ${fetchResponse.error}`)
        }
        else{
            let userDetail = fetchResponse.userDetail;

            setUserName(userDetail.UserName);
            setEmail(userDetail.UserEmail);
            setZipCode(userDetail.Address.PinCode);
            setCity(userDetail.Address.City);
            setState(userDetail.Address.State);
            setAddress(userDetail.Address.StreetName);
        }
    }

    return (
        <form className={Styles.userprofile_maindiv}>

            <div className={Styles.profileimage_div}>
                <img src={Profile} className={Styles.profileimage} alt="Profile Image"/>
                <FaCamera className={Styles.image_edit_icon}/>
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Name</label>
                {(!flag)?<p className={Styles.value_field}>{userName}</p>:<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}` }/>}
                {(!flag)?<FaPen className={Styles.edit_value} onClick={() => setFlag(true)}/>:null}
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Email</label>
               <p className={Styles.value_field} style={{borderRadius: "0 10px 10px 0"}}>{email}</p>
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Phone</label>
                {(!flag)?<p className={Styles.value_field}>{phone}</p>:<input type="phone" onChange={(e) => setPhone(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`}/>}
                {(!flag)?<FaPen className={Styles.edit_value} onClick={() => setFlag(true)}/>:null}
            </div>

            <div className={Styles.pincode_city_state_div}>

                 <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Pin Code</label>
                    {(!zipCodeFlag)?<p className={Styles.value_field}>{zipCode}</p>:<input type="Number" max={999999}  onChange={(e) => setZipCode(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}` }/>}
                    {(!zipCodeFlag)?<FaPen className={Styles.edit_value} onClick={() => setZipCodeFlag(true)}/>:<FaCheck className={Styles.zipCheck} onChange={fetch_CityAndState()}/>}
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>City</label>
                   <p className={`${Styles.value_field } ${Styles.noedit_field}`}>{city}</p>
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>State</label>
                    <p className={`${Styles.value_field } ${Styles.noedit_field}`}>{state}</p>
                </div>

            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Address</label>
                {(!flag)?<p className={Styles.value_field}>{address}</p>:<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}` }/>}
                {(!flag)?<FaPen className={Styles.edit_value} onClick={() => setFlag(true)}/>:null}
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>NearBy</label>
                {(!flag)?<p className={Styles.value_field}>{nearBy}</p>:<input type="text" value={nearBy} onChange={(e) => setNearBy(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}` }/>}
                {(!flag)?<FaPen className={Styles.edit_value} onClick={() => setFlag(true)}/>:null}
            </div>

            {(flag || zipCodeFlag)?<input type="submit" className={Styles.submit_button}/>:null}
        </form>
    )
}


export default UserProfile;