import React from "react"
import  Axios  from "axios";
import { useEffect, useState } from "react"
import { Tab } from "bootstrap";
import Paypalbutton from "../paypalButton";
import { Link } from "react-router-dom";



const Orders = () => {

  

  const [isLoggedIn, setIsLoggedIn] = useState([]);
  const [orderList, setOrderList] = useState([])
  const [total, setTotal] = useState()
  const [obj, setObj] = useState()
 

  Axios.defaults.withCredentials = true;

    useEffect(() => {
  
      Axios.get("http://localhost:3001/logins").then((response) =>{
       
        setIsLoggedIn(response.data)
        
      }).catch(() => {
        console.log("error")
      })
  
    }, [isLoggedIn])

    useEffect(() => {

      Axios.get("http://localhost:3001/orderList").then((response) => {

      setOrderList(response.data)

      }).catch(() => {
        console.log("error")
      })

    }, [orderList])


    useEffect(() => {

      let calculatedTotal = 0;
  
      if (isLoggedIn && orderList.length > 0) {

        calculatedTotal = orderList
          .filter((val) => val.buyer_id === isLoggedIn.user[1])
          .reduce((acc, val) => acc + val.product_price, 0);
      }

      setTotal(calculatedTotal)
     
      
    }, [isLoggedIn, orderList]);

    console.log(isLoggedIn)

  
  return (

    <>  
    
      <div className="container-fluid mt-5">

        <div className="order-containers justify-content-center">

          <div className="section d-flex row justify-content-center">
          
            <div className="col-lg-8 border border-dark">

            <h1 className="mb-5">
              Shopping Cart
            </h1>

             <table class="table table-striped table-hover bg-dark mt-2">
             
                    <thead>


                        <tr className="text-center">

                            <th scope="col">
                              Product
                            </th>
                            <th scope="col">
                              Product Name
                            </th>
                            <th scope="col">
                              Quantity
                            </th>
                            <th scope="col">
                              Total Price
                            </th>
                        
                        </tr>

                    </thead>

                    {isLoggedIn ? 

                    <>
                    {orderList.map((val) => {

                    if(val.buyer_id  === isLoggedIn.user[1]) {

                    return (
                      <>

                      <tbody className="tatable table-stripedble">

                            <tr id={val.cart_id} key={val.cart_id} className="tr-container">

                                <td className="col-lg-1 bg-light">

                                  <img src={`http://localhost:3001/images/`+val.product_image} className="col-lg-12"/>

                                </td>

                                <td className="col-lg-3 bg-light fs-5" >
                                  <p className="pName">{val.product_name}</p>
                               </td>

                                <td className="col-1 bg-light fs-4"> 
                                  <p className="text-center qty">{val.qty}</p> 
                                </td>

                                <td className="col-lg-3 bg-light fs-4"> 
                                  <p className="pPrice">&#8369; {val.product_price}.00 </p>
                                </td>
                               
                          </tr>

                      </tbody>
                   
                      </>
                    )

                    }


                    })}
                    </>

                    : null}
                        
                   </table>

                   
                   <Link to="/" className="continue-shopping-link">
                      <span className="me-1">

                        <i class="fa-solid fa-chevron-left"></i>

                      </span> 

                      Continue Shopping
                  </Link>
                  
               </div>
                 


               <div className="butn col-lg-3 border border-dark">

                 <h1>
                  Payment Info
                </h1>

                  <h3 className="text-end">

                    Total: &#8369; {total}.00
                    
                  </h3>
                 
                  <div>

                      <hr/>
                    <Paypalbutton/>

                  </div>
                       
                 </div>

               </div>

        </div>
        
      </div>

      
      
    </>

  )
}

export default Orders