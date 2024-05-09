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
    <Navbar expand="lg" className="bg-99BA57 position-fixed top-0 start-0 w-100 fixed-top" id="Nav">
        <Container fluid>
            <Navbar.Brand className='custom-nav-brand'>Outnet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto text-lg-end text-start">
                    <Nav.Link href="#PYD" className='custom-nav-link'>Pedidos y Deseos</Nav.Link>
                    <Nav.Link href="#Subasta" className='custom-nav-link'><FontAwesomeIcon icon={faHandHoldingUsd} className="me-1 fa-lg"/>Subastas</Nav.Link>
                    <Nav.Link href="#Carro" className='custom-nav-link'> <span className="fa badge me-0 p-0" value={5}><FontAwesomeIcon icon={faCartShopping} className="fa-lg"/></span>Carrito</Nav.Link>
                    <Nav.Link href="#Usuario" className='custom-nav-link'><FontAwesomeIcon icon={faUser} className="me-1 fa-lg" />Alonso</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header