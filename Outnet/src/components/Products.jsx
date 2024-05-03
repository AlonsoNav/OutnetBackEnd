import React from 'react'
import './Products.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Badge, Form, InputGroup, Card,FormControl, Button,DropdownButton, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Products = () => {
  return (
    
    <Container style={{width:'1602', marginLeft:0,marginRight:0}}>
            <Row style={{width:'1900px'}}>
            <Col md={4} className='text-start' style={{ backgroundColor: "#F4F6F0", width: "497px",minHeight:"auto",marginLeft:"25px"}}>
                <div className='Filtros' style={{marginRight:"100px",borderRadius:"20px"}}>
                    <div className="me-auto" style={{margin:"15px"}}>
                        <h5 className='ms-auto poppins-regular' style={{fontSize:"28px"}}>Filtros</h5>
                        <Form.Group>
                            <Form.Label className="poppins-regular" style={{fontSize:"28px"}}>Precio</Form.Label>
                            <input type="range" className="form-range" min="0" max="1000000" step="10000" id="customRange2"></input>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="poppins-regular"  style={{fontSize:"28px"}}>Categoría</Form.Label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="poppins-regular"  style={{fontSize:"28px"}}>Estado</Form.Label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="poppins-regular" style={{fontSize:"28px"}}>Marca</Form.Label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </Col>
            <Col style={{marginLeft:40,width:"1080px"}}>
                <Row>
                    <Col className='poppins-regular text-start' style={{fontSize:"40px"}}>Productos</Col>
                </Row>
                <Row>
                    <Col className='poppins-regular text-start' style={{fontSize:"20px", color:"#485550"}}>{'x'} resultados</Col>
                </Row>
                <Row style={{width:"1080"}}>
                    <Col style={{width:"1080px"}}>
                    <InputGroup style={{backgroundColor:"#F4F6F0",width:"1080px",borderRadius:"20px"}}>
                        <Button style={{backgroundColor:"#F4F6F0",borderColor:"#F4F6F0"}}>
                                <FaSearch style={{color:"#99BA57"}}/>
                            </Button>
                        <FormControl
                            style={{backgroundColor:"#F4F6F0",borderColor:"#F4F6F0"}}
                            placeholder="Busca un producto..."
                            aria-label="Busca un producto..."
                            aria-describedby="basic-addon2"
                        />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className='poppins-regular text-start' style={{color:"FFFFF",marginTop:"20px"}}>
                    <DropdownButton 
                        className='poppins-regular text-start'
                        id="sort-dropdown"
                        title="Ordenar alfabéticamente"
                        variant='#99BA57'
                        style={{backgroundColor:"#99BA57",width:"239px",borderRadius:"10px"}}
                    >
                        <Dropdown.Item style={{backgroundColor:"#99BA57"}} eventKey="1">Opción 1</Dropdown.Item>
                        <Dropdown.Item style={{backgroundColor:"#99BA57"}} eventKey="2">Opción 2</Dropdown.Item>
                        <Dropdown.Item style={{backgroundColor:"#99BA57"}} eventKey="3">Opción 3</Dropdown.Item>
                    </DropdownButton>
                    </Col>
                </Row>
                <Row style={{width:"1080px"}}>
                    <Col>
                    <div style={{backgroundColor:"#F4F6F0", marginTop:"15px",width:"1080px",height:"173px"}}>
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
            </Col>    
            </Row>
    </Container>
  )
}

export default Products