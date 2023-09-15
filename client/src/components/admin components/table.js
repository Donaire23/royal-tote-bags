import  Axios  from "axios";
import { useEffect, useState } from "react"


const Table = () => {

  const [userDetails, setUserDetails] = useState([]);
  
  useEffect(() => {

    Axios.get("http://localhost:3001/countOrders").then((response) => {

    setUserDetails(response.data)

    })

  }, [userDetails])

  return (

    <>
    <table className="col-lg-12 mt-5 thead">

          <thead className="text-center">

            <th className="th">
              Customer's Name
            </th>

            <th className="th">
              Customer's Address
            </th>

            <th className="th">
              Zip Code
            </th>

            <th className="th">
              Mobile Number
            </th>

            <th className="th">
              Product Item
            </th>

            <th className="th">
              Product Name
            </th>

            <th className="th">
              Product Price
            </th>

            <th className="th">
              Quantity
            </th>

            <th className="th">
              Action
            </th>

          </thead>

        {userDetails.map((val) => {

          return (
            
           <tbody>

            <tr className="text-center" id={val.buyer_id} key={val.buyer_id}>

              <td>

                <p className="fs-5">{val.full_name}</p>

              </td>

              <td>

                <p className="fs-5">{val.address}</p>

              </td>

              <td>
                <p className="fs-5">{val.postal_code}</p>
              </td>

              <td>
                <p className="fs-5">{val.contact_number}</p>
              </td>

              <td className="col-lg-1">
                <img src={`http://localhost:3001/images/`+val.product_image} className="col-lg-10"/>
              </td>

              <td>
                <p className="fs-5">{val.product_name}</p>
              </td>

              <td>
                <p className="fs-5">{val.product_price}</p>
              </td>

              <td>
                <p className="fs-5">{val.qty}</p>
              </td>

              <td>
                <button className="p-2" onClick={(id) => {

  
                    id = val.cart_id
            
                  Axios.delete(`http://localhost:3001/delOrder/${id}`).then(() => {
                    console.log("Deleted")
                  }).catch(() => {
                    console.log("error")
                  })

                }}>Delete</button>
              </td>
             
            </tr>
           
           </tbody>
           
          )

        })}

      </table>
    </>

  )

}

export default Table