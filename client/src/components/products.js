import React from 'react';
import Axios from 'axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'


const Products = () => {


  const [key , setKey ] = useState();
  const [products, getProducts] = useState([])
  const [pId, setPid] = useState()

  const [auth, setAuth] = useState([])
 
  
  const [qty, setQty] = useState()
  const [isDisabled, setDisabled] = useState(true)
  const [orig, setOrig] = useState()
  const [price, setPrice] = useState(orig)

 
  useEffect(() => {

    Axios.get("http://localhost:3001/products").then((response) => {
      getProducts(response.data)
    })

  }, [products])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
   
  }

  useEffect(() => {

    setPrice(orig)

  }, [orig]);

  useEffect(() => {

    setPrice(orig * qty)

  }, [qty])


  useEffect(() => {

    Axios.get("http://localhost:3001/logins").then((response) =>{

    setAuth(response.data)
   
    
    })

    
  })

  return (
    <>

      <Modal show={show} onHide={handleClose}  
          
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>

        <Modal.Body >


        <div>

        {products.map((val) => {  

          if(val.product_id === pId)

          return (

            <>  

              <div className='preview-container d-flex' id={val.product_id} key={val.product_id}>

                <div className='product-image '>

                  <img src={`http://localhost:3001/images/`+val.product_image}/>

                </div>

                <div className='preview-text mt-5 col'>

                  <p className='fs-4 fw-bold'>
                    {val.product_name}
                  </p>

                  <p className='fs-5 fw-bold'>
                     &#8369; {price}.00
                  </p>

             

                <p className='fw-bold'>
                  Quantity
                </p>

                <div className='qty-container d-flex col-lg-4'>

                  <button className='decre fw-bold' onClick={() => {
                    
                    setQty(qty - 1)
                  
                    
                  }} disabled={qty === 1 ? isDisabled : !isDisabled}>
                    <i class="fa-solid fa-minus"></i>
                  </button>

                  <p className='p'>
                    {qty}
                  </p>

                  <button className='incre fw-bold' onClick={() => {

                  setQty(qty + 1)
                 
              
                  }} disabled={qty === 10 ? isDisabled : !isDisabled}>
                    <i class="fa-solid fa-plus"></i>
                  </button> 

                </div>
                   
                  <button className='to-bag-btn col-lg-12' onClick={() => {

   
                      if(auth.loggedIn === false) {
                        alert("please login first")
                      } else if(auth.loggedIn === true) {

                          const buyers = {
                            buyer_id: auth.user[1],
                            product_image: val.product_image,
                            product_name: val.product_name,
                            product_price: price,
                            qty: qty
                          }

                          Axios.post("http://localhost:3001/buy", buyers).then(() => {
                          
                          })

                          Swal.fire(
                            'Thank you!',
                            'For Buying',
                            'success'
                          )

                          setShow(false)
                        }

                      }}>

                      ADD TO BAG 

                      <span className='ms-2'>

                        <i class="fa-solid fa-bag-shopping fs-5"></i>
                        
                      </span>

                  </button>
            
                    
                 
                </div>

              </div>
              
             
            </>

          )

          })}

        </div>

        


        </Modal.Body>
        
      </Modal>

    <div className='container-md'>

      <div className='d-flex row'>

            {products.map((val) => {  

              return (

                <>  

                    <div className='bag-container  text-center col-lg-4'>

                      <img src={`http://localhost:3001/images/`+val.product_image} className='col-lg-8' alt='Product'/>
                      <p className='fs-5'>{val.product_name}</p>
                      <p className='fs-5'> &#8369; {val.product_price}.00</p>

                      {val.id === key ? <button onClick={() => {

                        
                          setOrig(val.product_price)
                          setPid(val.product_id)  
                          setQty(val.qty)
                          setShow(true)
                         
                    
                        }} className='addBtn col-lg-8'>ADD TO BAG <span className='ms-2 bag-logo'><i class="fa-solid fa-bag-shopping fs-5"></i></span></button> : null}

                    </div>

                </>

              )

            })}

          </div>
    </div>

   
      
    </>

  )
}

export default Products