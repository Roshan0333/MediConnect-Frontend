import logo from '../../assets/photos/logo.png';
import hamburger from '../../assets/photos/burger-bar.png'
import Styles from "./navbar.module.css"
import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function Navbar() {

  //Use for make make responsive.
  //we use iSmallScreen variable, we store boolean value false. When screen size small then or equal to 770px, then value toogle into true.
  const iSmallScreen = useMediaQuery({ maxWidth: 770 });

  //This is useState is hook of react which is use for re-redening UI when variable value is change and variable value is change with help of function.
  //And useState hook is use Destructuring concept of Javascript;

  //menuOpen is variable we initialize with false value;
  //And setMenuOpen is function, which help to toggle value of menuOpen variable
  const [menuOpen, setMenuOpen] = useState(false);



  //useEffect is also hook like useState automatically run;
  //I use for auto toggle the value of menuOpen when screen is Large or make menuOpen variable false when screen is more than 770px automatically;
  useEffect(() => {
    if (!iSmallScreen) {
      setMenuOpen(false)
    }
  }, [iSmallScreen])


  //This function is use for show list onClick of hamburger image
  const handleHamburgerClick = () => {

    //we toggle the value of openMenu onClick of hamburger Image
    //prev work as openMenu variable part;
    setMenuOpen((prev) => !prev)
  }

  const userType = localStorage.getItem("UserType")

  const SignOut = async () => {
    let fetchResult = await fetch("http://localhost:3000/mediconnect/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    let fetchResponse = await fetchResult.json();

    let responseStatus = fetchResponse.status;

    if (responseStatus === 500) {
      console.log(`Error: ${fetchResponse.error}`)
    }
    else {
      alert(fetchResponse.msg)
      localStorage.clear()
    }
  }


  return (
    <>
      <div id='main' className={Styles.main}>
        <div className={Styles.topleft}>
          <img src={logo} alt="Logo" className={Styles.logo} />
          <p className={Styles.p}>MediConnect</p>
        </div>
        <div className={Styles.topright}>
          {

            //In this part of code code add item when screen is small or small than 771px screen size;

            //When is larger then menuOpen = false, iSmallScreen = false but !iSmallScreen = true;
            (menuOpen || !iSmallScreen) && (
              <div className={Styles.list}>


                {iSmallScreen && <Link to="/Profile" className={Styles.li}
                  onClick={iSmallScreen ? handleHamburgerClick : null}>
                  Profile
                </Link>}

                <Link to="/" className={Styles.li}
                  onClick={iSmallScreen ? handleHamburgerClick : null}>
                  Home
                </Link>

                <Link to="/Appointment" className={Styles.li}
                  onClick={iSmallScreen ? handleHamburgerClick : null}>
                  Appointment
                </Link>

                {iSmallScreen && <Link to="/Report" className={Styles.li}
                  onClick={iSmallScreen ? handleHamburgerClick : null}>
                  Report
                </Link>}

                {(userType === "Doctor") ?(iSmallScreen && <Link to="/AppointmentPost" className={Styles.li}
                    onClick={handleHamburgerClick}>
                    Appointment Post
                  </Link>):
                  (iSmallScreen && <Link to="/Doctor" className={Styles.li}
                    onClick={handleHamburgerClick}>
                    Doctor
                  </Link>)
                  }

                {iSmallScreen && <Link to="/History" className={Styles.li}
                  onClick={handleHamburgerClick}>
                  History
                </Link>}

                <Link to="/Contact" className={Styles.li}
                  onClick={iSmallScreen ? handleHamburgerClick : null}>
                  Contact Us
                </Link>

                {iSmallScreen && <Link to="/Setting" className={Styles.li}
                  onClick={handleHamburgerClick}>
                  Setting
                </Link>}

                <Link to="/Signup" className={Styles.li}
                  onClick={iSmallScreen ? handleHamburgerClick : null}>
                  Login/SignUp
                </Link>

                {iSmallScreen && <div><p className={Styles.li}
                  onClick={() => {
                    handleHamburgerClick();
                    SignOut()
                  }}>
                  Sign Out
                </p></div>}
              </div>
            )
          }

          {/*This code show and work when screen size is small than 771px also iSmallScreen = true */}
          {iSmallScreen && (
            <img src={hamburger} onClick={handleHamburgerClick} alt='hamburgerMenu' className={Styles.hamburger} />
          )}

        </div>
      </div>
    </>
  )
}


export default Navbar;