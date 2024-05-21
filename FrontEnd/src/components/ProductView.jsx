import './ProductView.css'
import React from 'react'
import {useNavigate} from "react-router-dom";
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import Carousel from "react-bootstrap/Carousel";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {deleteController, getController, postController, postNoJSONController} from "../context/Actions.jsx";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Profile from "../assets/profile.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faShoppingCart, faBox, faHandHoldingUsd, faSignOut} from '@fortawesome/free-solid-svg-icons';


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
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [pId, setPid] = useState(0);
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)


    const [userData, setUserData] = useState({});
    const [address,setAddress] = useState('')
    const [email,setEmail] = useState('')
    const [commentsP,setCommentsP] = useState([])
    const [comments, setComments] = useState('');


    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];

    });
    const navigate = useNavigate();

    const noResponse = () =>{
        setModalTitle("Error")
        setModalBody("Fallo inesperado en el servidor.")
        setModalBtn1Text("OK")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Show(false)
        setShowModal(true)
    }

    const messageFromAPI = (title, message) =>{
        setModalTitle(title)
        setModalBody(message)
        setModalBtn1Text("OK")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Show(false)
        setShowModal(true)
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getController("/get_comments_product");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else
                        setCommentsP(body.comments);
                    console.log(commentsP)

                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments()
    }, []);

    const addToCart = (product,quantity) => {
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        console.log(cart)
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza su cantidad
            const updatedCart = cart.map((item, index) => {
                if (index === existingProductIndex) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            const updatedProduct = { ...product, quantity: quantity };
            const updatedCart = [...cart, updatedProduct];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        navigate("/products");
    };

    useEffect(() => {
        const storedProduct = localStorage.getItem('producto');
        if (storedProduct) {
            setProducto(JSON.parse(storedProduct));
            setPid(producto.Pid)
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


    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
    };

    const handleSelect = (selectedIndex, e) => {
        setSelectedIndex(selectedIndex);
    };


    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (comments.trim() === '') {
            // Mostrar un mensaje de error o realizar alguna acción
            messageFromAPI("Comentario vacío", "El comentario no puede estar vacío.")
            setShowModal(true);

            return; // Salir de la función si el campo está vacío
        }

        // Recopilar los valores de los campos

        let payload = {
            id: producto.id,
            email: email,
            comment: comments,
            rating: rating
        };

        try {
            let response = await postController(payload, "create_comment")

            if (!response) {
                setToastMessage("Fallo inesperado en la conexión");
                setToastBg("danger")
                setToastTitle("Error")
                setShowToast(true);
            }else{
                messageFromAPI("Creación de comentario exitosa", "El comentario ha sido creado correctamente.")
                setShowModal(true);
                const body = await response.json();
                if (response.ok){
                    setShowCreateModal(true)
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

    const handleIncrementRating = () => {
        if (rating < 5) {
            setRating(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecrementRating = () => {
        if (rating > 0) {
            setRating(rating - 1);
        }
    };

    return (
        <div style={{minWidth:"1500px", marginTop:"100px"}}>
            <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button className={modalBtn1Style} onClick={()=>setShowModal(false)}>{modalBtn1Text}</button>
                </Modal.Footer>
            </Modal>
            <Row style={{backgroundColor:"#F4F6F0", minHeight:"729px", borderRadius:"10px"}}>
                <Col>
                    <div>
                        <div className="col-md-8 py-1 px-2">
                            <div className="row bg-F4F6F0 py-3 px-2" tabIndex="0" onKeyDown={handleKeyDown}>
                                <div className="col-auto carousel-image-button-scroll">
                                    <img
                                        className="d-block w-100"
                                        src={`data:image/png;base64,${producto.image}`}
                                    />
                                </div>
                                <div className="col flex-grow-1">
                                    <Carousel activeIndex={selectedIndex} onSelect={handleSelect}>
                                        {imageList.map((image, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100"
                                                    src={`data:image/png;base64,${producto.image}`}
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
                                <label>{producto.name}</label>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"40px"}}>
                        <Col>
                            <div className="text-start" style={{color:"#485550",fontSize:"32px"}}>
                                <label> Descripción</label></div>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"40px"}}>
                        <Col>
                            <div className="text-start" style={{color:"#485550",fontSize:"24px"}}>
                                <label>{producto.description}</label></div>
                        </Col>
                    </Row >
                    <Row style={{marginTop:"40px"}}>
                        <Col>
                            <div className="text-start" style={{fontSize:"40px"}}>
                                <label>₡{producto.outlet_price}</label></div>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"40px"}}>
                        <Col>
                            <div>
                                <Row style={{marginTop:"25px",width:"640px"}}>
                                    <Col>
                                        <div className="d-flex align-items-center" style={{backgroundColor:"#99BA57", borderRadius:"10px",width:"150px"}}>
                                            <button aria-label="decrementar del carrito" className="btn btn-outline-secondary" style={{borderColor:"#99BA57",borderWidth:'1px',fontSize:"28px",borderRadius:"10px",color:"white"}} onClick={handleDecrement}>
                                                -
                                            </button>
                                            <div style={{borderWidth:'5px',borderColor:"#99BA57"}}>
                                                <span className="mx-2 text-center" style={{fontSize:"30px",color:"white"}} >{quantity}</span>
                                            </div>
                                            <FontAwesomeIcon icon={faShoppingCart}  style={{ color:"white" }}/>
                                            <button aria-label="incrementar al carrito"  className="btn btn-outline-secondary" style={{ borderColor:"#99BA57",borderWidth:'1px',fontSize:"28px",borderRadius:"10px",color:"white"}} onClick={() => handleIncrement(producto)}>
                                                +
                                            </button>

                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button onClick={() => addToCart(producto,quantity)} className="add-to-cart-btn" style={{ height: "60px", fontSize: "28px", width: "412px", backgroundColor: "#99BA57", justifyContent: 'center', display: 'flex', alignItems: 'center' }}>Agregar al carrito</button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className='text-start' style={{marginTop:"20px"}}>
                    <h1 style={{color:"#485550"}}>Comentarios</h1>
                    <div style={{backgroundColor:"#F4F6F0",width:"1554px",height:"276px"}}>
                        <Row>
                            <Col className="text-start">
                                <Row className="align-items-center justify-content-center" style={{ height: "100px" }}>
                                    <Col className="text-center">
                                        <div style={{ maxWidth: "75%", maxHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <img src={Profile} alt="" style={{ maxWidth: "75%", maxHeight: "100%"}} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="align-items-center px-5" style={{fontSize:"28px",marginTop:"100px",marginLeft:"50px"}}><Col>Tú</Col></Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                                        <div className="d-flex align-items-center" style={{backgroundColor:"#99BA57", borderRadius:"10px"}}>
                                            <button aria-label="decrementar calificación"  className="btn btn-outline-secondary" style={{borderColor:"#99BA57",borderWidth:'1px',fontSize:"28px",borderRadius:"10px",color:"white"}} onClick={handleDecrementRating}>
                                                -
                                            </button>
                                            <div style={{borderWidth:'5px',borderColor:"#99BA57"}}>
                                                <span className="mx-2 text-center" style={{fontSize:"30px",color:"white"}} >{rating}</span>
                                            </div>
                                            <FontAwesomeIcon icon={faStar}  style={{ color:"white" }}/>
                                            <button aria-label="incrementar calificación" className="btn btn-outline-secondary" style={{ borderColor:"#99BA57",borderWidth:'1px',fontSize:"28px",borderRadius:"10px",color:"white"}} onClick={() => handleIncrementRating()}>
                                                +
                                            </button>
                                        </div>
                                    </Col>
                                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                                        <button onClick={handleSubmit} className="btn" type='submit' style={{backgroundColor:"#99BA57",borderWidth:'1px',fontSize:"28px",borderRadius:"10px",color:"white",width:"200px"}}>
                                            Subir
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mb-1 text-start"  style={{paddingRight:"100px"}}>
                                        <Form.Group className="mb-1"  style={{paddingRight:"100px",backgroundColor:"#F4F6F0",width:"1102px",height:"150px"}}>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            required
                                            placeholder="Comenta aquí"
                                            value={comments}
                                            style={{height:"150px"}}
                                            onChange={(e) => {setComments(e.target.value)}}
                                            maxLength={140}
                                        />
                                        </Form.Group>

                                    </Col>
                                </Row>

                            </Col>
                        </Row>

                    </div>
                </Col>
            </Row>

            {commentsP.filter(comment => comment.id === producto.id).map((comment, index) => (

                <Row key={index}>
                    <Col className='text-start' style={{marginTop:"20px"}}>
                        <div style={{backgroundColor:"#F4F6F0",width:"1554px",height:"276px"}}>
                            <Row>
                                <Col className="text-start">
                                    <Row className="align-items-center justify-content-center" style={{ height: "100px" }}>
                                        <Col className="text-center">
                                            <div style={{ maxWidth: "75%", maxHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <img src={Profile} alt="" style={{ maxWidth: "75%", maxHeight: "100%"}} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="align-items-center px-5" style={{fontSize:"28px",marginTop:"100px",marginLeft:"50px"}} aria-label={comment.userName}><Col>{comment.userName}</Col></Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                                            <div className="d-flex align-items-center justify-content-center text-center" style={{backgroundColor:"#99BA57", borderRadius:"10px", width:"250px"}}>
                                                <div style={{borderWidth:'5px', borderColor:"#99BA57"}}>
                                                    <span className="mx-2 text-center" style={{fontSize:"30px", color:"white"}} aria-label={comment.star_rating}>{comment.star_rating}</span>
                                                </div>
                                                <FontAwesomeIcon icon={faStar}  style={{color:"white"}} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mb-1 text-start"  style={{paddingRight:"100px"}}>
                                            <Form.Group className="mb-1"  style={{paddingRight:"100px",backgroundColor:"#F4F6F0",width:"1102px",height:"150px"}}>
                                            <textarea
                                                className="form-control"
                                                rows={3}
                                                placeholder="Comenta aquí"
                                                disabled
                                                aria-label={comment.star_rating}
                                                value={comment.description}
                                                maxLength={140}
                                            />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>
            ))}
        </div>
    )
}

export default ProductView