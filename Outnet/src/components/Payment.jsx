import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Payment = () => {
  return (
    <Container style={{marginRight:"0",marginLeft:"100px"}}>
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
                <input type="text" placeholder="Detalles de envio" style={{border: "none",fontSize:"24px",marginTop:"5px",width:"881px", height:"97px", borderRadius:"10px"}} />
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
                <input style={{border: "none",width:"881px",height:"75px", borderRadius:"10px",fontSize:"24px"}} type="text" placeholder="Nombre en la tarjeta" />
                </div>
                <div>
                <label style={{color:"#485550",fontSize:"24px"}}>Número de tarjeta</label><br></br>
                <input style={{border: "none",width:"881px",height:"75px", borderRadius:"10px",fontSize:"24px"}} type="text" placeholder="Número de tarjeta" />
                </div>
                <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                    <label style={{color:"#485550",fontSize:"24px"}}>Fecha de vencimiento</label><br></br>
                    <input style={{border: "none",width:"421px",height:"75px", borderRadius:"10px",fontSize:"24px"}} type="text" placeholder="MM/AA" />
                </div>
                <div style={{marginLeft:"27px"}}>
                    <label style={{color:"#485550",fontSize:"24px"}}>CVC</label><br></br>
                    <input style={{border: "none",width:"421px",height:"75px", borderRadius:"10px",fontSize:"24px"}} type="text" placeholder="CVC" />
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
                    fontSize:"32px"
                }}
                >
                Pagar
                </button>
            </div>
            </div>
        </Col>

            <Col md={4} style={{ marginLeft: "50px", backgroundColor: "#99BA57", maxHeight: "482px", borderRadius: "10px", maxWidth: "487px" }}>
                <Col>
                <div style={{ marginTop: "40px", backgroundColor: "#FFFF", borderRadius: "10px", width: "431px",minHeight:"402px", justifyContent: "center", alignItems: "center" }}>
                    <Row>
                    <Col>
                        <div className='poppins-regular' style={{ fontSize:"48px", justifyContent: "center"}}>
                        Orden
                        </div>
                    </Col>
                    </Row>
                        <Row>
                        <Col>
                            <div >
                            Orden
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                            <div >
                            Orden
                            </div>
                        </Col>
                        </Row>
                </div>
                </Col>
            </Col>
        </Row>
  </Container>
  )
}

export default Payment