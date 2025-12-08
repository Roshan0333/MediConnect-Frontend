import OtpLeft from "./otpLeft";
import OtpRight from '../sideComponent/rightPart'
import CombineStyle from "../../css/combine.module.css"

function OTP() {
    return (
        <>
            <div className={CombineStyle.MainDiv}>
                <OtpRight className={CombineStyle.RightPart}/>
                <OtpLeft className={CombineStyle.LeftPart}/>
            </div>
        </>
    )
}


export default OTP;