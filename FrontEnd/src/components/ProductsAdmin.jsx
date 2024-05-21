import './Style.css'
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Slider from "react-slider"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAdd, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {deleteController, getController} from "../context/Actions.jsx"

const ProductsAdmin = () => {
    // Variables for the modal
    const [showModal, setShowModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalBtn1Style, setModalBtn1Style] = useState('')
    const [modalBtn2Style, setModalBtn2Style] = useState('')
    const [modalBtn1Text, setModalBtn1Text] = useState('')
    const [modalBtn2Text, setModalBtn2Text] = useState('')
    const [modalBtn2Show, setModalBtn2Show] = useState(false)
    // Variables for filters
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [price, setPrice] = useState([0, 100000])
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [id, setId] = useState(null)
    // Variables for data sets
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    // Get products, categories and brands
    useEffect(() => {
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
                        setBrands(body.list)
                }
            } catch (error) {
                console.log(error)
            }
        }
        const fetchProducts = async () => {
            try {
                const response = await getController("/get_products")

                if (!response) 
                    noResponse()
                else {
                    const body = await response.json()
                    if (!response.ok) 
                        messageFromAPI("Error", body.message)
                    else{
                        setProducts(body.products)
                        setFilteredProducts(body.products)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories()
        fetchBrands()
        fetchProducts()
    }, [])

    // Get the min and max for the price range
    useEffect(() => {
        const { maxOutletPrice, minOutletPrice } = products.reduce((acc, product) => {
            return {
                maxOutletPrice: Math.max(product.outlet_price, acc.maxOutletPrice),
                minOutletPrice: Math.min(product.outlet_price, acc.minOutletPrice)
            }
        }, { maxOutletPrice: -Infinity, minOutletPrice: Infinity })
        setMinPrice(parseInt(minOutletPrice))
        setMaxPrice(parseInt(maxOutletPrice))
        setPrice([minPrice, maxPrice])
    }, [products])

    // Set filters
    useEffect(() => {
        const filteredProducts = products.filter(product => {
            return product.outlet_price >= price[0]
                && product.outlet_price <= price[1]
                && filterProductsByCategory(product)
                && filterProductsByBrand(product)
                && filterProductsBySearchTerm(product)
        })

        setFilteredProducts(filteredProducts)
    }, [price, products, selectedCategories, selectedBrands, searchTerm])

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

    const filterProductsByCategory = (product) => {
        if (selectedCategories.length === 0)
            return true
        else
            return selectedCategories.includes(product.category)
    }

    const filterProductsByBrand = (product) => {
        if (selectedBrands.length === 0)
            return true
        else
            return selectedBrands.includes(product.brand)
    }

    const filterProductsBySearchTerm = (product) => {
        if (searchTerm === "")
            return true
        else {
            const searchTermLowerCase = searchTerm.toLowerCase()
            const productNameLowerCase = product.name.toLowerCase()

            return productNameLowerCase.includes(searchTermLowerCase)
        }
    }

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category))
            setSelectedCategories(selectedCategories.filter(cat => cat !== category)) // If the category is already selected, delete it
        else
            setSelectedCategories([...selectedCategories, category])
    }

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand))
            setSelectedBrands(selectedBrands.filter(cat => cat !== brand)) // If the category is already selected, delete it
        else
            setSelectedBrands([...selectedBrands, brand])
    }

    const handleDelete = (id) => {
        setId(id)
        setModalTitle("Confirmar eliminación de producto")
        setModalBody("¿Realmente quieres borrar este producto?")
        setModalBtn1Text("Cancelar")
        setModalBtn1Style("btn btn-secondary")
        setModalBtn2Text("Borrar producto")
        setModalBtn2Style("btn btn-danger")
        setModalBtn2Show(true)
        setShowModal(true)
    }

    const handleEdit = (product) => {
        localStorage.setItem("product", JSON.stringify(product))
        navigate("/admin/products/edit")
    }

    const handleConfirmDelete = async () =>{
        let payload = {id}

        try {
            let response = await deleteController(payload, "delete_product")

            if (!response)
                noResponse()
            else{
                const body = await response.json()
                if (response.ok){
                    const updatedProducts = products.filter((product) => product.id !== id)
                    setProducts(updatedProducts)
                    const updatedFilteredProducts = filteredProducts.filter(
                        (product) => updatedProducts.some((updatedProduct) => updatedProduct.id === product.id)
                    )
                    setFilteredProducts(updatedFilteredProducts)
                    messageFromAPI("Eliminación de producto exitosa", body.message)
                }else
                    messageFromAPI("Error", body.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const categoriesCheckboxes = categories.map((category, index) => (
        <Form.Check key={`categoria_${index}`}
                    label={category.name}
                    aria-label={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
        />
    ))

    const brandsCheckboxes = brands.map((brand, index) => (
        <Form.Check key={`marca_${index}`}
                    label={brand.name}
                    aria-label={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => handleBrandChange(brand.name)}/>
    ))

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
                        <button className={modalBtn2Style} onClick={() =>handleConfirmDelete()}>{modalBtn2Text}</button>
                    )}
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col-md-3 p-1">
                    <div className="bg-F4F6F0 py-2 px-3 text-start div-scroll">
                        <h1 className="display-6">Filtros</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Precio<br/>
                                    <p className="h6 mt-1">Rango: ₡{price.at(0)} - ₡{price.at(1)}</p>
                                </Form.Label>
                                <Slider
                                    className="slider w-100 mt-1"
                                    value={price}
                                    onChange={setPrice}
                                    min={minPrice}
                                    max={maxPrice}
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Categoría</Form.Label>
                                {categoriesCheckboxes}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Marca</Form.Label>
                                {brandsCheckboxes}
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="col-md-9 p-1">
                    <div className="row pb-2">
                        <div className="col flex-grow-1">
                            <Form>
                                <InputGroup>
                                    <InputGroup.Text className="bg-F4F6F0">
                                        <FontAwesomeIcon icon={faSearch} className="custom-icon-color"/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        className="bg-F4F6F0"
                                        placeholder="Buscar por nombre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        maxLength="30"
                                    />
                                </InputGroup>
                            </Form>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary" onClick={() => navigate("/admin/products/add")}>
                                <FontAwesomeIcon icon={faAdd} className="me-2"/>
                                Nuevo producto
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="bg-F4F6F0 py-3 px-4 text-start">
                                <h1 className="display-6 mb-2 text-lg-start">Productos</h1>
                                <div className="table-responsive table-scroll mb-2">
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Acción</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredProducts.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.name}</td>
                                                <td>{product.category}</td>
                                                <td>{product.amount}</td>
                                                <td>₡{product.outlet_price}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-1" aria-label={"Editar producto"} onClick={() => handleEdit(product)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" aria-label={"Borrar producto"} onClick={() => handleDelete(product.id)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <button className="btn btn-primary" onClick={() => navigate("/admin/inventory")}>Historial de movimientos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsAdmin