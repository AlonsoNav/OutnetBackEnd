import profile from "../assets/profile.svg"
import pencil from "../assets/pencil.svg"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {postController} from "../context/Actions.jsx"


const Profile = () => {
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)
    // Variables for data sets
    const [userEditData, setUserEditData] = useState({})
    const [userData, setUserData] = useState({})
    const [validated, setValidated] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'))
        if (storedUserData) {
            setUserData(storedUserData)
            setUserEditData(storedUserData)
        }
    }, [])


    const handleChangePhone = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 8)
            setUserEditData({...userEditData, phone: newValue})
    }

    const handleConfirmSubmit = async () => {
        let payload = {email: userData.email, name: userEditData.name, new_email: userEditData.email,
            phone: userEditData.phone, address: userEditData.address, postal_code: userEditData.postal_code}

        try {
            let response = await postController(payload, "update_user")

            if (!response)
                noResponse()
            else{
                const body = await response.json()
                if (response.ok){
                    messageFromAPI("Información guardada correctamente", body.message)
                    setUserData(userEditData)
                    localStorage.setItem('userData', JSON.stringify(userEditData))
                }else
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

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        if (form.checkValidity() === false) {
            e.stopPropagation()
            return
        }

        setModalTitle("Confirmar modificación de información")
        setModalBody("¿Quieres guardar estos cambios?")
        setModalBtn1Text("Cancelar")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Text("Guardar cambios")
        setModalBtn2Style("btn btn-primary")
        setModalBtn2Show(true)
        setShowModal(true)
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing)
    }

    const handleLogOut = () => {
        localStorage.removeItem('userData')
        navigate("/login")
    }

    function isPhoneValid(phone) {
        if(phone != null)
            return phone.length >= 8
        return true
    }

    return(
        <div className="container" style={{marginTop: "30px"}}>
            <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button className={modalBtn1Style} onClick={()=>setShowModal(false)}>{modalBtn1Text}</button>
                    {modalBtn2Show && (
                        <button className={modalBtn2Style} onClick={() => handleConfirmSubmit}>{modalBtn2Text}</button>
                    )}
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col-md-5 px-2 py-1">
                    <div className="bg-F4F6F0 py-5">
                        <img src={profile} alt="Imagen de perfil" className="img-fluid h-50 w-50 my-md-5"/>
                        <h1 className="display-6">¡Hola, {userData.name}!</h1>
                        <button type="button" onClick={handleLogOut} className="danger-btn mt-5 fg-white">Cerrar
                            sesión
                        </button>
                    </div>
                </div>
                <div className="col-md-7 px-2 py-1">
                    <div className="bg-F4F6F0 py-1 px-4 h-100 text-start">
                        <h1 className="display-6 my-4 text-lg-start text-underline-99BA57">Información
                            <img src={pencil} alt="Editar información" onClick={handleEditClick} width={"30"}
                                 height={"30"}
                                 className="image-button img-fluid ms-2"/>
                        </h1>
                        {isEditing ? (
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="control_name" className={"mb-3 text-lg-start"}>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nombre"
                                        value={userEditData.name}
                                        onChange={(e) => setUserEditData({...userEditData, name: e.target.value})}
                                        maxLength={20}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Por favor escriba su
                                        nombre.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="control_email" className={"mb-3 text-lg-start"}>
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={userEditData.email}
                                        onChange={(e) => setUserEditData({...userEditData, email: e.target.value})}
                                        maxLength={300}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Por favor introduzca un correo electrónico
                                        válido.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="control_phone" className={"mb-3 text-lg-start"}>
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Teléfono"
                                        value={userEditData.phone}
                                        onChange={(e) => handleChangePhone(e.target.value)}
                                        isInvalid={!isPhoneValid(userEditData.phone)}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>El teléfono debe ser válido
                                        (88888888).</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="control_address" className={"mb-3 text-lg-start"}>
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Dirección"
                                        value={userEditData.address}
                                        onChange={(e) => setUserEditData({...userEditData, address: e.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group controlId="control_postal_code" className={"mb-3 text-lg-start"}>
                                    <Form.Label>Código postal</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Código postal"
                                        value={userEditData.postal_code}
                                        onChange={(e) => setUserEditData({
                                            ...userEditData,
                                            postal_code: e.target.value
                                        })}
                                    />
                                </Form.Group>
                                <button type="submit" className="principal-btn my-1 bg-99BA57 fg-white">Guardar
                                    información
                                </button>
                            </Form>
                        ) : (
                            <div className={"text-secondary-emphasis"}>
                                <p><strong>Nombre:</strong> {userData.name}</p>
                                <p><strong>Correo electrónico:</strong> {userData.email}</p>
                                <p><strong>Teléfono:</strong> {userData.phone}</p>
                                <p><strong>Dirección:</strong> {userData.address}</p>
                                <p><strong>Código postal:</strong> {userData.postal_code}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile