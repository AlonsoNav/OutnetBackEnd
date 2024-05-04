import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBox, faHandHoldingUsd, faSignOut} from '@fortawesome/free-solid-svg-icons';
import './Style.css'
import './AdminHeader.css'

const AdminHeader =() =>{
    return(
        <Navbar expand="lg" className="bg-99BA57 position-fixed top-0 start-0 w-100">
            <Container fluid>
                <Navbar.Brand className="custom-nav-brand">Outnet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto text-start">
                        <Nav.Link className="custom-nav-link"><FontAwesomeIcon icon={faChartLine} className="me-1" />Estadísticas</Nav.Link>
                        <Nav.Link className="custom-nav-link"><FontAwesomeIcon icon={faBox} className="me-1" />Productos</Nav.Link>
                        <Nav.Link className="custom-nav-link"><FontAwesomeIcon icon={faHandHoldingUsd} className="me-1" />Subastas</Nav.Link>
                    </Nav>
                    <Nav className="me-0 text-start border-sm-top">
                        <Nav.Link className="custom-nav-link"><FontAwesomeIcon icon={faSignOut} className="me-1" />Cerrar sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminHeader;