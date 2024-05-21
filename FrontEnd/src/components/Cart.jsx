import React from 'react'
import Container from 'react-bootstrap/Container';
import { useState,useEffect } from 'react';
import {getController, postNoJSONController} from "../context/Actions.jsx";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Eliminar from '../assets/x-symbol-svgrepo-com.svg'


const Cart = () => {


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
    let subtotal = 0;
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);



    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setItems([]);
    };

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
    const handleIncrement = (product) => {
        if (product.quantity < product.amount) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecrement = (product) => {
        if (product.quantity > 1) {
            setQuantity(product.quantity - 1);
        }
    };

    const handlePay = () => {
        navigate("/payment")
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ maxWidth: "1516px", width: "100%", margin: "0 auto" }}>
                <Container style={{  marginTop:"50px",marginRight: "550px", marginLeft: "0", maxWidth: "100%"  }}>
                    <Row style={{ width: "1516px" }}>
                        <Col style={{ overflowY: "auto", overflowX: 'hidden', backgroundColor: "#F4F6F0", height: "491px", borderRadius: "10px", width: "976px" }}>
                            {/* Producto */}
                            {cart.forEach(product => {
                                const productSubtotal = product.outlet_price * product.quantity;
                                subtotal += productSubtotal;
                            })}
                            {cart.map((product, index) => (
                                <div key={index} style={{ marginTop: "40px", margin: "40px", backgroundColor: "#FFFF", borderRadius: "10px", alignItems: "center", width: "881px", height: "195px" }}>
                                    <div className='text-start' style={{ width: "100px", height: "100px" }}>
                                        <Row style={{ width: "881px", height: "195px" }}>
                                            <Col>
                                                <div style={{ marginLeft: "20px" }}>
                                                    <Row style={{ width: "881px", height: "195px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <Col>
                                                            <img
                                                                className="d-block w-50"
                                                                src={`data:image/png;base64,${product.image}`}
                                                            />
                                                        </Col>
                                                        <Col className="d-block w-50" style={{fontSize:"24px"}}>
                                                            <div>
                                                                {product.name}
                                                            </div>
                                                            <div>
                                                                ₡{product.outlet_price}
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="d-flex align-items-center">
                                                                <button aria-label="decrementar del carrito" className="btn btn-outline-secondary" style={{ borderColor: "#000000", borderWidth: '1px', fontSize: "20px" }} onClick={handleDecrement}>
                                                                    -
                                                                </button>
                                                                <div style={{ borderWidth: '5px', borderColor: "#000000" }}>
                                                                    <span className="mx-2">{product.quantity}</span>
                                                                </div>
                                                                <button aria-label="incrementar al carrito" className="btn btn-outline-secondary" style={{ borderColor: "#000000", borderWidth: '1px', fontSize: "20px" }} onClick={() => handleIncrement(product)}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </Col>
                                                        <Col className="text-end" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'flex-end' }}>
                                                            <button className="btn btn-outline-secondary" style={{ backgroundColor: "#485550", borderColor: "#000000", borderWidth: '1px', height: "195px", width: "70px" }} onClick={() => removeFromCart(index)}>
                                                                <img src={Eliminar} alt="Eliminar de carrito" style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))}
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
                                                    SubTotal:₡{subtotal}
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
                                            Total:₡{subtotal}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Button  onClick={handlePay} className='poppins-regular' style={{ borderColor: "#F4F6F0", borderRadius: "14px", marginTop: "20px", marginLeft: "20px", width: "282px", height: "71px", backgroundColor: "#F4F6F0", color: "#485550", fontSize: "32px" }}>
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