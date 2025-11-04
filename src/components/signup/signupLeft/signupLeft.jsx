import { useEffect, useState } from 'react';
import styles from "../../../css/user.module.css"
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import classNames from 'classnames';
import { Link, useNavigate } from "react-router-dom";

function SignUpLeft() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const Navigate = useNavigate()


    let conformPasswordHandle = () => {
        (password === conPassword) ? OTP_Method() : alert("Conform Password and Password MisMatch");
    }


    let OTP_Method = async () => {
        try {
            console.log("Hello")
            let res = await fetch("http://localhost:3000/appointment/auth/Otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // name: name,
                    email: email,
                    // password: password
                })
            })

            let response = await res.json();

            if(response.status === 200){
                let OTP = response.Otp;

                Navigate("/Otp", {
                    state:{name,email, password, OTP, userType:"Patient", pageId:"Signup"}
                })
            }
            else if(response.status === 401){
                alert(response.msg)
            }
            else{
                console.log(response.error);
                alert(`Error: ${response.error}`)
            }


            setName("")
            setEmail("");
            setPassword("");
            setConPassword("");
        }
        catch (err) {
            alert("Otp Not Send")
        }
    }


    return (
        <>
            <div id="signupLeftMain" className={styles.mainDiv}>
                <div id='signupLeftHero-Section' className={styles.heroSection}>
                    <h1 className={styles.h1}>WelCome to MediConnect!</h1>
                    <p className={styles.second}>SignUp to access your MediConnect and manage your health.</p>
                    
                    <form className='form-control'>

                        <label style={{ display: "block", marginTop: "10px" }}>Name</label>
                        <div className={styles.inputDiv}>
                            <FaUser />
                            <input type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} className={styles.inputField} />
                        </div>

                        <label style={{ display: "block", marginTop: "10px" }}>Email</label>
                        <div className={styles.inputDiv}>
                            <FaEnvelope />
                            <input type='email' placeholder='Enter Your Email Address' value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} />
                        </div>

                        <label style={{ display: "block", marginTop: "10px" }}>Password</label>
                        <div className={styles.inputDiv}>
                            <FaLock />
                            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} />
                        </div>

                        <label style={{ display: "block", marginTop: "10px" }}>Conform Password</label>
                        <div className={styles.inputDiv}>
                            <FaLock />
                            <input type='text' placeholder='Conform Password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} className={styles.inputField} />
                        </div>

                        <input type='submit' value={"Signup"} className={styles.submit}
                            onClick={(e) => {
                                e.preventDefault()

                                conformPasswordHandle();
                            }} />
                    </form>

                    <p className={classNames(styles.second, styles.para)}>or continue with</p>

                    <div className={styles.loginway}>
                        <div className={styles.loginOption}>
                            <FaGoogle />
                            <span className={styles.optionName}>Google</span>
                        </div>
                        <div className={styles.loginOption}>
                            <FaMicrosoft />
                            <span className={styles.optionName}>Microsoft</span>
                        </div>
                    </div>

                    <p className={styles.para}>I have an account?<Link to="/Login">Login</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignUpLeft;


//And this is the way apply css given by parent

// function SignUpLeft(props){
//     console.log(props)
//     return (
//         <>
//         <div id="signupLeftMain" style={props.style}>

//         </div>
//         </>
//     )
// }