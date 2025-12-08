import SignUpLeft from "../signupLeft/signupLeft";
import SignUpRight from "../../../CommonComponents/sideComponent/rightPart";
import { motion } from "framer-motion";
import combineStyles from "../../../css/combine.module.css"
import { useMediaQuery } from "react-responsive";

function SignUp() {

    let mobileScreenSize = useMediaQuery({maxWidth:"426px"})

    return (
        <>
         <div id="signupMain" className={combineStyles.MainDiv}>
                <motion.div
                    className={combineStyles.LeftPart}
                    initial = {{x:2000, opacity:0}}
                    animate = {{x:1, opacity:1}}
                    transition={{duration:5}}
                    style={{ position: "relative", overflow: "hidden" }}
                >
                    <SignUpLeft id="signUpLeftPart"/>
                </motion.div>
               
               {!mobileScreenSize && <motion.div
               className={combineStyles.RightPart}
                initial = {{x:-2000, opacity:0}}
                animate={{x:0, opacity:1}}
                transition={{duration:5}}
                style={{ position: "relative", overflow: "hidden" }}
               >
                 <SignUpRight id="signUpRightPart" />
               </motion.div>}

            </div></>
    )
}

export default SignUp;