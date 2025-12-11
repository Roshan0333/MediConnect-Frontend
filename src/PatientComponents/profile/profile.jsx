import { useEffect, useState, useRef } from "react";
import { FaPen, FaCamera, FaCheck } from "react-icons/fa";
import Profile from "../../assets/photos/profile.png";
import Styles from "../../css/profile.module.css";

function UserProfile() {

    const [flag, setFlag] = useState(false);
    const [zipCodeFlag, setZipCodeFlag] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [updatePhotoData, setUpdatePhotoData] = useState(null)
    const [userName, setUserName] = useState("");
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [nearBy, setNearBy] = useState("");

    const fileInputRef = useRef(null);

    const openGallery = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };



    const fetch_CityAndState = async () => {
        try {
            let fetchResult = await fetch(`http://localhost:3000/mediconnect/zipCode/pinCode?pin=${zipCode}`, {
                method: "GET"
            })

            let fetchResponse = await fetchResult.json();

            let responseStatus = fetchResponse.status;

            if (responseStatus === 500) {
                console.log(`Error; ${fetchResponse.error}`)
            }
            else if (responseStatus === 404) {
                alert(fetchResponse.msg)
            }
            else {
                setCity(fetchResponse.PostOffice[0].Circle)
                setState(fetchResponse.PostOffice[0].State)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const fetch_UserDetail = async () => {
        let fetchResult = await fetch("http://localhost:3000/mediconnect/user/userprofile/GetUserProfile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        let fetchResponse = await fetchResult.json();

        let responseStatus = fetchResponse.status;

        if (responseStatus === 500) {
            console.log(`Error: ${fetchResponse.error}`)
        }
        else if (responseStatus === 401) {
            alert("Please Login Your Account")
        }
        else {
            let userDetail = fetchResponse.userDetail;

            setProfilePhoto(userDetail.ProfilePhoto);
            setUserName(userDetail.UserName);
            setEmail(userDetail.UserEmail);
            setPhone(userDetail.Phone);
            setAge(userDetail.UserAge)
            setZipCode(userDetail.Address.PinCode);
            setCity(userDetail.Address.City);
            setState(userDetail.Address.State);
            setAddress(userDetail.Address.StreetName);
            setNearBy(userDetail.Address.NearBy)
        }
    }

    const update_UserDetail = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("ProfilePhoto",updatePhotoData);
        formData.append("age", age);
        formData.append("phone", phone);
        formData.append("street", address);
        formData.append("nearby", nearBy);
        formData.append("pincode", zipCode);
        formData.append("city", city);
        formData.append("state", state);

        let fetchResult = await fetch("http://localhost:3000/mediconnect/user/userprofile/UserProfile", {
            method: "PUT",
            body: formData,
            credentials: "include"
        })

        const fetchResponse = await fetchResult.json();

        const responseStatus = fetchResponse.status;

        if (responseStatus === 401) {
            alert(fetchResponse.msg)
        }
        else if (fetchResponse === 500) {
            console.log(fetchResponse.error)
        }
        else {
            alert(fetchResponse.msg)
        }
    }


    useEffect(() => {
        fetch_UserDetail()
    }, [])

    useEffect(() => {
    }, [selectedImage])

    return (
        <form className={Styles.userprofile_maindiv}>

            <div className={Styles.profileimage_div} >
                {
                    selectedImage !== ""
                        ? <img src={selectedImage} className={Styles.profileimage} alt="Profile" />
                        : (profilePhoto !== "" && profilePhoto !== null)
                            ? <img src={`data:image/*;base64,${profilePhoto}`} className={Styles.profileimage} alt="Profile" />
                            : <img src={Profile} className={Styles.profileimage} alt="Profile" />
                }
                <FaCamera className={`${Styles.image_edit_icon} pointer`}
                    onClick={openGallery}
                    style={{ cursor: "pointer", zIndex: 9999, pointerEvents: "auto" }} />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                        let file = e.target.files[0]
                        const imagePath = URL.createObjectURL(file);
                        setSelectedImage(imagePath)
                        setUpdatePhotoData(file)
                        
                    }}
                />
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Name</label>
                {(!flag) ? <p className={Styles.value_field}>{userName}</p> : <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />}
                {(!flag) ? <FaPen className={Styles.edit_value} onClick={() => setFlag(true)} /> : null}
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Email</label>
                <p className={Styles.value_field} style={{ borderRadius: "0 10px 10px 0" }}>{email}</p>
            </div>

            <div className={Styles.multivalue_div}>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Phone</label>
                    {(!flag) ? <p className={Styles.value_field}>{phone}</p> : <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />}
                    {(!flag) ? <FaPen className={Styles.edit_value} onClick={() => setFlag(true)} /> : null}
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Age</label>
                    {(!flag) ? <p className={Styles.value_field}>{age}</p> : <input type="Number" max={150} value={age} onChange={(e) => setAge(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />}
                    {(!flag) ? <FaPen className={Styles.edit_value} onClick={() => setFlag(true)} /> : null}
                </div>
            </div>

            <div className={Styles.pinCodeLocationDiv}>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Pin Code</label>
                    {(!zipCodeFlag) ? <p className={Styles.value_field}>{zipCode}</p> : <input type="Number" max={999999} value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />}
                    {(!zipCodeFlag) ? <FaPen className={Styles.edit_value} onClick={() => setZipCodeFlag(prev => !prev)} /> : <FaCheck className={Styles.zipCheck} onClick={() => fetch_CityAndState()} />}
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>City</label>
                    <p className={`${Styles.value_field} ${Styles.noedit_field}`}>{city}</p>
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>State</label>
                    <p className={`${Styles.value_field} ${Styles.noedit_field}`}>{state}</p>
                </div>

            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Address</label>
                {(!flag) ? <p className={Styles.value_field}>{address}</p> : <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />}
                {(!flag) ? <FaPen className={Styles.edit_value} onClick={() => setFlag(true)} /> : null}
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>NearBy</label>
                {(!flag) ? <p className={Styles.value_field}>{nearBy}</p> : <input type="text" value={nearBy} onChange={(e) => setNearBy(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />}
                {(!flag) ? <FaPen className={Styles.edit_value} onClick={() => setFlag(true)} /> : null}
            </div>

            {(flag || zipCodeFlag) ? <input type="submit" className={Styles.submit_button} onClick={(e) => update_UserDetail(e)} /> : null}
        </form>
    )
}


export default UserProfile;