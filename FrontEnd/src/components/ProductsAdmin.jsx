import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Slider from "react-slider";
import './Style.css'
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdd, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {getController} from "../context/Actions.jsx";
import Toast from "react-bootstrap/Toast";

const ProductsAdmin = () => {
    const [price, setPrice] = useState([0, 100000]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Get products, categories and brands
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
        const fetchProducts = async () => {
            try {
                const response = await getController("/get_products");

                if (!response) {
                    setToastMessage("Fallo inesperado en la conexión");
                    setShowToast(true);
                }else {
                    const body = await response.json();
                    if (!response.ok) {
                        setToastMessage(body.message)
                        setShowToast(true);
                    } else
                        setProducts(body.products);
                        setFilteredProducts(body.products);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories()
        fetchBrands()
        fetchProducts()
    }, []);

    // Get the min and max for the price range
    useEffect(() => {
        const { maxOutletPrice, minOutletPrice } = products.reduce((acc, product) => {
            return {
                maxOutletPrice: Math.max(product.outlet_price, acc.maxOutletPrice),
                minOutletPrice: Math.min(product.outlet_price, acc.minOutletPrice)
            };
        }, { maxOutletPrice: -Infinity, minOutletPrice: Infinity });
        setMinPrice(parseInt(minOutletPrice))
        setMaxPrice(parseInt(maxOutletPrice))
        setPrice([minPrice, maxPrice])
    }, [products]);

    // Set filters
    useEffect(() => {
        const filteredProducts = products.filter(product => {
            return product.outlet_price >= price[0]
                && product.outlet_price <= price[1]
                && filterProductsByCategory(product)
                && filterProductsByBrand(product)
                && filterProductsBySearchTerm(product);
        });

        setFilteredProducts(filteredProducts);
    }, [price, products, selectedCategories, selectedBrands, searchTerm]);

    const filterProductsByCategory = (product) => {
        if (selectedCategories.length === 0)
            return true;
        else
            return selectedCategories.includes(product.category);
    };

    const filterProductsByBrand = (product) => {
        if (selectedBrands.length === 0)
            return true;
        else
            return selectedBrands.includes(product.brand);
    };

    const filterProductsBySearchTerm = (product) => {
        if (searchTerm === "")
            return true;
        else {
            const searchTermLowerCase = searchTerm.toLowerCase();
            const productNameLowerCase = product.name.toLowerCase();

            return productNameLowerCase.includes(searchTermLowerCase);
        }
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category))
            setSelectedCategories(selectedCategories.filter(cat => cat !== category)); // If the category is already selected, delete it
        else
            setSelectedCategories([...selectedCategories, category]);
    };

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand))
            setSelectedBrands(selectedBrands.filter(cat => cat !== brand)); // If the category is already selected, delete it
        else
            setSelectedBrands([...selectedBrands, brand]);
    };

    const categoriesCheckboxes = categories.map((category, index) => (
        <Form.Check key={`categoria_${index}`}
                    label={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
        />
    ));

    const brandsCheckboxes = brands.map((brand, index) => (
        <Form.Check key={`marca_${index}`}
                    label={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => handleBrandChange(brand.name)}/>
    ));

    return (
        <div className="container-fluid vw-mw-100 position-relative" style={{marginTop: "30px"}}>
            <div className="position-absolute top-0 start-50 translate-middle-x mt-1 z-1000">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="danger">
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </div>
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
                            <button type="button" className="btn btn-primary">
                                <FontAwesomeIcon icon={faAdd} className="me-2"/>
                                Nuevo producto
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="bg-F4F6F0 py-1 px-4 text-start">
                                <h1 className="display-6 my-2 text-lg-start">Productos</h1>
                                <div className="table-responsive table-scroll">
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
                                                    <button className="btn btn-sm btn-primary me-1">
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger">
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsAdmin;