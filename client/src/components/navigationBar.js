import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './login';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function BasicExample() {


  return (

    <>

      <Navbar expand="lg">

        <Container className='container'>

          <Navbar.Brand>

            <span className='brand-name'>
              The Royal Tote
            </span>

          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto col-lg-12 d-flex justify-content-end align-items-center">


              <div className='col-lg-3 d-flex justify-content-around '>

                <Link className='fw-bold fs-5 text-decoration-none text-dark' to='/'>
                  Shop
                </Link>

                <a href='#aboutPage' className='fw-bold fs-5 text-decoration-none text-dark'>
                  About
                </a>
               
                <Link  to='/contacts' className='fw-bold fs-5 text-decoration-none text-dark'>
                  Contact
                </Link>

              </div>

          
              <LoginButton/> 
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </>

    
    

    
  );
}

export default BasicExample;