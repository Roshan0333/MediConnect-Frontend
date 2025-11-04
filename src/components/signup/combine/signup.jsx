import SignUpLeft from "../signupLeft/signupLeft";
import SignUpRight from "../../sideComponent/rightPart";
import { motion } from "framer-motion";
import combineStyles from "../../../css/combine.module.css"

function SignUp() {

    return (
        <>
         <div id="signupMain" className={combineStyles.MainDiv}>
                <motion.div
                    className={combineStyles.LeftPart}
                    initial = {{x:2000, opacity:0}}
                    animate = {{x:1, opacity:1}}
                    transition={{duration:5}}
                >
                    <SignUpLeft id="signUpLeftPart"/>
                </motion.div>
               
               <motion.div
               className={combineStyles.RightPart}
                initial = {{x:-2000, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{duration:5}}
               >
                 <SignUpRight id="signUpRightPart" />
               </motion.div>

            </div></>
    )
}

export default SignUp;