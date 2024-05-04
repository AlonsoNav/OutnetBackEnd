import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Cart = () => {
      return (
        <Container style={{marginRight:"0",marginLeft:"100px"}}>
          <Row style={{ width:"1516px"}} >
            <Col className="overflow-auto" style={{ backgroundColor: "#F4F6F0", height: "491px", borderRadius: "10px",width:"976px"}}>
                <div style={{ marginTop: "40px",margin: "40px", backgroundColor: "#FFFF", borderRadius: "10px", alignItems: "center"}}>
                  <div className='text-start' style={{ width: "100px", height: "100px" }}>
                      <Row style={{width:"881px"}}>
                          <Col>
                          <div style={{margin:"20px"}}>
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

            <Col md={4} style={{ marginLeft: "50px", backgroundColor: "#99BA57", minHeight: "562px", borderRadius: "10px", maxWidth: "487px" }}>
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
              <Button className='poppins-regular' style={{borderColor:"#F4F6F0",borderRadius:"14px",marginTop:"20px",width:"282px",height:"71px",backgroundColor:"#F4F6F0",color:"#485550",fontSize:"32px"}}>
                Pagar
              </Button>
            </Col>
          </Row>
        </Container>
  )
}

export default Cart