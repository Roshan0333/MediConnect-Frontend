import profile from "../../assets/photos/profile.png"
import { FaHome, FaUser, FaCalendar, FaUserMd, FaHistory, FaCog, FaUserPlus, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'
import "./sideBar.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {

    const userType = localStorage.getItem("UserType");
    const [userName, setUserName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const [signoutFlag, setSignoutFlag] = useState(false)

    const SignOut = async () => {
        let fetchResult = await fetch("http://localhost:3000/mediconnect/signout", {
            method: "POST",
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
        else {
            alert(fetchResponse.msg)
            setSignoutFlag(prev => !prev)
            localStorage.clear()
        }
    }

    const fetch_UserDetail = async () => {
        let fetchResult = await fetch((userType === "Doctor") ? "http://localhost:3000/mediconnect/doctor/profile/GetDoctorProfile" : "http://localhost:3000/mediconnect/user/userprofile/GetUserProfile", {
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
            // alert("Please Login Your Account")
        }
        else {
            let userDetail = (userType === "Doctor") ? fetchResponse.doctorDetail : fetchResponse.userDetail;

            if (!userDetail) {
                setProfilePhoto("");
                setUserName("");
                return;
            }

            if (userType === "Doctor") {
                setProfilePhoto(userDetail.DoctorPhoto);
                setUserName(userDetail.DoctorName);
            }
            else {
                setProfilePhoto(userDetail.ProfilePhoto);
                setUserName(userDetail.UserName);
            }

        }
    }

    useEffect(() => {
        fetch_UserDetail()
    }, [])

    useEffect(() => {
    }, [signoutFlag])

    return (
        <>
            <div id="sideBarMainDiv">
                <div id="top">
                    {(profilePhoto === "" || profilePhoto === null)
                        ? <img src={profile} alt="profile" className="profileImage" />
                        : <img src={`data:image/*;base64,${profilePhoto}`} alt="profile" className="profileImage" />}
                    {(userName === "") ? <p className="userName">UserName</p> : <p className="userName">{userName}</p>}
                </div>
                <div id="bottom">
                    <div className="list">
                        <Link to="/Profile" className="listItem"><FaUser /><p className="items">Profile</p></Link>
                        <Link to="/" className="listItem"><FaHome /><p className="items">Home</p></Link>
                        <Link to="/Appointment" className="listItem"><FaCalendar /><p className="items">Appointment</p></Link>
                        <Link to="/Report" className="listItem"><FaFileAlt /><p className="items">Report</p></Link>
                        {(userType === "Doctor") ? <Link to="/AppointmentPost" className="listItem"><FaUserMd /><p className="items">Appointment Post</p></Link> :
                            <Link to="/Doctor" className="listItem"><FaUserMd /><p className="items">Doctor</p></Link>
                        }
                        <Link to="/History" className="listItem"><FaHistory /><p className="items">History</p></Link>
                        <Link to="/Setting" className="listItem"><FaCog /><p className="items">Setting</p></Link>
                        <Link to="/Signup" className="listItem"><FaUserPlus /><p className="items">Login/SignUp</p></Link>
                        <div className="listItem" onClick={() => SignOut()}><FaSignOutAlt /><p className="items">Signout</p></div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Sidebar;