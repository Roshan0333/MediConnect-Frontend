import RightPart from "../../sideComponent/rightPart.jsx";
import LeftPart from "../leftPart/leftPart";
import combineStyles from "../../../css/combine.module.css";
import { motion } from 'framer-motion'


function Login() {

    // const [routeFlag, setRouteFlag] = useState("Login")

    return (
        <>
        <div id="maindiv" className={combineStyles.MainDiv}>
            <motion.div
                id="rightPart"
                className={combineStyles.RightPart}
                initial={{ x: 2000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 5 }}
            >
                <RightPart />
            </motion.div>

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