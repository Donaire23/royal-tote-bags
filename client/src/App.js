import React from 'react';
import './App.css';
import BasicExample from './components/navigationBar';
import HomePage from './pages/homePage';
import Orders from './components/private_route/orders';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import AdminNavBar from './components/admin page/adminNav';
import OrderAdmin from './components/admin page/ordersAdmin';
import ContactPage from './pages/contactPage';

function App() {
  
  return (
    <>


        <PayPalScriptProvider>

            <BrowserRouter>
                
                <Routes >
                  
                    <Route path='/' element={<BasicExample/>}>

                      <Route path='/' element={<HomePage/>}/>
                      <Route path="/orders" element={<Orders/>}/>  
                      <Route path='/contacts' element={<ContactPage/>}/>
                    </Route>



                    <Route path='/' element={<AdminNavBar/>}>

                      <Route path='/admin' element={<OrderAdmin/>}/>
                      

                    </Route>
                   

                 

                   
                        
                 

                    

                </Routes>
                
              </BrowserRouter>

        </PayPalScriptProvider>
         
            



        
        

 
    
    



    </>

 




  );
}

export default App;
