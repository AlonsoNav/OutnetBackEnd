import React from 'react'
import './Products.css'
import { useState,useEffect } from 'react';
import {getController, postNoJSONController} from "../context/Actions.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from "react-slider";
import { Form, InputGroup, FormControl, Button,DropdownButton, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faSearch } from '@fortawesome/free-solid-svg-icons';
import Heart from "../assets/heart-svgrepo-com.svg"
import {useNavigate} from "react-router-dom";

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
    const [imageFile, setImageFile] = useState(null);
    const [imageDescription, setImageDescription] = useState("");
    const [imageValidated, setImageValidated] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [searchMP,setSearchMP] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedSearch = JSON.parse(localStorage.getItem('search'));
        if (storedSearch) {
            setSearchTerm(storedSearch)
        }
    }, []);
    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getController("/get_categories");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else {
                        setCategories(body.list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchBrands = async () => {
            try {
                const response = await getController("/get_brands");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else {
                        setBrands(body.list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchProducts = async () => {
            try {
                const response = await getController("/get_products_images");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else
                        setProducts(body.products);
                        setFilteredProducts(body.products);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories()
        fetchBrands()
        fetchProducts()
    }, []);

    

    // Get the min and max for the price range
    useEffect(() => {
        const { maxOutletPrice, minOutletPrice } = products.reduce((acc, product) => {
            return {
                maxOutletPrice: Math.max(product.outlet_price, acc.maxOutletPrice),
                minOutletPrice: Math.min(product.outlet_price, acc.minOutletPrice)
            };
        }, { maxOutletPrice: -Infinity, minOutletPrice: Infinity });
        setMinPrice(parseInt(minOutletPrice))
        setMaxPrice(parseInt(maxOutletPrice))
        setPrice([minPrice, maxPrice])
    }, [products]);

    // Set filters
    useEffect(() => {
        const filteredProducts = products.filter(product => {
            return product.outlet_price >= price[0]
                && product.outlet_price <= price[1]
                && filterProductsByCategory(product)
                && filterProductsByBrand(product)
                && filterProductsBySearchTerm(product);
        });
        setFilteredProducts(filteredProducts);
    }, [price, products, selectedCategories, selectedBrands, searchTerm]);
    
    const handleClick = (product) => {
        console.log("Producto seleccionado:", product);
        localStorage.setItem('producto', JSON.stringify(product));
        // Redireccionar a la vista del producto
        navigate("/view")
      };

    const filterProductsByCategory = (product) => {
        if (selectedCategories.length === 0)
            return true;
        else
            return selectedCategories.includes(product.category);
    };

    const filterProductsByBrand = (product) => {
        if (selectedBrands.length === 0)
            return true;
        else
            return selectedBrands.includes(product.brand);
    };

    const filterProductsBySearchTerm = (product) => {
        if (searchTerm === "")
            return true;
        else {
            const searchTermLowerCase = searchTerm.toLowerCase();
            const productNameLowerCase = product.name.toLowerCase();

            return productNameLowerCase.includes(searchTermLowerCase);
        }
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category))
            setSelectedCategories(selectedCategories.filter(cat => cat !== category)); // If the category is already selected, delete it
        else
            setSelectedCategories([...selectedCategories, category]);
    };

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand))
            setSelectedBrands(selectedBrands.filter(cat => cat !== brand)); // If the category is already selected, delete it
        else
            setSelectedBrands([...selectedBrands, brand]);
    };

    const categoriesCheckboxes = categories.map((category, index) => (
        <Form.Check key={`categoria_${index}`}
                    label={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
        />
    ));

    const brandsCheckboxes = brands.map((brand, index) => (
        <Form.Check key={`marca_${index}`}
                    label={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => handleBrandChange(brand.name)}/>
    ));

    return (
        <Container fluid className="mt-5 min-vh-100 d-flex flex-column justify-content-center">
            <Row classsName='d-flex flex-column justify-content-center'>
                <Col md={4} className='text-start bg-F4F6F0 p-3'>
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
            <Col className='sm p-4'>
                <Row>
                <Col className='h1 poppins-regular text-start' style={{ fontSize: "40px" }}>Productos</Col>
                </Row>
                <Row>
                <Col className='poppins-regular text-start' style={{ fontSize: "20px", color: "#485550" }}><label>{filteredProducts.filter(product => product.amount > 0).length} resultados</label></Col>
                </Row>
                <Row>
                <Col>
                <Form>
                                <InputGroup>
                                    <InputGroup.Text className="bg-F4F6F0">
                                        <FontAwesomeIcon icon={faSearch} className="custom-icon-color"/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        className="bg-F4F6F0"
                                        placeholder="Buscar por nombre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        maxLength="30"
                                    />
                                </InputGroup>
                            </Form>
                </Col>
                </Row>
                
                {/*Productos */}
                <Row>
                <Col>
                {filteredProducts.filter(product => product.amount > 0).map((product, index) => (
                            <div key={index} style={{ 
                            borderRadius:"10px",
                            backgroundColor:"#F4F6F0",
                            marginTop:"15px",
                            width:"100%",
                            height:"173px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                            }}>
                            <Row >
                                <Col>
                                <img
                                    className="d-block w-50"
                                    src={`data:image/png;base64,${product.image}`}          
                                />
                                </Col>
                                <Col >
                                    <Row>
                                        <Col>
                                            <div className='text-start' style={{fontSize:"26px"}}>
                                            <label aria-label={product.name}>{product.name}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className='text-start' style={{marginTop:"30px",fontSize:"32px"}}>
                                                <label aria-label={product.outlet_price}>₡{product.outlet_price}</label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <div className="text-end" >
                                            <Button variant="light" aria-label="agregar a favoritos" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                <img src={Heart} alt="Heart Icon" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                                {' '}
                                            </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col onClick={() => handleClick(product,index)}>
                                            <div style={{marginTop:"40px"}}>
                                                <button  className="add-to-cart-btn" style={{backgroundColor:"#99BA57"}}>Agregar al carrito</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        
                                        ))}
                </Col>
                </Row>
            </Col>
        </Row>
      </Container>
    )
  }

export default Products