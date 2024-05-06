import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faHandHoldingUsd, faUser} from '@fortawesome/free-solid-svg-icons';
import "./Header.css"
import './Style.css'
import './AdminHeader.css'

const Header = () => {
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