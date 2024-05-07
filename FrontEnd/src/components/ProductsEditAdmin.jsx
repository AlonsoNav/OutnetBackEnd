import './Style.css'
import Carousel from "react-bootstrap/Carousel"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import {useEffect, useState} from "react"
import {
    deleteController,
    getController,
    postController,
    postNoJSONController
} from "../context/Actions.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";

const ProductsEditAdmin = () => {
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn3Style, setModalBtn3Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)
    const [modalBtn3Text, setModalBtn3Text] = useState('')
    const [modalBtn3Show, setModalBtn3Show] = useState(false)
    // Variables for data sets
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([{name: "Sin asignar"}])
    // Variables for info form
    const [product, setProduct] = useState({})
    const [validated, setValidated] = useState(false)
    // Variables for image form
    const [imageFile, setImageFile] = useState(null)
    const [imageDescription, setImageDescription] = useState("")
    const [imageValidated, setImageValidated] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [imageList, setImageList] = useState([])
    const [newImageList, setNewImageList] = useState([])
    const [id, setId] = useState(null)
    const categoryElement = document.getElementById('category_select')
    const brandElement = document.getElementById('brand_select')
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        setProduct(JSON.parse(localStorage.getItem('product')))

        const fetchCategories = async () => {
            try {
                const response = await getController("/get_categories")

                if (!response)
                    noResponse()
                else {
                    const body = await response.json()
                    if (!response.ok)
                        messageFromAPI("Error", body.message)
                    else
                        setCategories(body.list)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchBrands = async () => {
            try {
                const response = await getController("/get_brands")

                if (!response)
                    noResponse()
                else {
                    const body = await response.json()
                    if (!response.ok)
                        messageFromAPI("Error", body.message)
                    else
                        setBrands(prevBrands => [...prevBrands, ...body.list])
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchProductImages = async () => {
            let payload = {id: parseInt(product.id)}
            try {
                const response = await postController(payload,"/get_product_images")

                if (!response)
                    noResponse()
                else {
                    const body = await response.json()
                    if (!response.ok)
                        messageFromAPI("Error", body.message)
                    else
                        setImageList(body.images)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories()
        fetchBrands()
        fetchProductImages().then(() => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if(categories.length !== 0){
            categories.forEach(category => {
                const option = document.createElement("option")
                option.text = category.name
                categoryElement.add(option)
            })
            categoryElement.value = product.category
        }
    }, [categories]);


    useEffect(() => {
        if(brands.length > 1){
            brands.forEach(brand => {
                const option = document.createElement("option")
                option.text = brand.name
                brandElement.add(option)
            })
            if(product.brand === null)
                brandElement.value = "Sin asignar"
            else
                brandElement.value = product.brand
        }
    }, [brands]);

    const handleThumbnailClick = (index) => {
        setSelectedIndex(index)
    }

    const handleSelect = (selectedIndex) => {
        setSelectedIndex(selectedIndex)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 38 && selectedIndex > 0) { // Flecha arriba
            setSelectedIndex(selectedIndex - 1)
        } else if (e.keyCode === 40 && selectedIndex < imageList.length - 1) { // Flecha abajo
            setSelectedIndex(selectedIndex + 1)
        }
    }

    const handleChangePrice = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 12)
            setProduct({...product, price: newValue})
    }

    const handleChangeOutletPrice = (newValue) => {
        if (!isNaN(newValue) && newValue.length <= 12)
            setProduct({...product, outlet_price: newValue})
    }

    const handleUploadImage = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        setImageValidated(true)
        if (form.checkValidity() === false) {
            e.stopPropagation()
            return
        }

        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('description', imageDescription)

        try {
            const response = await postNoJSONController(formData, 'upload_image')
            const body = await response.json()
            if (response.ok){
                messageFromAPI("Subida de imagen exitosa", body.message)
                setImageList([...imageList, { id: body.id, image: body.image, description: imageDescription }])
                setNewImageList([...newImageList, { id: body.id, image: body.image, description: imageDescription }])
            }else
                messageFromAPI("Error", body.message)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteImage = (imageId) => {
        setId(imageId)
        setModalTitle("Confirmar eliminación de imagen")
        setModalBody("¿Realmente quieres borrar esta imagen?")
        setModalBtn1Text("Cancelar")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Text("Borrar imagen")
        setModalBtn2Style("btn btn-danger")
        setModalBtn2Show(true)
        setModalBtn3Show(false)
        setShowModal(true)
    }

    const handleConfirmDeleteImage = async () =>{
        setShowModal(false)
        let payload = {id}

        try {
            let response = await deleteController(payload, "delete_image")

            if (!response)
                noResponse()
            else{
                if (response.ok){
                    const updatedImageList = imageList.filter((image) => image.id !== id)
                    setImageList(updatedImageList)
                    const updatedNewImageList = newImageList.filter((image) => image.id !== id)
                    setNewImageList(updatedNewImageList)
                    messageFromAPI("Eliminación de imagen exitosa", "La imagen ha sido borrada correctamente.")
                }else{
                    const body = await response.json()
                    messageFromAPI("Error", body.message)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleConfirmSubmit = async () => {
        const imageIds = newImageList.map(image => image.id)

        let payload = {
            id: parseInt(product.id),
            name: product.name,
            description: product.description,
            price: product.price,
            outlet_price: product.outlet_price,
            category: categoryElement.value,
            brand: brandElement.value,
            images: imageIds
        }

        try {
            let response = await postController(payload, "update_product")

            if (!response)
                noResponse()
            else{
                const body = await response.json()
                if (response.ok)
                    messageFromAPI("Producto modificado exitosamente", body.message)
                else
                    messageFromAPI("Error", body.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)
        if (form.checkValidity() === false) {
            e.stopPropagation()
            return
        }

        setModalTitle("Confirmar edición de producto")
        setModalBody("¿Quieres salvar estos cambios?")
        setModalBtn1Text("Cancelar")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn3Text("Guardar cambios")
        setModalBtn3Style("btn btn-primary")
        setModalBtn2Show(false)
        setModalBtn3Show(true)
        setShowModal(true)
    }

    const noResponse = () =>{
        setModalTitle("Error")
        setModalBody("Fallo inesperado en el servidor.")
        setModalBtn1Text("OK")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Show(false)
        setModalBtn3Show(false)
        setShowModal(true)
    }

    const messageFromAPI = (title, message) =>{
        setModalTitle(title)
        setModalBody(message)
        setModalBtn1Text("OK")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Show(false)
        setModalBtn3Show(false)
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
                        <button className={modalBtn2Style} onClick={() => handleConfirmDeleteImage()}>{modalBtn2Text}</button>
                    )}
                    {modalBtn3Show && (
                        <button className={modalBtn3Style} onClick={() => handleConfirmSubmit()}>{modalBtn3Text}</button>
                    )}
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col-md-5 py-1 px-2">
                    {isLoading ? (
                        <p>Cargando imágenes...</p>
                    ) : (
                        <div className="row bg-F4F6F0 py-3 px-2" tabIndex="0" onKeyDown={handleKeyDown}>
                            <div className="col-auto carousel-image-button-scroll">
                                {imageList.map((image, index) => (
                                    <div className="row mb-1" key={index}>
                                        <div className="col">
                                            <img
                                                src={`data:image/png;base64,${image.image}`}
                                                className={`carousel-image-button ${index === selectedIndex ? 'selected' : ''}`}
                                                alt={`Slide ${index}`}
                                                onClick={() => handleThumbnailClick(index)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col flex-grow-1">
                                <Carousel activeIndex={selectedIndex} onSelect={handleSelect}
                                          className="position-relative">
                                    {imageList.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={`data:image/png;base64,${image.image}`}
                                                alt={image.description}
                                            />
                                            <button
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0 me-1 mt-1"
                                                style={{zIndex: 999}}
                                                onClick={() => handleDeleteImage(image.id)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    )}
                    <div className="row bg-F4F6F0 pb-3 px-2">
                        <div className="col text-start">
                            <Form noValidate validated={imageValidated} onSubmit={handleUploadImage}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="file"
                                        required
                                        accept=".png"
                                        onChange={(e) => {
                                            setImageFile(e.target.files[0])
                                        }}
                                    />
                                    <Form.Control.Feedback type={"invalid"}>Debe subir un formato de imagen
                                        válido.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        placeholder="Escriba la descripción de la imagen aquí..."
                                        value={imageDescription}
                                        onChange={(e) => {
                                            setImageDescription(e.target.value)
                                        }}
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
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre del producto"
                                    value={product.name}
                                    onChange={(e) => setProduct({...product, name: e.target.value})}
                                    maxLength={30}
                                />
                                <Form.Control.Feedback type={"invalid"}>Por favor escriba el nombre del producto.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <textarea
                                    className="form-control"
                                    rows={6}
                                    value={product.description}
                                    onChange={(e) => setProduct({...product, description: e.target.value})}
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
                                            value={product.price}
                                            maxLength={7}
                                            onChange={(e) => handleChangePrice(e.target.value)}
                                        />
                                        <Form.Control.Feedback type={"invalid"}>Por favor escriba un precio válido.</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Precio de outlet</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="1000"
                                            value={product.outlet_price}
                                            maxLength={7}
                                            onChange={(e) => handleChangeOutletPrice(e.target.value)}
                                        />
                                        <Form.Control.Feedback type={"invalid"}>Por favor escriba un precio de outlet válido.</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Categoría</Form.Label>
                                        <Form.Select aria-label="Selecciona la categoría del producto" id="category_select">
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col text-start">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="ms-1">Marca</Form.Label>
                                        <Form.Select aria-label="Selecciona la marca del producto" id="brand_select">
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-start">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {navigate("/admin/inventory/request")}}>Solicitudes de inventario</button>
                                </div>
                                <div className="col text-end">
                                    <button type="submit" className="btn btn-primary">Editar producto</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsEditAdmin