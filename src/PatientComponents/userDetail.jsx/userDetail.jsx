import { useState, useRef, useEffect } from "react";
import { FaCamera, FaCheck } from "react-icons/fa";
import Profile from "../../assets/photos/profile.png";
import Styles from "../../css/profile.module.css";
import {useLocation, useNavigate } from "react-router-dom";

function UserDetail() {

    let location = useLocation()
    let Navigator = useNavigate();
    const { name, email } = location.state || {};

    const [flag, setFlag] = useState(false);

    const [selectedImage, setSelectedImage] = useState("");
    const [ProfilePhoto, setProfilePhoto] = useState(null)
    const [userName, setUserName] = useState(name);
    const [userEmail, setEmail] = useState(email);
    const [userPhone, setUserPhone] = useState("")
    const [userAge, setUserAge] = useState("");
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
                setCity(fetchResponse.data.PostOffice[0].Circle)
                setState(fetchResponse.data.PostOffice[0].State)
                console.log(fetchResponse)
            }
        }
        catch (err) {
            console.log(err)
        }

    }


    const post_UserDetail = async () => {
        const formData = new FormData();

        formData.append("ProfilePhoto",ProfilePhoto);
        formData.append("age", userAge);
        formData.append("phone", userPhone);
        formData.append("street", address);
        formData.append("nearby", nearBy);
        formData.append("pincode", zipCode);
        formData.append("city", city);
        formData.append("state", state);

        let fetchResult = await fetch("http://localhost:3000/mediconnect/user/userprofile/UserProfile", {
            method: "POST",
            body: formData,
            credentials: "include"
        })

        let fetchResponse = await fetchResult.json();

        if (fetchResponse.status === 500) {
            console.log(`Error: ${fetchResponse.error}`)
        }
        else {
            if (!flag) {
                console.log("hi")
                Navigator("/", { replace: true })
            }
            else {
                alert(fetchResponse.msg);
                console.log("hi2")
                Navigator("/", { replace: true })
            }
        }
    }

    useEffect(() => {
        console.log(selectedImage)
    }, [selectedImage])

    return (
        <form className={Styles.userprofile_maindiv}>

            <div className={Styles.profileimage_div} >
                {
                    selectedImage !== ""
                        ? <img src={selectedImage} className={Styles.profileimage} alt="Profile" />
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
                        setProfilePhoto(file)

                    }}
                />
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Name</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>Email</label>
                <p className={Styles.value_field} style={{ borderRadius: "0 10px 10px 0" }} onChange={(e) => setEmail(e.target.value)}>{userEmail}</p>
            </div>

            <div className={Styles.multivalue_div}>
                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Phone</label>
                    <input type="phone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />
                </div>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Age</label>
                    <input type="Number" max={150} value={userAge} onChange={(e) => setUserAge(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />
                </div>
            </div>

            <div className={Styles.pinCodeLocationDiv}>

                <div className={Styles.value_div}>
                    <label className={Styles.label_field}>Pin Code</label>
                    <input type="Number" max={999999} value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />
                    <FaCheck className={Styles.zipCheck} onClick={() => fetch_CityAndState()} />
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
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />
            </div>

            <div className={Styles.value_div}>
                <label className={Styles.label_field}>NearBy</label>
                <input type="text" value={nearBy} onChange={(e) => setNearBy(e.target.value)} className={`${Styles.value_field} ${Styles.input_field}`} />
            </div>

            <div>
                <button type="Button" className={Styles.skip_button} onClick={() => {
                    post_UserDetail()
                    setFlag(prev = !prev)
                }}>Skip</button>
                <button type="Button" onClick={() => post_UserDetail()} className={Styles.submit_button}>Submit</button>
            </div>
        </form>
    )
}


export default UserDetail;