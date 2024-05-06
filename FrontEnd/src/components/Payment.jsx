import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Payment = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div style={{ maxWidth: "1516px", width: "100%", margin: "0 auto" }}>
        <Container style={{ marginTop:"50px",marginRight: "550px", marginLeft: "0", maxWidth: "100%" }}>
            <Row style={{ width:"1516px"}} >
                <Col
                    className="overflow-auto"
                    style={{
                    backgroundColor: "#F4F6F0",
                    height: "818px",
                    borderRadius: "10px",
                    width: "996px",
                    }}
                >
                    <div
                    style={{
                        marginTop: "40px",
                        margin: "40px",
                        borderRadius: "10px",
                        alignItems: "center",
                        padding: "20px",
                    }}
                    >
                <div className="text-start" style={{ marginBottom: "20px" }}>
                    <h4 style={{color:"#485550",fontSize:"44px"}}>Detalles de envío</h4>
                    <div
                    style={{
                        width:"881px",height:"1px",backgroundColor:"#485550"
                    }}
                    />
                    <input type="text" style={{backgroundColor:"#FFFFFF",border: "none",fontSize:"24px",marginTop:"5px",width:"881px", height:"97px", borderRadius:"10px"}} />
                </div>
                <div className="text-start" style={{ marginBottom: "20px",marginTop:"20px"}}>
                    <h4 style={{color:"#485550",fontSize:"44px"}}>Detalles de pago</h4>
                    <div
                    style={{
                        width:"881px",height:"1px",backgroundColor:"#485550"
                    }}
                    />
                    <div>
                    <label style={{color:"#485550",fontSize:"24px"}}>Nombre en la tarjeta</label><br></br>
                    <input style={{backgroundColor:"#FFFFFF",border: "none",width:"881px",height:"75px", borderRadius:"10px",marginTop:"5px",fontSize:"24px"}} type="text"  />
                    </div>
                    <div>
                    <label style={{color:"#485550",fontSize:"24px"}}>Número de tarjeta</label><br></br>
                    <input style={{backgroundColor:"#FFFFFF",border: "none",width:"881px",height:"75px", borderRadius:"10px",marginTop:"5px",fontSize:"24px"}} type="text"  />
                    </div>
                    <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "10px" }}>
                        <label style={{color:"#485550",fontSize:"24px"}}>Fecha de vencimiento</label><br></br>
                        <input style={{backgroundColor:"#FFFFFF",border: "none",width:"421px",height:"75px", borderRadius:"10px",marginTop:"5px",fontSize:"24px"}} type="text" />
                    </div>
                    <div style={{marginLeft:"27px"}}>
                        <label style={{color:"#485550",fontSize:"24px"}}>CVC</label><br></br>
                        <input style={{backgroundColor:"#FFFFFF",border: "none",width:"421px",height:"75px", borderRadius:"10px",marginTop:"5px",fontSize:"24px"}} type="text" />
                    </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    style={{
                        backgroundColor: "#99BA57",
                        color: "#FFFFFF",
                        border: "none",
                        marginLeft:"45px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        minWidth:"881px", 
                        height:"71px",
                        fontSize:"32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    Pagar
                </button>

                </div>
                </div>
            </Col>

                <Col md={4} style={{ marginLeft: "50px", backgroundColor: "#99BA57", maxHeight: "482px", borderRadius: "10px", maxWidth: "487px" }}>
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
                                    SubTotal:₡{0}
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
                                    Total:₡{0}
                                </div>
                            </div>
                         </div>   
                    </Col>
                </Col>
            </Row>
    </Container>
    </div>
    </div>
    
  )
}

export default Payment