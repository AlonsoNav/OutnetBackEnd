import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Cart = () => {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ maxWidth: "1516px", width: "100%", margin: "0 auto" }}>
        <Container style={{  marginTop:"50px",marginRight: "550px", marginLeft: "0", maxWidth: "100%"  }}>
        <Row style={{ width: "1516px" }}>
            <Col style={{ overflowY: "auto",overflowX: 'hidden',marginRight: "150px",backgroundColor: "#F4F6F0", height: "491px", borderRadius: "10px", width: "976px" }}>
                
                {/* Producto */}

                <div style={{ marginTop: "40px", margin: "40px", backgroundColor: "#FFFF", borderRadius: "10px", alignItems: "center" }}>
                    <div className='text-start' style={{ width: "100px", height: "100px" }}>
                        <Row style={{ width: "881px" }}>
                            <Col>
                                <div style={{ margin: "20px" }}>
                                    <Row>
                                        <Col>
                                            Imagen
                                        </Col>
                                        <Col>
                                            Info
                                        </Col>
                                        <Col>
                                            Botones
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                
            </Col>

            <Col md={4} style={{ marginLeft: "50px", backgroundColor: "#99BA57", height: "562px", borderRadius: "10px", maxWidth: "487px" }}>
                    <Col>
                    <div style={{ marginLeft:"20px",marginTop: "40px", backgroundColor: "#FFFF", borderRadius: "10px", width: "431px",minHeight:"402px", justifyContent: "center", alignItems: "center" }}>
                        <Row>
                        <Col>
                            <div className='poppins-regular' style={{ fontSize:"48px", justifyContent: "center"}}>
                            Orden
                            </div>
                        </Col>
                        </Row>
                            <Row style={{marginTop:"32px"}}>
                            <Col>
                                <div className="text-start" style={{fontSize:"32px"}}>
                                    <div style={{marginLeft:"20px"}}>
                                    SubTotal:
                                    </div>
                                </div>
                            </Col>
                            </Row>
                            <Row style={{marginTop:"32px"}}>
                            <Col>
                                <div className="text-start" style={{fontSize:"32px"}}>
                                    <div style={{marginLeft:"20px"}}>
                                    Envio: Gratis
                                    </div>
                                </div>
                            </Col>
                            </Row>
                            <div className="text-start" style={{ fontSize:"32px", backgroundColor:"#D3D6CF", height:"110px", marginTop:"60px", borderBottomLeftRadius:"10px", borderBottomRightRadius:"10px", display: "flex", alignItems: "center" }}>
                                <div style={{ margin:"20px", marginTop:"20px", marginLeft:"20px" }}>
                                    Total:
                                </div>
                            </div>
                         </div>   
                    </Col>
                <Button className='poppins-regular' style={{ borderColor: "#F4F6F0", borderRadius: "14px", marginTop: "20px", marginLeft: "20px", width: "282px", height: "71px", backgroundColor: "#F4F6F0", color: "#485550", fontSize: "32px" }}>
                    Pagar
                </Button>
            </Col>
        </Row>
    </Container>
     </div>
     </div>
  )
}

export default Cart