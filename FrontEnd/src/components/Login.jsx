import './Style.css'
import logo from '../assets/logo_white.svg'
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal"
import {useState} from "react"
import {useNavigate, Link} from 'react-router-dom'
import {postController} from "../context/Actions.jsx"

const Login = () => {
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)
    const [modalBtn2OnClick, setModalBtn2OnClick] = useState(() => () => {})
    // Variables for data sets
    const [email, setEmail]= useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        if (form.checkValidity() === false) {
            e.stopPropagation()
            return
        }
        let payload = {email, password}

        try {
            let response = await postController(payload, "login")

            if (!response) 
                noResponse()
            else{
                const body = await response.json()
                if (!response.ok)
                    messageFromAPI("Error", body.message)
                else{
                    localStorage.setItem('userData', JSON.stringify(body))
                    localStorage.setItem('isAdmin', body.is_admin)
                    if(body.is_admin)
                        navigate("/admin/products")
                    else
                        navigate("/");
                }
            }
        } catch (error) {
            console.log(error)
        }
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

    return (
        <div className="container">
            <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button className={modalBtn1Style} onClick={()=>setShowModal(false)}>{modalBtn1Text}</button>
                    {modalBtn2Show && (
                        <button className={modalBtn2Style} onClick={modalBtn2OnClick}>{modalBtn2Text}</button>
                    )}
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col-md-7 p-5 rounded-start-3 bg-F4F6F0">
                    <h1 className="display-6 my-4 text-lg-start">Inicia sesión</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="control_email" className={"mb-3 text-lg-start"}>
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={300}
                            />
                            <Form.Control.Feedback type={"invalid"}>Por favor introduzca un correo electrónico válido.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="control_password" className={"mb-3 text-lg-start"}>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={300}
                            />
                            <Form.Control.Feedback type={"invalid"}>Por favor escriba su contraseña.</Form.Control.Feedback>
                        </Form.Group>
                        <button type="submit" className="principal-btn mt-5 bg-99BA57 fg-white">Iniciar sesión</button>
                    </Form>
                </div>
                <div className="col-md-5 py-5 rounded-end-3 bg-99BA57">
                    <h1 className="display-5 fg-white my-4">Hola, ¿No tienes una cuenta?</h1>
                    <img src={logo} alt="Logo de Outnet" className="img-fluid h-25 w-25 fill-white"/>
                    <div className="mt-5">
                        <Link to="/register" className="btn secondary-btn">Regístrate</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
