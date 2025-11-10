import profile from "../../assets/photos/profile.png"
import {FaHome,FaUser,FaCalendar,FaUserMd,FaHistory,FaCog,FaUserPlus, FaFileAlt} from 'react-icons/fa'
import "./sideBar.css"
import {Link} from "react-router-dom"

function Sidebar(){
    return (
        <>
            <div id="mainDiv">
                <div id="top">
                    <img src={profile} alt="profile" className="profileImage"/>
                    <p className="userName">UserName</p>
                </div>
                <div id="bottom">
                    <div className="list">
                        <Link to="/profile" className="listItem"><FaUser/><p className="items">Profile</p></Link>
                        <Link to="/" className="listItem"><FaHome/><p className="items">Home</p></Link>
                        <Link to="/Appointment" className="listItem"><FaCalendar/><p className="items">Appointment</p></Link>
                        <Link to="/Report" className="listItem"><FaFileAlt/><p className="items">Report</p></Link>
                        <Link to="/Doctor" className="listItem"><FaUserMd/><p className="items">Doctor</p></Link>
                        <Link to="/History" className="listItem"><FaHistory/><p className="items">History</p></Link>
                        <Link to="/Setting" className="listItem"><FaCog/><p className="items">Setting</p></Link>
                        <Link to="/Signup" className="listItem"><FaUserPlus/><p className="items">Login/SignUp</p></Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Sidebar;