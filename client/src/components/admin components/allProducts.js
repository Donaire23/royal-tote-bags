import  Axios  from "axios";
import { useState, useEffect } from "react"

const AllProducts = () => {

  const [getAllProd, setGetAllProd] = useState([]);

  useEffect(() => {

    Axios.get("http://localhost:3001/allProd").then((response) => {
      setGetAllProd(response.data)
    })

  }, [getAllProd])



  return (
    <>

      <div className="product-text col-lg-3 mt-5">
          <h1>PRODUCTS</h1>
      </div>

      <div className="container-fluid mt-5">

        <table className="col-lg-12">

            <thead className="text-center">

              <th>
                Product Image
              </th>

              <th>
                Product Name
              </th>

              <th>
                Product Price
              </th>

              <th>
                Product Description
              </th>

              <th>
                Action
              </th>

            </thead>

          {getAllProd.map((val) => {
            return (
              <tbody>

                <tr className="text-center">

                  <td className="col-lg-1">
                    <img src={`http://localhost:3001/images/`+val.product_image} className="col-lg-12"/>
                  </td>

                  <td className="col-lg-3">
                    <p>{val.product_name}</p>
                  </td>

                  <td className="col-lg-3">
                    <p>{val.product_price}</p>
                  </td>

                  <td className="col-lg-3">
                    <p>{val.products_description}</p>
                  </td>

                  <td><button onClick={(id) => {

                    id = val.product_id

                    Axios.delete(`http://localhost:3001/delProd/${id}`).then(() => {
                      console.log("deleted")
                    }).catch(() => {
                      console.log("error")
                    })

                  }}>Delete</button></td>
                </tr> 

              </tbody>
            )
          })}

        </table>
      </div>
 

    </>
  )


}

export default AllProducts