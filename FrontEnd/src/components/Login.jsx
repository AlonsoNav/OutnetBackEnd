import './Style.css'
import logo from '../assets/logo_white.svg'
import {useContext, useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import {postController} from "../context/Actions.jsx";
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }
        let payload = {email, password}

        try {
            let response = await postController(payload, "login")

            if (!response) {
                setToastMessage("Fallo inesperado en la conexión");
                setShowToast(true);
            }else{
                const body = await response.json();
                if (!response.ok){
                    setToastMessage(body.message)
                    setShowToast(true);
                }else{
                    localStorage.setItem('userData', JSON.stringify(body));
                    navigate("/profile")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="position-fixed top-0 start-50 translate-middle-x mt-1">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="danger">
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </div>
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
    );
};

export default Login;
