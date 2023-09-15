import  Axios  from "axios";
import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import SignupBtn from './signUp';
import { Link } from "react-router-dom";


const LoginButton = () => {

  const [show, setShow] = useState(false);
  const [userImg, setUserImg] = useState()
  const [emailAdd, setEmailAdd] = useState("");
  const [pass, setPass] = useState("")
  const [showLog, setShowLog] = useState(true)
  const [showReg, setShowReg] = useState(true)
  const [userName, setUserName] = useState()
  const[loginStatus, setLoginStatus] = useState()
  const [toggleCard, setToggleCard] = useState(false)

  const handleClose = () => {
    setShow(false);
   
  } 

  Axios.defaults.withCredentials = true;

  useEffect(() => {

    Axios.get("http://localhost:3001/logins").then((response) =>{

    
      if(response.data.loggedIn === true) {

        setUserName(response.data.user[0])
        setUserImg(response.data.user[2])
        setShow(false)
        setShowLog(false);
        setShowReg(false)

      } else {

        setShowLog(true);
        setShowReg(true)
        
      }

      setLoginStatus(response.data.loggedIn)
      
    }).catch(() => {
      console.log("error")
    })

  }, [loginStatus])


  return (

    <>

     <Modal show={show} onHide={handleClose}  

          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
        
        <Modal.Body closeButton>

          <div>
            
            <h4 className="text-center mb-5 mt-2">
              Login
            </h4>

            <div className="login-form d-flex justify-content-center ">

              <div className="d-flex flex-column col-lg-10">

              <div class="form-floating mb-3 mt-4">

                <input type="email" onChange={(e) => {setEmailAdd(e.target.value)}} class="form-control" id="floatingInput" placeholder="Email address"/>

                <label for="floatingInput">
                  Email address
                </label>
              
              </div>

              <div class="form-floating">

                <input type="password" onChange={(e) => {setPass(e.target.value)}}  class="form-control" id="floatingPassword" placeholder="Password"/>

                <label for="floatingPassword">
                  Password
                </label>

              </div>
              
              <div className="check-container  mt-1 ">
               <p className="text-start">Forgot password?</p>
              </div>

              <button className="continue-btn mt-2" onClick={() => {

                  const logins = {
                    loginEmail: emailAdd,
                    loginPass: pass
                  }

                  Axios.post('http://localhost:3001/logins', logins).then((response) => {

                  if(response.data.Error === "Wrong Password") {
                    alert("Wrong Password")
                  } else if(response.data.Email !== emailAdd) {
                    alert("Email Does not exist")
                  } else {
                    setUserName(response.data.Name)
                    window.location.reload()
                  }
                 

                  }).catch(() => {
                    console.log("error")
                  })

              }}>Continue</button>

              <div className="sign-up d-flex justify-content-center mt-3">

                <p className="me-2">
                  Dont have an account
                ?</p>

                <Link className="sign-up-link">
                  Sign up
                </Link>

              </div>
             
              </div>
                
            </div>

          </div>
          
        </Modal.Body>
        
      </Modal>

          
      <div className="image-user col-lg-3 justify-content-center align-items-center">

        <div className="d-flex align-item-center">

          {showLog ? <button onClick={() => {

           setShow(true)
         
        }} className="loginBtn">Log In</button> : <button onClick={() => {

          setToggleCard(!toggleCard)
     
         
        }} className="user-name fw-bold">{userName} Account</button>}

        </div>

        { showLog ? <SignupBtn/> :  null   }

        
          {loginStatus ? 

          <div className={`${toggleCard ? "options" : "hide-options"}`}>

       
              <Link to="/orders" className="my-orders"><button className="my-orders" onClick={() => {
               
              }}>
                
                <span className="me-2"><i class="fa-solid fa-basket-shopping"></i></span> 

                My Orders 
                
              </button></Link>
              

              <Link to="/ss" className="logout d-flex justify-content-lg-center text-decoration-none">

                    <button className="logout"

                    onClick={() => {
                      
                      Axios.get("http://localhost:3001/logout").then(() => {
                        window.location.reload()
                      }).catch(() => {
                        console.log("error")
                      })
                      
                    }}>


              <span className="me-2"><i class="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i> </span>

              Logout 
              </button>

              </Link>
              

             </div>

              : 
              null}
          
          
      

      </div>
        
    
     
      
    </>
  )

}

export default LoginButton