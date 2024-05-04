
import "./MainPage.css";
import Shopping from "../assets/shopping.png";
import QA from "../assets/QA.png";
import Correo from "../assets/correo.png";
import Numero from "../assets/numero.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { InputGroup, FormControl,Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const MainPage = () => {
  return (
    <Container fluid style={{ width: 'auto', marginRight: '100px' }}>
    <Row className=" align-items-center">
        <Col style={{ width:'1592px',height:"630px" ,marginRight:"100px"}}>
            <div className="main-container" style={{ backgroundColor: '#99BA57', borderRadius:'50px', width:'1592px',height:"630px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className='Imagen me-auto'>
                            <img src={Shopping} alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className='Texto ms-auto' style={{ marginRight: '300px', marginTop: '200px' }}>
                        <h1 className="display-4"><p className="poppins-regular" style={{ color: "#FFFF" }}>¿Qué necesitas hoy?</p></h1>
                        <InputGroup>
                        <Button style={{backgroundColor:"#ffff",borderColor:"#FFFF"}}>
                                <FaSearch style={{color:"#99BA57"}}/>
                            </Button>
                        <FormControl
                            placeholder="Busca un producto..."
                            aria-label="Busca un producto..."
                            aria-describedby="basic-addon2"
                        />
                        </InputGroup>
                    </div>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
    <Row style={{marginTop:"35px"}}>
        <Col md={4}>
            <div className="col-md-6" style={{width:'300px'}}>
                                <div className='InfoContacto me-auto poppins-regular'style={{width:'500px'}}>
                                    <h2>Información de contacto<br></br> <img src={Correo} alt="Descripción de la imagen" style={{ marginRight: '50px' }} />gethelp@outnet.cr<br></br> <img src={Numero} alt="Descripción de la imagen" style={{ marginRight: '50px' }} />(506) 2574-6217</h2>
                                </div>
            </div>
            </Col>
        <Col md={{ span: 4, offset: 4 }}>
            <div className='BotonAyuda ms-auto'>
                                <Button className='BotAyuda' size="lg" style={{ borderColor:'#99BA57',backgroundColor: '#99BA57', borderRadius:"20px"}}>
                                    <div className="row">
                                    <div className="BtnImagen col">
                                        <img src={QA} alt="Descripción de la imagen" style={{ marginRight: '50px' }} />
                                    </div>
                                    <div className="BtnTxt col poppins-regular" style={{ fontSize:'23px',marginTop: '10px',marginRight: '40px' }}>
                                        ¿Necesitas ayuda? <br /> Haz click aquí
                                    </div>
                                    </div>
                                </Button>{' '}
                                </div>
        </Col>
      </Row>
</Container>

  )
}

export default MainPage