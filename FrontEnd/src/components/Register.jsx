import './Style.css'
import logo from "../assets/logo_white.svg"
import Form from 'react-bootstrap/Form'
import Modal from "react-bootstrap/Modal"
import {useState} from "react"
import {Link} from 'react-router-dom'
import {postController} from "../context/Actions.jsx"

const Register = () => {
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
    const [name, setName]= useState('')
    const [phone, setPhone] = useState('')
    const [validated, setValidated] = useState(false)

    const handleChangePhone = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 8)
            setPhone(newValue)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        if (form.checkValidity() === false) {
            e.stopPropagation()
            return
        }
        let payload = {name, email, password, phone}

        try {
            let response = await postController(payload, "register")

            if (!response) 
                noResponse()
            else{
                const body = await response.json()
                if (response.ok)
                    messageFromAPI("Registro exitoso", body.message)
                else
                    messageFromAPI("Error", body.message)
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

    function isPhoneValid(phone) {
        return phone.length >= 8
    }

    function isPasswordValid(password) {
        return password.length >= 8
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
                <div className="col-md-5 py-5 rounded-start-3 bg-99BA57">
                    <h1 className="display-5 fg-white my-4">¡Hola de nuevo!</h1>
                    <img src={logo} alt="Logo de Outnet" className="img-fluid h-25 w-25 fill-white my-md-5"/>
                    <div className="mt-5">
                        <Link to="/login" className="btn secondary-btn">Inicia sesión</Link>
                    </div>
                </div>
                <div className="col-md-7 p-5 rounded-end-3 bg-F4F6F0">
                    <h1 className="display-6 my-4 text-lg-start">Crea una cuenta</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="control_name" className={"mb-3 text-lg-start"}>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={20}
                            />
                            <Form.Control.Feedback type={"invalid"}>Por favor escriba su nombre.</Form.Control.Feedback>
                        </Form.Group>
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
                                maxLength={64}
                                isInvalid={!isPasswordValid(password)}
                            />
                            <Form.Control.Feedback type={"invalid"}>La contraseña debe tener mínimo 8 caracteres.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="control_phone" className={"mb-3 text-lg-start"}>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Teléfono"
                                value={phone}
                                onChange={(e) => handleChangePhone(e.target.value)}
                                isInvalid={!isPhoneValid(phone)}
                            />
                            <Form.Control.Feedback type={"invalid"}>El teléfono debe ser válido (88888888).</Form.Control.Feedback>
                        </Form.Group>
                        <button type="submit" className="principal-btn mt-5 bg-99BA57 fg-white">Registrar</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register
