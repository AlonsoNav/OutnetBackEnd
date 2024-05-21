import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup, Tab, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faStar, faHistory,faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Dropdown from 'react-bootstrap/Dropdown';
import {deleteController, getController, postController, postNoJSONController} from "../context/Actions.jsx";
import Profile from "../assets/profile.svg"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';



const commentHistory = () => {

    const [commentsP,setCommentsP] = useState([])
    const [comments, setComments] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [toastTitle, setToastTitle] = useState('Error');
    const [userData, setUserData] = useState({});
    const [address,setAddress] = useState('');
    const [email,setEmail] = useState('');
    const [id, setId] = useState(0)
    const [activeTab, setActiveTab] = useState('rated');
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)

    const handleTabChange = (eventKey) => {
        setActiveTab(eventKey);
    };

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

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setUserData(storedUserData);
            setAddress(storedUserData.address)
            setEmail(storedUserData.email)
        }
    }, []);

    const handleDeleteComment = (commentId) => {
        setId(commentId)
        setModalTitle("Confirmar eliminación del comentario")
        setModalBody("¿Realmente quieres borrar este comentario")
        setModalBtn1Text("Cancelar")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Text("Borrar comentario")
        setModalBtn2Style("btn btn-danger")
        setModalBtn2Show(true)
        setShowModal(true)
    }

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

    const handleConfirmDeleteComment = async () =>{
        setShowModal(false)
        let payload = {id}

        try {
            let response = await deleteController(payload, "delete_comment")

            if (!response)
                noResponse()
            else{
                if (response.ok){
                    const updatedCommentsP = commentsP.filter((comment) => comment.id !== id)
                    setCommentsP(updatedCommentsP)
                    messageFromAPI("Eliminación de comentario exitosa", "El comentario ha sido borrado correctamente.")
                }else{
                    const body = await response.json()
                    messageFromAPI("Error", body.message)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


<<<<<<< HEAD
    return (
        <Row style={{width:"1820px",minHeight:'680px'}}>
            <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
=======
  return (
    <Row className='min-vw-100 mt-5'>
        <h1 className='text-start'>Pedidos y deseos</h1>
        <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
>>>>>>> 660ca34 (Ojala responsive)
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button className={modalBtn1Style} onClick={()=>setShowModal(false)}>{modalBtn1Text}</button>
                    {modalBtn2Show && (
                        <button className={modalBtn2Style} onClick={handleConfirmDeleteComment}>{modalBtn2Text}</button>
                    )}
                </Modal.Footer>
<<<<<<< HEAD
            </Modal>
            <Col>
                <Tab.Container activeKey={activeTab} onSelect={handleTabChange} className="text-start">
                    <Nav variant="pills" className="flex-column text-center">
                        <Nav.Item>
                            <Nav.Link eventKey="history" className="text-start" style={{
                                fontSize: "20px",
                                color: activeTab === "history" ?  "white":"black",
                                backgroundColor: activeTab === "history" ? "#99BA57" : "transparent" ,
                            }}>
                                <FontAwesomeIcon icon={faHistory} /> Historial de pedidos
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="wishlist" className="text-start" style={{
                                fontSize: "20px",
                                color: activeTab === "wishlist" ?  "white":"black",
                                backgroundColor: activeTab === "wishlist" ? "#99BA57" : "transparent" ,
                            }}>
                                <FontAwesomeIcon icon={faClipboardList} /> Lista de deseos
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rated" className="text-start" style={{
                                fontSize: "20px",
                                color: activeTab === "rated" ?  "white":"black",
                                backgroundColor: activeTab === "rated" ? "#99BA57" : "transparent" ,
                            }}
                            >
                                <FontAwesomeIcon icon={faStar} /> Productos calificados
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="history">
                            <div style={{marginTop:"20px", backgroundColor: "#F4F6F0", height: "276px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
                                No hay historial.</div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="wishlist">
                            <div style={{marginTop:"20px", backgroundColor: "#F4F6F0", height: "276px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
                                No hay lista de deseos.</div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="rated">

                            <Row><Col><h1 className='text-start'>Valoraciones</h1></Col></Row>
                            <Row><Col></Col><div className='text-start'>{commentsP.filter(comment => comment.email === userData.email).length} valoraciones</div></Row>
                            <Row>
                                <Col>
                                    <div>
                                        {commentsP.filter(comment => comment.email === userData.email).length === 0 ? (
                                            <div style={{marginTop:"20px", backgroundColor: "#F4F6F0", height: "276px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
                                                No hay comentarios.</div>
                                        ) : (
                                            commentsP.filter(comment => comment.email === userData.email).map((comment, index) => (
                                                <Row key={index}>
                                                    <Col className='text-start' style={{marginTop:"20px"}}>
                                                        <div style={{backgroundColor:"#F4F6F0",height:"276px", borderRadius:"10px"}}>
                                                            <Row>
                                                                <Col className="text-start" style={{maxWidth:"400px"}}>
                                                                    <Row className="align-items-center justify-content-center" style={{ height: "100px" }}>
                                                                        <Col className="text-center">
                                                                            <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%",marginTop:"30px" }}>
                                                                                <img
                                                                                    style={{ maxHeight: "30%", maxWidth: "30%" }}
                                                                                    className="img-fluid"
                                                                                    src={`data:image/png;base64,${comment.image}`}
                                                                                    alt="Imagen"
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="align-items-center px-5" style={{fontSize:"28px",marginTop:"100px",marginLeft:"50px"}}><Col>{comment.userName}</Col></Row>
                                                                </Col>
                                                                <Col>
                                                                    <Row>
                                                                        <Col>
                                                                            <div style={{ fontSize:"20px",display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                                                {comment.pName}
                                                                            </div>
                                                                        </Col>
                                                                        <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                                                                            <div className="d-flex align-items-center justify-content-center text-center" style={{backgroundColor:"#99BA57", borderRadius:"10px", width:"250px"}}>
                                                                                <div style={{borderWidth:'5px', borderColor:"#99BA57"}}>
                                                                                    <span className="mx-2 text-center" style={{fontSize:"30px", color:"white"}} >{comment.star_rating}</span>
                                                                                </div>
                                                                                <FontAwesomeIcon icon={faStar}  style={{color:"white"}} />
                                                                            </div>
                                                                        </Col>
                                                                        <Col>
                                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                                                <button  onClick={() => handleDeleteComment(comment.cId)} className="btn btn-sm btn-danger" style={{ fontSize: "1.5rem", padding: "0.50rem 1.25rem" }}>
                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                </button>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Col className="mb-1 text-start"  style={{paddingRight:"100px"}}>
                                                                            <Form.Group className="mb-1"  style={{paddingRight:"100px",backgroundColor:"#F4F6F0",Width:"1102px",height:"150px"}}>
=======
        </Modal>
      <Col className='mt-3'>
        <Tab.Container activeKey={activeTab} onSelect={handleTabChange} className="text-start">
        <Nav variant="pills" className="flex-column text-center">
            <Nav.Item>
            <Nav.Link eventKey="history" className="text-start" style={{
            fontSize: "20px",
            color: activeTab === "history" ?  "white":"black",
            backgroundColor: activeTab === "history" ? "#99BA57" : "transparent" ,
          }}>
                <FontAwesomeIcon icon={faHistory} /> Historial de pedidos
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="wishlist" className="text-start" style={{
            fontSize: "20px",
            color: activeTab === "wishlist" ?  "white":"black",
            backgroundColor: activeTab === "wishlist" ? "#99BA57" : "transparent" ,
          }}>
                <FontAwesomeIcon icon={faClipboardList} /> Lista de deseos
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="rated" className="text-start" style={{
            fontSize: "20px",
            color: activeTab === "rated" ?  "white":"black",
            backgroundColor: activeTab === "rated" ? "#99BA57" : "transparent" ,
          }}
          >
                <FontAwesomeIcon icon={faStar} /> Productos calificados
            </Nav.Link>
            </Nav.Item>
        </Nav>
        <Tab.Content>
            <Tab.Pane eventKey="history">
            <div className='min-vh-100' style={{marginTop:"20px", backgroundColor: "#F4F6F0", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
                        No hay historial.</div>
            </Tab.Pane>
            <Tab.Pane eventKey="wishlist">
            <div className='min-vh-100' style={{marginTop:"20px", backgroundColor: "#F4F6F0", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
                        No hay lista de deseos.</div>
            </Tab.Pane>
            <Tab.Pane eventKey="rated">
          
                <Row><Col><h2 className='text-start'>Valoraciones</h2></Col></Row>
                <Row><Col></Col><div className='text-start'>{commentsP.filter(comment => comment.email === userData.email).length} valoraciones</div></Row>
                <Row>
                    <Col className='d-flex text-start align-items-center'>
                        <div>
                            {commentsP.filter(comment => comment.email === userData.email).length === 0 ? (
                                <div style={{marginTop:"20px", backgroundColor: "#F4F6F0",borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
                                    No hay comentarios.</div>
                            ) : (
                                commentsP.filter(comment => comment.email === userData.email).map((comment, index) => (
                                    <Row key={index}>
                                        <Col className='text-start mt-3' >
                                            <div style={{backgroundColor:"#F4F6F0", borderRadius:"10px"}}>
                                                <Row>
                                                    <Col className="text-start">
                                                        <Row className="align-items-center justify-content-center">
                                                        <Col className="text-center">
                                                            <div className="d-flex justify-content-center align-items-center" style={{ marginTop:"30px" }}>
                                                                <img
                                                                    style={{ maxHeight: "30%", maxWidth: "30%" }}
                                                                    className="img-fluid"
                                                                    src={`data:image/png;base64,${comment.image}`}
                                                                    alt="Imagen"
                                                                />
                                                            </div>
                                                            <Row className="align-items-center px-5" style={{fontSize:"28px"}}>
                                                            <Col className="align-items-center p-2">{comment.userName}</Col>
                                                            </Row>
                                                        </Col>
                                                        </Row>
                                                        
                                                    </Col>
                                                    <Col>
                                                        <Row  className="d-flex align-items-center">
                                                            <Col>
                                                                <div style={{ fontSize:"20px",display: "flex", justifyContent: "center", alignItems: "center"}}>
                                                                    {comment.pName}
                                                                </div>
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px"}}>
                                                                <div className="d-flex align-items-center justify-content-center text-center" style={{backgroundColor:"#99BA57", borderRadius:"10px", width:"250px"}}>
                                                                    <div style={{borderWidth:'5px', borderColor:"#99BA57"}}>
                                                                        <span className="mx-2 text-center" style={{fontSize:"30px", color:"white"}} >{comment.star_rating}</span>
                                                                    </div>
                                                                    <FontAwesomeIcon icon={faStar}  style={{color:"white"}} />
                                                                </div> 
                                                            </Col>
                                                            <Col>
                                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                                                <button  onClick={() => handleDeleteComment(comment.cId)} className="btn btn-sm btn-danger" style={{ fontSize: "1.5rem", padding: "0.50rem 1.25rem" }}>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </div>
                                                            </Col>
                                                        </Row>
                                                        <Row  className="d-flex align-items-center">
                                                            <Col className="mb-1 text-start"  style={{paddingRight:"100px"}}>
                                                                <Form.Group className="mb-1"  style={{paddingRight:"100px",backgroundColor:"#F4F6F0"}}>
                                                                    <textarea
                                                                        className="form-control"
                                                                        rows={3}
                                                                        placeholder="Comenta aquí"
                                                                        disabled
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
                                            ))
                                        )}
                                    </div>
                                </Col>
                            </Row>

                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

            </Col>
            {/*FIN DEL TAB */}
        </Row>
    )
}

export default commentHistory