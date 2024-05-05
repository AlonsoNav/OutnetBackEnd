import React from 'react'
import './Products.css'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "react-slider";
import { Form, InputGroup, FormControl, Button,DropdownButton, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Heart from "../assets/heart-svgrepo-com.svg"

const Products = () => {
    const [price, setPrice] = useState([0, 100000]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const apiResponse = {
        categories: ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 2', 'Categoría 3', 'Categoría 2', 'Categoría 3', 'Categoría 2', 'Categoría 3'],
        brands: ['Marca 1', 'Marca 2', 'Marca 3']
    };

    const categoriesCheckboxes = apiResponse.categories.map((category, index) => (
        <Form.Check key={`categoria_${index}`} label={category} />
    ));

    const brandsCheckboxes = apiResponse.brands.map((brand, index) => (
        <Form.Check key={`marca_${index}`} label={brand} />
    ));

    return (
      <Container style={{ width: '1902px', paddingLeft: '0',marginTop:"100px" }}>
            <Row>
                <Col md={4} className='text-start' style={{ backgroundColor: "#F4F6F0", width: "497px", minHeight: "auto", paddingLeft: "0",marginRight:"50px" }}>
                <div className="bg-F4F6F0 py-2 px-3 text-start div-scroll">
                        <h1 className="display-6">Filtros</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Precio<br/>
                                    <p className="h6 mt-1">Rango: ₡{price.at(0)} - ₡{price.at(1)}</p>
                                </Form.Label>
                                <Slider
                                    className="slider w-100 mt-1"
                                    value={price}
                                    onChange={setPrice}
                                    min={minPrice}
                                    max={maxPrice}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Categoría</Form.Label>
                                {categoriesCheckboxes}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Marca</Form.Label>
                                {brandsCheckboxes}
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            <Col style={{width: "calc(100% - 497px)" }}>
                <Row>
                <Col className='poppins-regular text-start' style={{ fontSize: "40px" }}>Productos</Col>
                </Row>
                <Row>
                <Col className='poppins-regular text-start' style={{ fontSize: "20px", color: "#485550" }}>{'x'} resultados</Col>
                </Row>
                <Row>
                <Col>
                    <InputGroup style={{ backgroundColor: "#F4F6F0", width: "100%", borderRadius: "20px" }}>
                    <Button style={{ backgroundColor: "#F4F6F0", borderColor: "#F4F6F0" }}>
                        <FaSearch style={{ color: "#99BA57" }} />
                    </Button>
                    <FormControl
                        style={{ backgroundColor: "#F4F6F0", borderColor: "#F4F6F0" }}
                        placeholder="Busca un producto..."
                        aria-label="Busca un producto..."
                        aria-describedby="basic-addon2"
                    />
                    </InputGroup>
                </Col>
                </Row>
                <Row>
                <Col className='poppins-regular text-start' style={{ color: "FFFFF", marginTop: "20px" }}>
                    <DropdownButton
                    className='poppins-regular text-start'
                    id="sort-dropdown"
                    title="Ordenar alfabéticamente"
                    variant='#99BA57'
                    style={{ backgroundColor: "#99BA57", width: "239px", borderRadius: "10px" }}
                    >
                    <Dropdown.Item style={{ backgroundColor: "#99BA57" }} eventKey="1">Opción 1</Dropdown.Item>
                    <Dropdown.Item style={{ backgroundColor: "#99BA57" }} eventKey="2">Opción 2</Dropdown.Item>
                    <Dropdown.Item style={{ backgroundColor: "#99BA57" }} eventKey="3">Opción 3</Dropdown.Item>
                    </DropdownButton>
                </Col>
                </Row>
                {/*Productos */}
                <Row>
                <Col>
                    <div style={{ 
                        borderRadius:"10px",
                        backgroundColor:"#F4F6F0",
                        marginTop:"15px",
                        width:"100%",
                        height:"173px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                        }}>
                        <Row style={{width:"720px"}}>
                            <Col>
                                Imagen
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <div>
                                            Producto titulo
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{marginTop:"40px"}}>
                                            Precio producto
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <div className="text-end" >
                                        <Button variant="light" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                            <img src={Heart} alt="Heart Icon" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                            {' '}
                                        </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div style={{marginTop:"40px"}}>
                                            <button className="add-to-cart-btn" style={{backgroundColor:"#99BA57"}}>Agregar al carrito</button>
                                        </div>
                                    </Col>
                                </Row>
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