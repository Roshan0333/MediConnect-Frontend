function PatientCard({data}) {
    return (
        <div>
            <div>
                <p>Patient Name:</p>
                <p>{data.PatientName}</p>
            </div>

            <div>
                <p>Appointment Date:</p>
                <p>{data.AppointmentDate}</p>
            </div>

            <div>
                <p>Appointment Time:</p>
                <p>{data.AppointmentTIme}</p>
            </div>
        </div>
    )
}

export default PatientCard;