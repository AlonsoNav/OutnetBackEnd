import './ProductView.css'
import React from 'react'
import {useNavigate} from "react-router-dom";
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import Carousel from "react-bootstrap/Carousel";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {getController, postNoJSONController} from "../context/Actions.jsx";
import Toast from "react-bootstrap/Toast";



const ProductView = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [toastTitle, setToastTitle] = useState('Error');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageDescription, setImageDescription] = useState("");
    const [imageValidated, setImageValidated] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [producto, setProducto] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log(cart)
        navigate("/products")
      };

    useEffect(() => {
        const storedProduct = localStorage.getItem('producto');
        if (storedProduct) {
            setProducto(JSON.parse(storedProduct));
            }
    }, []);
    

    useEffect(() => {

        const fetchImages = async () => {
            try {
                const response = await getController("/get_images");
                const body = await response.json();
                setImageList(body.images);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages()

    }, []);

    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
    };

    const handleSelect = (selectedIndex, e) => {
        setSelectedIndex(selectedIndex);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 38 && selectedIndex > 0) { // Flecha arriba
            setSelectedIndex(selectedIndex - 1);
        } else if (e.keyCode === 40 && selectedIndex < imageList.length - 1) { // Flecha abajo
            setSelectedIndex(selectedIndex + 1);
        }
    };
    const handleIncrement = (producto) => {
        if (quantity < producto.amount) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    
      const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };

  return (
    <div className='MainPV'>
        <Row style={{backgroundColor:"#F4F6F0", minHeight:"729px", borderRadius:"10px"}}>
            <Col>
                <div>
                    <div className="col-md-5 py-1 px-2">
                            <div className="row bg-F4F6F0 py-3 px-2" tabIndex="0" onKeyDown={handleKeyDown}>
                                <div className="col-auto carousel-image-button-scroll">
                                    {imageList.map((image, index) => (
                                        <div className="row mb-1" key={index}>
                                            <div className="col">
                                                    <img
                                                        src={`data:image/png;base64,${image.image}`}
                                                        className={`carousel-image-button ${index === selectedIndex ? 'selected' : ''}`}
                                                        alt={image.description}
                                                        onClick={() => handleThumbnailClick(index)}
                                                    />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col flex-grow-1">
                                    <Carousel activeIndex={selectedIndex} onSelect={handleSelect}>
                                        {imageList.map((image, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100"
                                                    src={`data:image/png;base64,${image.image}`}
                                                    alt={`Slide ${index}`}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                        </div>    </div>
                </div>
            </Col>
            <Col >
                <Row style={{marginTop:"40px"}}>
                    <Col>
                    <div className="text-start" style={{color:"#485550",fontSize:"40px"}}>
                    {producto.name}
                    </div>
                    </Col>
                </Row>
                <Row style={{marginTop:"40px"}}>
                    <Col>
                    <div className="text-start" style={{color:"#485550",fontSize:"32px"}}>
                    Descripción</div>
                    </Col>
                </Row>
                <Row style={{marginTop:"40px"}}>
                    <Col>
                    <div className="text-start" style={{color:"#485550",fontSize:"24px"}}>
                    {producto.description}</div>
                    </Col>
                </Row >
                <Row style={{marginTop:"40px"}}>
                    <Col>
                    <div className="text-start" style={{fontSize:"40px"}}>
                    ₡{producto.outlet_price}</div>
                    </Col>
                </Row>
                <Row style={{marginTop:"40px"}}>
                    <Col>
                    <div>
                        <Row style={{marginTop:"25px",width:"640px"}}>
                            <Col> 
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary" style={{borderColor:"#000000",borderWidth:'1px',fontSize:"20px"}} onClick={handleDecrement}>
                                    -
                                </button>
                                <div style={{borderWidth:'5px',borderColor:"#000000"}}>
                                <span className="mx-2" >{quantity}</span>
                                </div>
                                <button className="btn btn-outline-secondary" style={{ borderColor:"#000000",borderWidth:'1px',fontSize:"20px"}} onClick={() => handleIncrement(producto)}>
                                    +
                                </button>
                            </div>
                                </Col>
                            <Col>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button onClick={() => addToCart(producto)} className="add-to-cart-btn" style={{ height: "60px", fontSize: "28px", width: "412px", backgroundColor: "#99BA57", justifyContent: 'center', display: 'flex', alignItems: 'center' }}>Agregar al carrito</button>
                            </div>
                            </Col>
                        </Row>
                    </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
  )
}

export default ProductView