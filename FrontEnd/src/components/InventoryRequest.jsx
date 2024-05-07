import './Style.css'
import Form from "react-bootstrap/Form"
import {useEffect, useState} from "react"
import Modal from "react-bootstrap/Modal"
import {postController} from "../context/Actions.jsx"

const InventoryRequest = () => {
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)
    const [price, setPrice] = useState('')
    const [validated, setValidated] = useState(false)
    const [description, setDescription] = useState('')
    const [product, setProduct] = useState({})

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('product')))
    }, [])

    const handleChangePrice = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 8)
            setPrice(newValue)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        if (form.checkValidity() === false) {
            e.stopPropagation()
            return
        }

        let amountInt = parseInt(price)

        const selectElement = document.getElementById("request_select")
        if (selectElement.value === "Solicitud de salida")
            amountInt *= -1

        if (parseInt(product.amount) + amountInt < 0)
            messageFromAPI("Error", "La nueva cantidad del producto no puede ser negativa")
        else{
            let payload = {id: parseInt(product.id), amount: amountInt}

            try {
                let response = await postController(payload, "inventory_request")

                if (!response)
                    noResponse()
                else{
                    if (response.ok){
                        messageFromAPI("Modificación de inventario exitosa", "El inventario ha sido actualizado correctamente")
                    }else{
                        const body = await response.json()
                        messageFromAPI("Error", body.message)
                    }
                }
            } catch (error) {
                console.log(error)
            }
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
        <div className="container-fluid vw-mw-100 position-relative" style={{marginTop: "30px"}}>
            <Modal centered show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <button className={modalBtn1Style} onClick={()=>setShowModal(false)}>{modalBtn1Text}</button>
                    {modalBtn2Show && (
                        <button className={modalBtn2Style}>{modalBtn2Text}</button>
                    )}
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col text-lg-start">
                    <h1 className="display-6 mb-5">Solicitudes de inventario</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="ms-1">Tipo de solicitud</Form.Label>
                            <Form.Select aria-label="Selecciona el tipo de solicitud de inventario"
                                         id="request_select">
                                <option key={1} label={"Solicitud de ingreso"}
                                        value={"Solicitud de ingreso"}></option>
                                <option key={2} label={"Solicitud de salida"}
                                        value={"Solicitud de salida"}></option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                value={price}
                                onChange={(e) => handleChangePrice(e.target.value)}
                                placeholder="Cantidad"
                            />
                            <Form.Control.Feedback type={"invalid"}>Por favor escriba la cantidad del producto.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Escriba la descripción de la solicitud aquí..."
                                    maxLength={140}
                                />
                        </Form.Group>
                        <div className="col text-end">
                            <button type="submit" className="btn btn-primary">Confirmar solicitud</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default InventoryRequest