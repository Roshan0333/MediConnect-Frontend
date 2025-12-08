import './App.css'
import Navbar from './CommonComponents/navbar/navbar'
import SideBar from './CommonComponents/sidebar/sidebar'
import MainComponent from './CommonComponents/mainComponent/mainComponent';
import AppointmentHistoryComponent from './CommonComponents/HistoryComponent/AppointmentHistory';
import SignUp from './PatientComponents/signup/combine/signup'
import Login from './CommonComponents/login/combine/login';
import ForgetPasswordCombine from './CommonComponents/forgetPassword/combine';
import OTP from './CommonComponents/OTP/otp';
import AppointmentBooking from "./PatientComponents/doctorAvailable/doctorAvailable"
import AppointmentBookingConformation from "./PatientComponents/AppointmentBooking/Booking"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PreviousDoctors from './PatientComponents/PreviousDoctor/previousDoctor';
import MedicalReport from './CommonComponents/MedicalReport/MedicalReport';
import UpcomingAppointment from './PatientComponents/upcomingAppointment/upcomingAppointment';
import UserProfile from './PatientComponents/profile/profile';
import UserDetail from './PatientComponents/userDetail.jsx/userDetail';
import DoctorHome from './DoctorComponents/DoctorHome/DoctorHome';
import DoctorProfile from './DoctorComponents/DoctorProfile/DoctorProfile';
import AppoiontmentPost from './DoctorComponents/AppointmentPost/appointmentPost';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ForgetPassword' element={<ForgetPasswordCombine />} />
          <Route path='/Otp' element={<OTP />} />
          <Route path='/*' element={<Layout />} />
        </Routes>
      </Router>
    </>
  )
}

function Layout() {

  const location = useLocation();  // <-- get current location
  const isAppointmentPage = location.pathname === '/AppointmentBooking';

  let userType = localStorage.getItem("UserType");


  return (
    <>
      <Navbar id="navbar" />
      <div id='secondLayer' style={{ display: 'flex' }}>
        {(!isAppointmentPage) ? <div id='sidebar'><SideBar id="sideBar" /></div> : null}
        <div id='mainComponent' className={(!isAppointmentPage) ? "mainComponent" : "fullWidth_mainComponent"}>
          <Routes>
            <Route path='/' element={(userType === "Doctor") ? <DoctorHome /> : <MainComponent />} />
            <Route path='/AppointmentBooking' element={<AppointmentBooking />} />
            <Route path='/AppointmentBookingConformation' element={<AppointmentBookingConformation />} />
            <Route path="/UserDetail" element={<UserDetail />} />
            <Route path="/Profile" element={(userType === "Doctor") ? <DoctorProfile /> : <UserProfile />} />
            <Route path="/Appointment" element={<UpcomingAppointment/>} />
            <Route path='/Report' element={<MedicalReport />} />
            <Route path="/Doctor" element={<PreviousDoctors />} />
            <Route path="/AppointmentPost" element={<AppoiontmentPost />} />
            <Route path='/History' element={<AppointmentHistoryComponent />} />
            <Route path='/Setting' />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
