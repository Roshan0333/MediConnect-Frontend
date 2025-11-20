import { BsSearch } from "react-icons/bs";
import './mainComponent.css'
import Card from '../card/card'
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";

function MainComponent() {

  let todayDate = new Date().toISOString().split("T")[0];

  let [DoctorList, setDoctorList] = useState([]);
  let [selectedDate, setSelectedDate] = useState(todayDate)
  let [doctorName, setDoctorName] = useState("")
  let [selectedTime, setSelectedTime] = useState("");
  let [specialization, setSpecialization] = useState("");


  const formatDateForApi = (dataStr) => {
    const [year, month, day] = dataStr.split("-");
    return `${day}/${month}/${year}`
  }

  const formatTimeForAPI = (dataStr) => {
    const time =dataStr.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return time.toUpperCase()
  }


  let setUrl = async () => {

    let SearchingUrl = "";

    if (doctorName && specialization && selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/DoctorNameAndSpecializationAndDateAndTime?DoctorName=${doctorName}&Specialization=${specialization}&AppointmentDate=${formatDateForApi(selectedDate)}&AppointmentTime=${formatTimeForAPI(selectedTime)}`);
    }
    else if (doctorName && specialization && !selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/DoctorNameAndSpecializationAndDate?DoctorName=${doctorName}&Specialization=${specialization}&AppointmentDate=${formatDateForApi(selectedDate)}`);
    }
    else if (!doctorName && specialization && selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/SpecializationAndDateAndTime?Specialization=${specialization}&AppointmentDate=${formatDateForApi(selectedDate)}&AppointmentTime=${formatTimeForAPI(selectedTime)}`);
    }
    else if (doctorName && !specialization && selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/DoctorNameAndDateAndTime?DoctorName=${doctorName}&AppointmentDate=${formatDateForApi(selectedDate)}&AppointmentTime=${formatTimeForAPI(selectedTime)}`)
    }
    else if (doctorName && !specialization && !selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/DoctorNameAndDate?DoctorName=${doctorName}&AppointmentDate=${formatDateForApi(selectedDate)}`);
    }
    else if (!doctorName && specialization && !selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/SpecializationAndDate?Specialization=${specialization}&AppointmentDate=${formatDateForApi(selectedDate)}`);
    }
    else if (!doctorName && !specialization && selectedTime) {
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/DateAndTime?AppointmentDate=${formatDateForApi(selectedDate)}&AppointmentTime=${formatTimeForAPI(selectedTime)}`);
    }
    else if(!doctorName && !specialization && !selectedTime){
      SearchingUrl=(`http://localhost:3000/mediconnect/SearchBy/Date?AppointmentDate=${formatDateForApi(selectedDate)}`)
    }

    await SearchingDoctor(SearchingUrl);
  }



  let SearchingDoctor = async (url) => {
    let DoctorList_Fetching = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    let response = await DoctorList_Fetching.json();


    if (response.status === 500) {
      alert(response.error);
    } else if (response.status === 404) {
      alert(response.msg)
    }
    else {
      setDoctorList(response.DoctorAvailableList)
      console.log(DoctorList)
    }
  }


  useEffect(() => {
    const fetchDoctorList = async () => {
      let List = await fetch("http://localhost:3000/mediconnect/doctor/auth/List", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const Data = await List.json();
      console.log(Data);

      setDoctorList(Data.Doctors)

    }

    fetchDoctorList()
  }, [])



  // if(DoctorList.length === 0) {
  //   return <ClipLoader color="#32cd32" size={40} />
  // }

  return (
    <>
      <div id="mainDiv">
        <div id="search">
          <input type="text" placeholder="Search Doctor" id="searchInput" onChange={(e) => setDoctorName(e.target.value)} />
          <BsSearch id="searchIcon" onClick={() => setUrl()} />
        </div>

        <div id="option">
          <select id="doctorType" name="doctorType" onChange={(e) => setSpecialization(e.target.value)}>
            <option value="">Select Doctor Type</option>
            <option value="general">General Physician</option>
            <option value="cardiology">Cardiologist</option>
            <option value="dermatology">Dermatologist</option>
            <option value="neurology">Neurologist</option>
            <option value="orthopedics">Orthopedic Surgeon</option>
            <option value="pediatrics">Pediatrician</option>
            <option value="psychiatry">Psychiatrist</option>
            <option value="radiology">Radiologist</option>
            <option value="gastroenterology">Gastroenterologist</option>
            <option value="urology">Urologist</option>
            <option value="ophthalmology">Ophthalmologist</option>
          </select>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              className="pickerBox"
              label="Select Time"
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue)}
              ampm
              renderInput={(params) => <TextField {...params} className="pickerOverride" />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              className="pickerBox"
              label='Select Date'
              value={selectedDate ? new Date(selectedDate) : null}
              onChange={(newDate) => {
                if (newDate) {
                  const onlyDate = newDate.toISOString().split("T")[0];
                  setSelectedDate(onlyDate);
                }
              }}
              renderInput={(params) => <TextField {...params} className="pickerOverride" />}
            />
          </LocalizationProvider>
        </div>

        <div id="cardDiv">
          {Object.values(DoctorList).map((ele, index) => {
            return <Card className="card" info={ele} key={index}  date = {selectedDate}/>
          })}
        </div>
      </div>
    </>
  )
}

export default MainComponent;