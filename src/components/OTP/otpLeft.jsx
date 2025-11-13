import { FaKey } from "react-icons/fa"
import { Link, useLocation, useNavigate  } from "react-router-dom"
import styles from "../../css/user.module.css"
import classNames from 'classnames';
import { useState } from "react";


function OTPLeft() {

    let [userEnterOTP, setOTP] = useState("");

    let Navigate = useNavigate();

    const location = useLocation();
    const { name, email, password, OTP, userType, pageId } = location.state || {};


    let OtpVerify = () => {
        if (OTP === userEnterOTP) {
            (pageId === "Signup") ? Signup_Method() : ForgetPassword_Method();
        }
        else {
            alert("Please Enter Correct those Send on Your Email")
        }
    }



    let Signup_Method = async () => {
        try {
            let Signup_fetch = await fetch("http://localhost:3000/appointment/auth/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                credentials: "include"
            })

            let response = await Signup_fetch.json()


            if (response.status === 500 || status === 403) {
                alert(response.error);
                console.log(response.error)
            }
            else {
                alert(response.msg);
                setOTP("")
                Navigate("/UserDetail", {
                    state:{name, email}
                })
            }
        }
        catch (err) {
            console.log(`Error: ${err}`);
            alert("Regestation falied")
        }

    }


    let ForgetPassword_Method = async () => {
        try {
            let forgetPassword_fetch = await fetch((userType === "Patient") ? "http://localhost:3000/appointment/auth/forgetPassword" : "http://localhost:3000/appointment/doctor/auth/forgetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    email: email,
                    password: password
                },
                credentials:"include"
            })

            let response = await forgetPassword_fetch.json();

            if (response.status === 500 || status === 403) {
                alert(`Error: ${response.error}`)
            }
            else {
                alert(response.message);
                setOTP("");
                Navigate("/", {replace: true});
            }

        }
        catch (err) {
            alert(`Error: ${err}`);
        }
    }


    return (
        <>
            <div className={styles.mainDiv}>
                <div className={styles.heroSection}>
                    <h1 className={styles.h1}>WelCome to MediConnect</h1>
                    <p className={styles.second}>Confirm your identity by entering the OTP to proceed with MediConnect.</p>
                    <form className="form-control">
                        <label style={{ display: "block", marginTop: "10px" }}>OTP</label>
                        <div className={styles.inputDiv}>
                            <FaKey />
                            <input type="number" placeholder="Enter Your OTP" className={styles.inputField} value={userEnterOTP} onChange={(e) => setOTP(e.target.value)} />
                        </div>

                        <input type="submit" className={styles.submit} onClick={(e) => {
                            e.preventDefault();

                            OtpVerify()
                        }} />
                    </form>

                    <p className={classNames(styles.second, styles.para)}> or continue with</p>

                    <p className={styles.para}>I have an account?<Link to="/Login">Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default OTPLeft;