

const Contact = () => {

  return (
    <>
      <div className="container-md">

        <div className="contact-div">

          <h1 className="fw-bold">Contact</h1>
          <h2 className="fw-bold">You're welcome to contact us with any inquiry</h2>
          <h5 className="fw-bold">Mobile Number: 09318486928 | francesdonz23@gmail.com</h5>

          <div className="mt-5 col-lg-5">
            
            <form className="col-lg-12">
                <div class="form-floating mb-3 col-lg-12">
                  <input type="text" class="form-control" id="floatingInput" placeholder="Full Name"/>
                  <label for="floatingInput">Full Name</label>
               </div>
                <div class="form-floating mb-3 ">
                  <input type="text" class="form-control" id="floatingPassword" placeholder="Email Address"/>
                  <label for="floatingPassword">Email Address</label>
              </div>
              <div class="form-floating mb-3 ">
                  <input type="text" class="form-control" id="floatingPassword" placeholder="Phone Number"/>
                  <label for="floatingPassword">Phone Number</label>
              </div>
              <div>
                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="submitBtn d-flex justify-content-end mt-3">
                <button className="pt-2 pb-2 ps-5 pe-5">Submit</button>
              </div>
            </form>
          </div>
          

        </div>

        

      </div>
    </>
  )

}

export default Contact