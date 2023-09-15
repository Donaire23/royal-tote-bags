const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParse = require('body-parser');
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 3001;
const jwt = require("jsonwebtoken");
const bcrpt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const salt = 10;



app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
  }
));

app.use(session({
  key: "user-session",
  secret: "tote-bags",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 24 * 60 * 60 * 1000,
  }
}))


app.use(express.json());
app.use(cookieParser());
app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static("public"));


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tote_bags_db'
})




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage
})

app.post("/uploadProd", upload.single("image"), (request, response) => {


  const product_name = request.body.product_name;
  const product_price = request.body.product_price;
  const products_description = request.body.products_description
  const qty = request.body.qty
  const product_image = request.file.filename;
  
  const upload = "INSERT INTO products_table(product_name, product_price, products_description, qty, product_image) VALUES (?,?,?,?,?)"

  db.query(upload, [product_name, product_price, products_description, qty, product_image], (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log("upload success")
    }
  })

})


app.get("/products", (request, response) => {

  const getItems = "SELECT * FROM products_table";

  db.query(getItems, (err, res) => {
    response.send(res)
  })

})



app.post("/sendData", (request, response) => {

   const data = "INSERT INTO registration_table(full_name, birth_date, address, email_address, contact_number, postal_code, password, confirm_pass) VALUES (?,?,?,?,?,?,?,?)";

    bcrpt.hash(request.body.password.toString(), salt, (err, hash) => {
    if(err) return res.json({Error: 'error'});

    const full_name = request.body.full_name;
    const birth_date = request.body.birth_date;
    const address = request.body.address;
    const email_address = request.body.email_address;
    const contact_number = request.body.contact_number;
    const postal_code = request.body.postal_code;
    const password = request.body.password;
    const confirm_pass = request.body.confirm_pass

 
  
    db.query(data, [full_name, birth_date , address, email_address, contact_number, postal_code, hash, hash], (err, res) => {
      
        if(err) {
          return console.log("error")
        } else {
          return console.log("success")
        }

      })
      
    })


})


app.post("/logins", (request, response) => {
 
  const getAll = 'SELECT * FROM registration_table WHERE email_address = ?';

  
  db.query(getAll,[request.body.loginEmail], (error, res) => {

    if(error) {
      return res.json({Error: 'Login Error in Server'})
    } 
    
    if(res.length > 0) {

      bcrpt.compare(request.body.loginPass, res[0].password, (err, data) => {
        if(err) {
          return response.json({Error: 'Password compare error'})
        }

        if(data) {

          request.session.user = [res[0].full_name, res[0].id] 
         
          return response.json({Status: "Success", Name: res[0].full_name, Email: res[0].email_address})
          
        } else {

          return response.json({Error: 'Wrong Password'})
          
        }

      })

    }  else {

      return response.json({Error: 'Wrong Email Address'})

    }
    
  } )
  
}) 


app.get("/logins", (request, response ) => {
  if(request.session.user) {
    response.send({loggedIn: true, user: request.session.user})
  } else {
    response.send({loggedIn: false})
  }
})


app.get("/logout", (request, response) => {
  if (request.session.user) {

     request.session.destroy((err) => {

      if (err) {
        console.error("Error destroying session:", err);
        return response.json({ success: false });
      }

      return response.json({ success: true });
    });

  } else {

    return response.json({ success: false });
    
  }
});

app.post("/buy", (request, response) => {

  const buyer_id = request.body.buyer_id;
  const product_image = request.body.product_image;
  const product_name = request.body.product_name;
  const product_price = request.body.product_price;
  const qty = request.body.qty

  const buyProd = "INSERT INTO buyers_table(buyer_id, product_image, product_name, product_price, qty) VALUES (?,?,?,?,?)";

  db.query(buyProd, [buyer_id, product_image, product_name, product_price, qty], (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })

})

app.get("/orderList", (request, response) => {

  const userOrders = "SELECT * FROM buyers_table";

  db.query(userOrders, (err, res) => {

    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }

  })
  
})

//count orders in table

app.get("/countOrders", (request, response) => {

  const Orders = "SELECT registration_table.full_name, registration_table.address, registration_table.postal_code,   registration_table.contact_number,  buyers_table.cart_id,buyers_table.buyer_id, buyers_table.product_image, buyers_table.product_name, buyers_table.product_price, buyers_table.qty FROM buyers_table INNER JOIN registration_table ON registration_table.id=buyers_table.buyer_id";

  db.query(Orders, (err, res) => {

    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }

  })
  
})

//get all products in table
app.get("/allProd", (request, response) => {


  const getAllProd = "SELECT * FROM products_table";

  db.query(getAllProd, (err, res) => {

    if(err) {
      console.log(err)
    } else {
      response.send(res)
    }
 
  })

})


//delete user orders

app.delete("/delOrder/:id", (request, response) => {

  const id = request.params.id
  const delUserOrder = "DELETE FROM buyers_table WHERE cart_id=?"

  db.query(delUserOrder, id, (err, res) => {

    if(err) {
      console.log(err)
    } else {
      console.log("deleted")
    }
 
  })

})

//delete products

app.delete("/delProd/:id", (request, response) => {


  const id = request.params.id;
  const delProduct = "DELETE FROM products_table WHERE product_id=?"

  db.query(delProduct, id, (err, res) => {
    if(err) {
      console.log(err)
    } else {
      console.log(res)
    }
  })

})

app.listen(PORT, () => {
  console.log("Port is running at 3001")
})