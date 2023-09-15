import { useEffect, useState } from "react"
import Axios from 'axios'

const CountOrders = () => {

  const [countOrd, setCountOrd] = useState([])

  useEffect(() => {

    Axios.get("http://localhost:3001/countOrders").then((response) => {
      setCountOrd(response.data)
    })
    
  }, [])



  return (
    <>
       <div>
          <div className="count-card col-lg-3 mt-5 d-flex align-items-center justify-content-center">
            <h1 className="orders-txt">Orders: {countOrd.length}</h1>
          </div>
      </div>
    </>
  )

}

export default CountOrders