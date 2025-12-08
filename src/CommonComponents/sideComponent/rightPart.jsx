import logo from "../../assets/photos/logo.png";
import LowImage from '../../assets/photos/lower.jpg';
import Styles from "./rightPart.module.css";

function RightPart() {
    return (
        <>
            <div id="mainRight" className={Styles.mainRight}> 
                    <div className={Styles.title}>
                        <img src={logo} alt="logo" className={Styles.logo} />
                        <p className={Styles.appName}>MediConnect</p>
                    </div>

                    <div className={Styles.bottom}>
                        <div className={Styles.info}>
                            <h1>Your Health, Our Priority: Seamless Appointments, Effortless Care.</h1>
                        </div>

                        <div className={Styles.paragraph}>
                            <p className={Styles.though}>Revolutionizing health access with easy online bookings and comprehensive patient management</p>
                        </div>

                        <img src={LowImage} className={Styles.lower} alt='image'/>
                    </div>
                </div>
        </>
    )
}


export default RightPart