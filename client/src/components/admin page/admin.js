import { useState } from "react"
import  Axios from "axios"

const AdminPage = () => {

  const [file, setFile] = useState()
  const [productN, setProductN] = useState()
  const [productP, setProductP] = useState()
  const [productDp, setProductDp] = useState()
  const [qty, setQty] = useState()

 

  return (

    <>  

      <div className="product-text col-lg-3 mt-5">

          <h1>
            ADD PRODUCT
          </h1>
          
      </div>  
      
      <div className="container d-flex border border-dark mt-5">

        <div className="add-images-div mt-5 col-lg-5">

          <p>
            Add Images
          </p>

          <input type="file" onChange={(e) => {setFile(e.target.files[0])}}/>

        </div>

       
         <div className="d-flex flex-column col-lg-5 pb-5">

             <div class="form-floating mb-3">
              <input type="text" onChange={(e) => {setProductN(e.target.value)}} class="form-control" id="floatingInput" placeholder="Product Name"/>

              <label for="floatingInput">
                Product Name
              </label>

           </div>

           <div class="form-floating mb-3">

              <input type="text" onChange={(e) => {setProductP(e.target.value)}} class="form-control" id="floatingInput" placeholder="Product Price"/>

              <label for="floatingInput">
                Product Price
              </label>

           </div>

           <div class="form-floating mb-3">
              <input type="text" onChange={(e) => {setProductDp(e.target.value)}} class="form-control" id="floatingInput" placeholder="Product Description"/>

              <label for="floatingInput">
                Product Description
              </label>

           </div>

           <div class="form-floating mb-3">

              <input type="text" onChange={(e) => {setQty(e.target.value)}} class="form-control" id="floatingInput" placeholder="Quantity"/>

              <label for="floatingInput">
                Quantity
              </label>
              
           </div>

           


        
            <button onClick={() => {

            const formData = new FormData();
            formData.append('image', file);
            formData.append('product_name', productN);
            formData.append('product_price', productP);
            formData.append('products_description', productDp);
            formData.append('qty', qty)

            Axios.post("http://localhost:3001/uploadProd", formData).then((response) => {
              console.log("Upload Success");
            }).catch((error) => {
              console.error("Upload Error:", error);
            });


            }} className="upload-btn">Upload</button>
          </div>
        </div>
      
      

    
   

   
    </>


  )

}

export default AdminPage