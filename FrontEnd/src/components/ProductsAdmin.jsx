import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Slider from "react-slider";
import './Style.css'
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdd, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

const ProductsAdmin = () => {
    const [price, setPrice] = useState([0, 100000]);
    const datos = [
        { id: 1, nombre: 'Producto 1', categoria: 'Categoría', precio: 10 },
        { id: 2, nombre: 'Producto 2', categoria: 'Categoría', precio: 20 },
        { id: 3, nombre: 'Producto 3', categoria: 'Categoría', precio: 30 },
        { id: 1, nombre: 'Producto 1', categoria: 'Categoría', precio: 10 },
        { id: 2, nombre: 'Producto 2', categoria: 'Categoría', precio: 20 },
        { id: 3, nombre: 'Producto 3', categoria: 'Categoría', precio: 30 },
        { id: 1, nombre: 'Producto 1', categoria: 'Categoría', precio: 10 },
        { id: 2, nombre: 'Producto 2', categoria: 'Categoría', precio: 20 },
        { id: 3, nombre: 'Producto 3', categoria: 'Categoría', precio: 30 },
        { id: 1, nombre: 'Producto 1', categoria: 'Categoría', precio: 10 },
        { id: 2, nombre: 'Producto 2', categoria: 'Categoría', precio: 20 },
        { id: 3, nombre: 'Producto 3', categoria: 'Categoría', precio: 30 },
        // Agrega más datos según sea necesario
    ];
    const apiResponse = {
        categories: ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 2', 'Categoría 3', 'Categoría 2', 'Categoría 3', 'Categoría 2', 'Categoría 3'],
        brands: ['Marca 1', 'Marca 2', 'Marca 3']
    };

    const categoriesCheckboxes = apiResponse.categories.map((category, index) => (
        <Form.Check key={`categoria_${index}`} label={category} />
    ));

    const brandsCheckboxes = apiResponse.brands.map((brand, index) => (
        <Form.Check key={`marca_${index}`} label={brand} />
    ));

    return (
        <div className="container-fluid vw-mw-100" style={{marginTop: "30px"}}>
            <div className="row">
                <div className="col-md-3 p-1">
                    <div className="bg-F4F6F0 py-2 px-3 text-start div-scroll">
                        <h1 className="display-6">Filtros</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="h5 text-muted">Precio<br/>
                                    <p className="h6 mt-1">Rango: ₡{price.at(0)} - ₡{price.at(1)}</p>
                                </Form.Label>
                                <Slider className="slider w-100 mt-1" value={price} onChange={setPrice}/>
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
                                        {datos.map((producto) => (
                                            <tr key={producto.id}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.categoria}</td>
                                                <td>{producto.id}</td>
                                                <td>{producto.precio}</td>
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