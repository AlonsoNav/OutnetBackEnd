import './Style.css'
import Form from "react-bootstrap/Form";
import {useState} from "react";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";

const InventoryRequest = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [toastTitle, setToastTitle] = useState('Error');
    const [price, setPrice] = useState('');
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [description, setDescription] = useState('');

    const handleChangePrice = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 8)
            setPrice(newValue);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }
    }

    const handleCloseCreateModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container-fluid vw-mw-100 position-relative" style={{marginTop: "30px"}}>
            <div className="position-absolute top-0 start-50 translate-middle-x mt-1 z-1000">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg={toastBg}>
                    <Toast.Header>
                        <strong className="me-auto">{toastTitle}</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </div>
            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar esta imagen?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={()=>setShowModal(false)}>Cancelar</button>
                    <button className="btn btn-danger" onClick={() =>handleConfirmDeleteImage()}>Eliminar</button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCreateModal} onHide={()=>handleCloseCreateModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Creación de producto exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    El producto ha sido creado satisfactoriamente.
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={()=>handleCloseCreateModal()}>Ok</button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col text-lg-start">
                    <h1 className="display-6 mb-5">Solicitudes de inventario</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="ms-1">Tipo de solicitud</Form.Label>
                            <Form.Select aria-label="Selecciona el tipo de solicitud de inventario"
                                         id="brand_select">
                                <option key={1} label={"Solicitud de ingreso"}
                                        value={"Solicitud de ingreso"}></option>
                                <option key={1} label={"Solicitud de salida"}
                                        value={"Solicitud de salida"}></option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                required
                                type="text"
                                placeholder="Cantidad"
                            />
                            <Form.Control.Feedback type={"invalid"}>Por favor escriba el nombre del producto.</Form.Control.Feedback>
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
    );
}

export default InventoryRequest;