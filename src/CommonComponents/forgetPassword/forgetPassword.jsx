import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../../css/user.module.css"
import { Link, useNavigate} from "react-router-dom";

function ForgetPassword() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setCon_Password] = useState("");
    let [accountType, setAccountType] = useState("Patient")
    const Navigate = useNavigate();

    function password_Handle(){
        (password === conPassword)?forget_Password_Api():alert("Password MisMatch form Conform Password")
        
    }


    async function forget_Password_Api(){
        let res = await fetch("http://localhost:3000/mediconnect/auth/Otp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                // password:password
            })
        });

        let response = await res.json();

        if(response.status === 200){
            let OTP = response.Otp;

            Navigate("/Otp", {
                state:{
                    email,
                    password,
                    OTP,
                    userType: accountType,
                    pageName:"Forget Password"
                }

            })
        }
        else if(response.status === 401){
             alert(response.msg)
        }
        else{
            console.log(`Error: ${response.error}`)
        }
        
        setEmail("");
        setPassword("");
        setCon_Password("")
    }



    return (
        <>
            <div className={styles.mainDiv}>
                <div className={styles.heroSection}>

                    <h1 className={styles.h1}>WelCome to MediConnect</h1>
                     <p style={{fontSize:"20px", marginTop:"10px"}}>Forget Your Password for access your MediConnect Account.</p>

                    <form style={{marginTop:"-20px"}}>
                        <label className={styles.passwordLabel}>
                            Email
                        </label>
                        <div className={styles.inputDiv}>
                            <FaEnvelope />
                            <input className={styles.inputField} placeholder="Enter Your Registered Email" type="email" value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <label className={styles.passwordLabel}>
                            Password
                        </label>
                        <div className={styles.inputDiv}>
                            <FaLock />
                            <input className={styles.inputField} placeholder="Enter New Password" type="password" value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <label className={styles.passwordLabel}>
                            Conform Password
                        </label>
                        <div className={styles.inputDiv}>
                            <FaLock />
                            <input className={styles.inputField} placeholder="Re-Enter Your New Password" type="text" value={conPassword}
                                onChange={(event) => setCon_Password(event.target.value)} />
                        </div>

                        <input className={styles.submit} type="submit" value="Forget Password" onClick={(event) => {
                            event.preventDefault();
                            password_Handle()
                        }}/>
                    </form>

                     <div>
                            <p className={styles.para}>
                                I have an Account? <Link to="/Login">Login</Link>
                            </p>
                            <p onClick={() => setAccountType("Doctor")} className={styles.para}>
                                Forget Password of <span className={styles.forgetpassword}>Doctor</span> Account.
                            </p>
                        </div>
                </div>
            </div>
        </>
    )
}


export default ForgetPassword;