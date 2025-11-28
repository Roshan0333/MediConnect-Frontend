import profile from "../../assets/photos/profile.png"
import { FaHome, FaUser, FaCalendar, FaUserMd, FaHistory, FaCog, FaUserPlus, FaFileAlt, FaSignOutAlt } from 'react-icons/fa'
import "./sideBar.css"
import { Link } from "react-router-dom"

function Sidebar() {

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
            localStorage.clear()
        }
    }

    const userType = localStorage.getItem("UserType")

    return (
        <>
            <div id="sideBarMainDiv">
                <div id="top">
                    <img src={profile} alt="profile" className="profileImage" />
                    <p className="userName">UserName</p>
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