import './Style.css'
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import {getController, postNoJSONController} from "../context/Actions.jsx";
import Toast from "react-bootstrap/Toast";

const ProductsAddAdmin = () => {
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getController("/get_categories");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else {
                        setCategories(body.list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchBrands = async () => {
            try {
                const response = await getController("/get_brands");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else {
                        setBrands(body.list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

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
        fetchCategories()
        fetchBrands()
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

    const handleChangePrice = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 8)
            setPrice(newValue);
    };

    const handleUploadImage = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        setImageValidated(true);
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('description', imageDescription);

        try {
            const response = await postNoJSONController(formData, 'upload_image');
            if (response.ok){
                setToastBg("success")
                setToastTitle("Registro exitoso")
            }else{
                setToastBg("danger")
                setToastTitle("Error")
            }
            const body = await response.json();
            setToastMessage(body.message)
            setShowToast(true);
        } catch (error) {
            console.error(error);
        }
    }

    const categoriesOptions = categories.map((category, index) => (
        <option key={index} label={category.name}></option>
    ));

    const brandsOptions = brands.map((brand, index) => (
        <option key={index} label={brand.name}></option>
    ));

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
            <div className="row">
                <div className="col-md-5 py-1 px-2">
                    <div className="row bg-F4F6F0 py-3 px-2" tabIndex="0" onKeyDown={handleKeyDown}>
                        <div className="col-auto carousel-image-button-scroll">
                            {imageList.map((image, index) => (
                                <div className="row mb-1" key={index}>
                                <div className="col">
                                        <img
                                            src={`data:image/png;base64,${image.image}`}
                                            className={`carousel-image-button ${index === selectedIndex ? 'selected' : ''}`}
                                            alt={image.description}
                                            onClick={() => handleThumbnailClick(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col flex-grow-1">
                            <Carousel activeIndex={selectedIndex} onSelect={handleSelect}>
                                {imageList.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={`data:image/png;base64,${image.image}`}
                                            alt={`Slide ${index}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="row bg-F4F6F0 pb-3 px-2">
                        <div className="col text-start">
                            <Form noValidate validated={imageValidated} onSubmit={handleUploadImage}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="file"
                                        required
                                        accept="image/*"
                                        onChange={(e) => {setImageFile(e.target.files[0])}}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Debe subir un formato de imagen válido.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        placeholder="Escriba la descripción de la imagen aquí..."
                                        value={imageDescription}
                                        onChange={(e) => {setImageDescription(e.target.value)}}
                                        maxLength={140}
                                    />
                                </Form.Group>
                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary">Subir imagen</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 py-1 px-4">
                    <div className="bg-F4F6F0 py-3 px-2">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre del producto"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <textarea
                                    className="form-control"
                                    rows={6}
                                    placeholder="Escriba la descripción del producto aquí..."
                                    maxLength={300}
                                />
                            </Form.Group>
                            <div className="row">
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Precio</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="1000"
                                            value={price}
                                            onChange={(e) => handleChangePrice(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Precio de outlet</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="1000"
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Categoría</Form.Label>
                                        <Form.Select aria-label="Selecciona la categoría del producto">
                                            {categoriesOptions}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Marca</Form.Label>
                                        <Form.Select aria-label="Selecciona la marca del producto">
                                            {brandsOptions}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="text-end">
                                <button type="submit" className="btn btn-lg btn-primary">Crear producto</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsAddAdmin;