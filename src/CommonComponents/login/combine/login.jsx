import RightPart from "../../sideComponent/rightPart.jsx";
import LeftPart from "../leftPart/leftPart";
import combineStyles from "../../../css/combine.module.css";
import { motion } from 'framer-motion';
import { useMediaQuery } from "react-responsive";


function Login() {

    let mobileScreenSize = useMediaQuery({ maxWidth: "426px" })

    return (
        <>
            <div id="maindiv" className={combineStyles.MainDiv}>
                {!mobileScreenSize && <motion.div
                    id="rightPart"
                    className={combineStyles.RightPart}
                    initial={{ x: 2000, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 5 }}
                >
                    <RightPart />
                </motion.div>}

                <motion.div
                    id="leftPart"
                    className={combineStyles.LeftPart}
                    initial={{ x: -2000, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 5 }}>
                    <LeftPart />
                </motion.div>
            </div>
        </>
    )
}




export default Login;