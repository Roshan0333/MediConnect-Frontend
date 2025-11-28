import './App.css'
import Navbar from './components/navbar/navbar'
import SideBar from './components/sidebar/sidebar'
import MainComponent from './components/mainComponent//mainComponent';
import AppointmentHistoryComponent from './components/HistoryComponent/AppointmentHistory';
import SignUp from './components/signup/combine/signup'
import Login from './components/login/combine/login';
import ForgetPasswordCombine from './components/forgetPassword/combine';
import OTP from './components/OTP/otp';
import AppointmentBooking from "./components/doctorAvailable/doctorAvailable"
import AppointmentBookingConformation from "./components/AppointmentBooking/Booking"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PreviousDoctors from './components/PreviousDoctor/previousDoctor';
import MedicalReport from './components/MedicalReport/MedicalReport';
import UpcomingAppointment from './components/upcomingAppointment/upcomingAppointment';
import UserProfile from './components/profile/profile';
import UserDetail from './components/userDetail.jsx/userDetail';
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
            <Route path="/Appoinment" element={<UpcomingAppointment />} />
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
