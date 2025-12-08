import Styles from "./HistoryComponent.module.css"

function HistoryCard({info}) {
    return (
        <div className={Styles.Card}>
            <div className={Styles.dataField}>
                <label>Doctor Name: </label>
                <p className={Styles.ApiData}>{info.DoctorName}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Specialzation :</label>
                <p className={Styles.ApiData}>{info.Specialzation}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Date :</label>
                <p className={Styles.ApiData}>{info.AppointmentDate}</p>
            </div>
            <div className={Styles.dataField}>
                <label>Time :</label>
                <p className={Styles.ApiData}>{info.AppointmentTime}</p>
            </div>

            <div className={Styles.dataField}>
                <label>Appointment Status :</label>
                <p className={Styles.ApiData}>{info.AppointmentStatus}</p>
            </div>
            
            <div className={Styles.dataField}>
                <label>Payment Status :</label>
                <p className={Styles.ApiData}>{(info.PaymentStatus === "false")? "Pay Now": "Payed"}</p>
            </div>
        </div>
    )
}

export default HistoryCard;