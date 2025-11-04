import RightPart from "../sideComponent/rightPart";
import ForgetPassword from "./forgetPassword";
import combineStyle from "../../css/combine.module.css"

function ForgetPasswordCombine() {
    return (
        <>
            <div className={combineStyle.MainDiv}>
                <RightPart className={combineStyle.RightPart}/>
                <ForgetPassword className={combineStyle.LeftPart}/>
            </div>
        </>
    )
}

export default ForgetPasswordCombine;