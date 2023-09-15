import { Link } from "react-router-dom"

const Footers = () => {

  return (

    <>
      <div className="container-md ">

        <div className="footer-div">

          <div className="footer-links d-flex justify-content-lg-center">

            <div className="me-5 d-flex flex-lg-column">

              <Link className="link-item">Shipping & Returns</Link>
              <Link className="link-item">Store Policy</Link>
              <Link className="link-item">Payment Methods</Link>

            </div>

            <div className="d-flex me-5 flex-lg-column">

              <Link className="link-item">Contact</Link>
              <Link className="link-item">Tel: 09318486829</Link>
              <Link className="link-email">francesdonz23@gmail.com</Link>

            </div>

            <div className="d-flex flex-lg-column ">

              <Link className="link-item">Facebook</Link>
              <Link className="link-item">Instagram</Link>
              <Link className="link-item">Twitter</Link>

            </div>

          
          </div>

            <div className="mailing-list mt-5">

              <p className="text-center">Join our mailing list and never miss an update</p>

              <div className="email-container text-center mt-5">

                <input placeholder="Email Address" className="email-input col-lg-4"/>
                <button className="subBtn">Subscribe Now</button>

              </div>
         

            </div>

          

        </div>

        


      </div>
      
    </>

  )

}

export default Footers