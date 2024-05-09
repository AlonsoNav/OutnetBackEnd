import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import {deleteController, getController, postController, postNoJSONController} from "../context/Actions.jsx";

const Payment = () => {

    const [price, setPrice] = useState([0, 100000]);
    const [products, setProducts] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [toastTitle, setToastTitle] = useState('Error');
    const [imageList, setImageList] = useState([]);
    const [validated, setValidated] = useState(false);
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [userData, setUserData] = useState({});
    const [name,setName]= useState('')
    const [address,setAddress] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate();
    let subtotal = 0;
    let shipping_cost = 0;
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [cvc, setCVC] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
     // Variables for the modal
     const [showModal, setShowModal] = useState(false)
     const [modalBody, setModalBody] = useState('')
     const [modalTitle, setModalTitle] = useState('')
     const [modalBtn1Style, setModalBtn1Style] = useState('')
     const [modalBtn2Style, setModalBtn2Style] = useState('')
     const [modalBtn1Text, setModalBtn1Text] = useState('')
     const [modalBtn2Text, setModalBtn2Text] = useState('')
     const [modalBtn2Show, setModalBtn2Show] = useState(false)

    // Función de validación
    const handleChangeName= (newValue) => {
        const nameRegex = /^[A-Za-z]+\s[A-Za-z]+(\s[A-Za-z]+){2}$/;
        const isNameValid = nameRegex.test(name);

        if (isNameValid)
            setName(newValue);
    };
    const handleChangeCVC= (newValue) => {
        const cvcRegex = /^[0-9]{3,4}$/;
        
        const isCVCValid = cvcRegex.test(cvc);

        if (isCVCValid)
            setCVC(newValue);
    };
    const handleChangeExpDate= (newValue) => {
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        const isExpiryDateValid = expiryDateRegex.test(expiryDate);

        if (isExpiryDateValid)
            setExpiryDate(newValue);
    };
    const handleChangeCard= (newValue) => {
        const cardNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        const isCardNumberValid = cardNumberRegex.test(cardNumber);

        if (isCardNumberValid)
            setCardNumber(newValue);
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            console.log(cart)
            setCart(storedCart);
        }
    }, []);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setUserData(storedUserData);
            setAddress(storedUserData.address)
            setEmail(storedUserData.email)
        }
    }, []);

    const messageFromAPI = (title, message) =>{
        setModalTitle(title)
        setModalBody(message)
        setModalBtn1Text("OK")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Show(false)
        setShowModal(true)
    }

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    };


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }
        
        const cartProducts = cart.map(product => ({id :product.id, quantity:product.quantity}));

        let payload = {
            email: email,
            subtotal: subtotal,
            total: subtotal,
            shipping_cost: shipping_cost,
            carts: cartProducts
        }
        
        try {
            let response = await postController(payload, "create_sale")

            if (!response) {
                setToastMessage("Fallo inesperado en la conexión");
                setToastBg("danger")
                setToastTitle("Error")
                setShowToast(true);
            }else{
                const body = await response.json();
                if (response.ok){
                    messageFromAPI('Compra exitosa', 'Compra realizada con exito')
                    
                    
                }
                else{
                    setToastBg("danger")
                    setToastTitle("Error")
                    setToastMessage(body.message)
                    setShowToast(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button className={modalBtn1Style} onClick={()=>{setShowModal(false),clearCart(),
                    navigate('/products')}}>{modalBtn1Text}</button>
                    
                </Modal.Footer>
            </Modal>
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
                    
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <div className="text-start" style={{ marginBottom: "20px" }}>
                            <h4 style={{color:"#485550",fontSize:"44px"}}>Detalles de envío</h4>
                            <div
                            style={{
                                width:"881px",height:"1px",backgroundColor:"#485550"
                            }}
                            />
                           <Form.Group className="mb-3">
                                
                                <Form.Control
                                    required
                                    disabled
                                    readOnly
                                    value={address}
                                    placeholder="Dirección"
                                    type="text"
                                    
                                />
                                <Form.Control.Feedback type={"invalid"}>Por favor, dirijase a perfil e ingrese una dirección.</Form.Control.Feedback>
                            </Form.Group>
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
                                <Form.Group className="mb-3">
                                
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nombre y apellidos"
                                        aria-label="nombre en la tarjeta"
                                        onChange={(e) => handleChangeName(e.target.value)}
                                        maxLength={30}
                                        
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Por favor escriba un nombre válido].</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div>
                            <label style={{color:"#485550",fontSize:"24px"}}>Número de tarjeta</label><br></br>
                            <Form.Group className="mb-3">
                                    
                                    <Form.Control
                                        required
                                        type="text"
                                        onChange={(e) => handleChangeCard(e.target.value)}
                                        
                                        aria-label="numero de tarjeta"
                                        maxLength={16}
                                        
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Por favor escriba un número de tarjeta válido.</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div style={{ display: "flex" }}>
                            <div style={{ marginRight: "10px" }}>
                                <label style={{color:"#485550",fontSize:"24px"}}>Fecha de vencimiento</label><br></br>
                                <Form.Group className="mb-3">
                                
                                    <Form.Control
                                        required
                                        type="text"
                                        
                                        aria-label="fecha de vencimiento"
                                        onChange={(e) => handleChangeExpDate(e.target.value)}
                                        maxLength={5}
                                        
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Por favor escriba una fecha de vencimiento válida.</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div  style={{ marginLeft: "270px" }}>
                                <label style={{ color: "#485550", fontSize: "24px" }}>CVC</label><br />
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        required
                                        type="text"
                                       
                                        aria-label="cvc"
                                        maxLength={3}
                                        onChange={(e) => handleChangeCVC(e.target.value)}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Por favor escriba un CVC válido.</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button
                                type='submit'
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
                                aria-label="PAGAR"
                                
                            >
                                Pagar
                            </button>
                        </div>
                    
            
                        </Form>
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
                        {cart.forEach(product => {
                            const productSubtotal = product.outlet_price * product.quantity;
                            subtotal += productSubtotal;
                        })}
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
                </Col>
            </Row>
    </Container>
    </div>
    </div>
    
  )
}

export default Payment