import RightPart from "../sideComponent/rightPart";
import ForgetPassword from "./forgetPassword";
import combineStyle from "../../css/combine.module.css"
import { useMediaQuery } from "react-responsive";

function ForgetPasswordCombine() {

    let mobileScreenSize = useMediaQuery({ maxWidth: "426px" })

    return (
        <>
            <div className={combineStyle.MainDiv}>
                {!mobileScreenSize && <RightPart className={combineStyle.RightPart} />}
                <ForgetPassword className={combineStyle.LeftPart} />
            </div>
        </>
    )
}

export default ForgetPasswordCombine;