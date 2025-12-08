import { FaEnvelope, FaLock, FaGoogle, FaMicrosoft } from "react-icons/fa";
import styles from "../../../css/user.module.css";
import classNames from 'classnames';
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LeftPart() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let [userType, setUserType] = useState("Patient");

    let Navigate = useNavigate();


    let login_Api_Fetch = async () => {
        let res = await fetch((userType === "Patient") ? "http://localhost:3000/mediconnect/auth/Login" : "http://localhost:3000/mediconnect/doctor/auth/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: "include"
        })

        let response = await res.json();

        if (response.status === 500) {
            console.log(`Error: ${response.error}`)
        }
        else if (response.status === 401) {
            alert(response.msg,response.status)
        }
        else if (response.status === 404) {
            alert(response.msg, response.status)
        }
        else {
            alert(response.msg)

            if(userType === 'Doctor'){
                localStorage.setItem("UserType", "Doctor")
            }
            else{
                localStorage.setItem("UserType", "Patient")
            }

            setPassword("");
            setEmail("")

            Navigate("/", {replace: true})
        }
    }



    return (
        <>
            <div id="mainLeft" className={styles.mainDiv}>
                <div id="hero-Section" className={styles.heroSection}>
                    <h1 className={styles.h1}>WelCome Back!</h1>
                    <p className={styles.second}>Log in to access your appointments and manage your health.</p>
                    <form>
                        <label>Email</label>
                        <div className={styles.inputDiv}>
                            <FaEnvelope />
                            <input type="email" placeholder="Enter Your Email Address" className={styles.inputField} id="email" value={email} onChange={(element) => setEmail(element.target.value)} />
                        </div>

                        <div className={styles.passwordLabel}>
                            <label>Password</label>
                            <Link className={styles.forgetpassword} to="/ForgetPassword">Forget Password?</Link>
                        </div>
                        <div className={styles.inputDiv}>
                            <FaLock />
                            <input type="password" placeholder="Password" className={styles.inputField} id="password" value={password} onChange={(element) => setPassword(element.target.value)} />
                        </div>

                        <button type="submit" className={styles.submit} onClick={(e) => {
                            e.preventDefault()

                            login_Api_Fetch();
                        }}>Login</button>
                    </form>

                    <p className={classNames(styles.second, styles.para)}>or continue with</p>

                    <div className={styles.loginway}>
                        <div id="google" className={styles.loginOption}>
                            <FaGoogle />
                            <p className={styles.optionName}>Google</p>
                        </div>
                        <div id="microsoft" className={styles.loginOption}>
                            <FaMicrosoft />
                            <p className={styles.optionName}>Microsoft</p>
                        </div>
                    </div>

                    <p className={styles.para}>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
                    {(userType === "Patient") ? <p className={styles.para} onClick={() => setUserType("Doctor")}><Link>Login as Doctor</Link></p> : null}
                </div>
            </div>
        </>
    )
}

export default LeftPart;