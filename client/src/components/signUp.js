import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios'

const SignupBtn = () => {

  const [show, setShow] = useState(false);


  const handleClose = () => {
    setShow(false);
   
  }

  //registration form
  const [name, setName] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [confiPass, setConfiPass] = useState("")
  const [number, setNumber] = useState("");
  const [bDay, setBday] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [postalCode, setPostalCode] = useState("")

  const regDetails = {

    full_name: name,
    birth_date: bDay,
    address: userAddress,
    email_address: emailAdd,
    contact_number: number,
    postal_code: postalCode,
    password: password,
    confirm_pass: confiPass

  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,\]).{8,32}$/

  const spaceReg = /[ \t\n\r]./

  const sendData = () => {


    if(emailAdd.match(emailRegex) && password.match(passwordRegex)) {

      Axios.post("http://localhost:3001/sendData", regDetails).then(() => {
        console.log("success")
      }).catch(() => {
        console.log("error")
      })
      
      setShow(false)
    } else if(name.match(spaceReg) || name === "") {
      alert("Please type your name")
    } else if(password === "" || password.match(spaceReg)) {
      alert("Please type your password")
    } 


  }



  return (

    <>
    
      <Modal show={show} onHide={handleClose}  

          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
        
        <Modal.Body closeButton>


          <div>

            <h4 className="text-center mb-5 mt-2">

              Registration Form

            </h4>

            <div className="login-form d-flex justify-content-center">

              <div className="d-flex flex-column col-lg-10">

                <div class="form-floating mb-3 mt-4">

                  <input type="text" onChange={(e) => { setName(e.target.value) }} class="form-control" id="floatingInput" placeholder="Full Name"/>

                  <label for="floatingInput">
                    Full Name
                  </label>
                
                </div>

                <div class="form-floating">

                  <input type="text"  onChange={(e) => { setEmailAdd(e.target.value) }} class="form-control" id="floatingPassword" placeholder="Email Address"/>

                  <label for="floatingPassword">
                    Email Address
                  </label>

                </div>

                <div class="form-floating mt-3">
                  <input type="text"  onChange={(e) => { setPassword(e.target.value)  }} class="form-control" id="floatingPassword" placeholder="Password"/>

                  <label for="floatingPassword">
                    Password
                  </label>

                </div>

                <div class="form-floating mt-3">
                  <input type="text" onChange={(e) => { setConfiPass(e.target.value) }}  class="form-control" id="floatingPassword" placeholder="Password"/>

                  <label for="floatingPassword">
                    Confirm Password
                  </label>

                </div>

              
              
             <div className="d-flex  col-lg-8 justify-content-between">

                <div class="form-floating mb-3 mt-4">

                  <input type="text" onChange={(e) => { setNumber(e.target.value)} }  class="form-control" id="floatingInput" placeholder="Enter mobile number"/>

                  <label for="floatingInput">
                    Enter mobile number
                  </label>

                </div>

                <div class="form-floating mb-3 mt-4">

                  <input type="date" onChange={(e) => { setBday(e.target.value) }} class="form-control" id="floatingInput" placeholder="Birthdate"/>

                  <label for="floatingInput">
                    Birthdate
                  </label>

                </div>
              
             </div>
              
              <div class="form-floating mb-3 mt-2">

                <input type="text"  onChange={(e) => { setUserAddress(e.target.value) }} class="form-control" id="floatingInput" placeholder=" Address"/>
                
                <label for="floatingInput">
                  Address
                </label>

              </div>

              <div class="form-floating mb-3 mt-2">

                <input type="text"  onChange={(e) => { setPostalCode(e.target.value) }} class="form-control" id="floatingInput" placeholder=" Enter Postal Code"/>

                <label for="floatingInput">
                  Enter Postal Code
                </label>
                
              </div>
              
               <button className="continue-btn mt-2" onClick={sendData}>
                Submit
              </button>

              </div>
                
            </div>

          </div>
        </Modal.Body>
        
      </Modal>


      <div >

        <div className="ms-2">

          <button onClick={() => {

            setShow(true)
            
            }} className="loginBtn">

              Sign up
              
          </button>
         
        </div>

      </div>
      
    
      
    </>
  )

}

export default SignupBtn