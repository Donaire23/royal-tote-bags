import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import OrderAdmin from "./ordersAdmin"
import AllProducts from "../admin components/allProducts"
import AdminPage from "./admin"
import { useState } from "react"


const AdminNavBar = () => {

  const [orderAdmin, setShowOrderAdmin] = useState(true)
  const [allProducts, setShowAllProducts] = useState(false)
  const [addProduct, setAddProduct] = useState(false)

  return (
    <>
    
    <div className="d-flex row admin-nav container-fluid">
        <div className="col-lg-2 d-flex flex-column nav-container ">

          <Link className="nav-links mt-5" onClick={() => {

            setShowOrderAdmin(true)
            setShowAllProducts(false)
            setAddProduct(false)

          }}>Orders</Link>
          <Link className="nav-links mt-3" onClick={() => {

            setShowAllProducts(true)
            setShowOrderAdmin(false)
            setAddProduct(false)

          }}>Products</Link>


          <Link className="nav-links mt-3" onClick={() => {

            setShowOrderAdmin(false)
            setShowAllProducts(false)
            setAddProduct(true)

          }}>Add Products</Link>

          
          
          <button className="logout-admin mt-5 col-lg-3 fs-5">Logout</button>
        </div>
      <div className="col-lg-10">

        {orderAdmin ? <OrderAdmin/> : null}
        {allProducts ? <AllProducts/> : null}
        {addProduct ? <AdminPage/> : null}

      </div>
        
    </div>

    <div>
      
         
          
    </div>
    
    </>
  )


}

export default AdminNavBar