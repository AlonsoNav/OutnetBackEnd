import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Subasta from "../assets/auction.png";
import Carro from "../assets/cart.png";
import User from "../assets/user.png";
import { useState,useEffect } from 'react';
import {getController, postNoJSONController} from "../context/Actions.jsx";
import "./Header.css"

const Header = () => {

  const [userData, setUserData] = useState({});
  const [name,setName]= useState('')

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
        setUserData(storedUserData);
        setName(storedUserData.name)
        
    }else{
      setName('Invitado')
    }
}, []);

  return (
    <Navbar expand="lg" className="bg-custom-color text-white fixed-top" id="Nav">
     
        <Navbar.Brand className='text-white poppins-regular' style={{ fontSize: '64px',marginLeft:"20px" }} href="/">Outnet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" style={{fontSize:'26px',color:'white'}} className='poppins-regular'>Pedidos <br></br> y Deseos</Nav.Link>
            <Nav.Link href="/" style={{fontSize:'24px',color:'white'}}><img src={Subasta} alt="Subastas"/></Nav.Link>
            <Nav.Link href="/Cart" style={{fontSize:'24px',color:'white'}}> <i className="fa badge fa-lg" value={5}> <img src={Carro} alt="Carro" /></i> </Nav.Link>
            <Nav.Link href="/profile" style={{fontSize:'24px',color:'white'}}><i className="bi bi-person poppins-regular">  <img src={User} alt="Usuario" /> {name}</i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
 
    </Navbar>
  )
}

export default Header