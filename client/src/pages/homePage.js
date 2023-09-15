import Products from "../components/products"
import AboutUs from "../components/aboutUs"
import Footers from "../components/footer"

const HomePage = () => {
  
  return (
    
    <>
    
    <div className="home">

     <Products/>

    </div>

    <div className="about">

      <AboutUs/>

    </div>

    <div className="footer">

      <Footers/>

    </div>


    </>
  )

}

export default HomePage