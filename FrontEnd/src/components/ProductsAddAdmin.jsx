import './Style.css'
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import {useState} from "react";

const ProductsAddAdmin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const items = [
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        },
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        },
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        },
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        },
        {
            imageUrl: 'https://via.placeholder.com/800x400',
            description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        }
    ];

    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
    };

    const handleSelect = (selectedIndex, e) => {
        setSelectedIndex(selectedIndex);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 38 && selectedIndex > 0) { // Flecha arriba
            setSelectedIndex(selectedIndex - 1);
        } else if (e.keyCode === 40 && selectedIndex < items.length - 1) { // Flecha abajo
            setSelectedIndex(selectedIndex + 1);
        }
    };

    return (
        <div className="container-fluid vw-mw-100" style={{marginTop: "30px"}}>
            <div className="row">
                <div className="col-md-5 p-1">
                    <div className="row bg-F4F6F0 py-3 px-2" tabIndex="0" onKeyDown={handleKeyDown}>
                        <div className="col-auto carousel-image-button-scroll">
                            {items.map((image, index) => (
                                <div className="row mb-1" key={index}>
                                    <div className="col">
                                        <img
                                            src={image.imageUrl}
                                            className={`carousel-image-button ${index === selectedIndex ? 'selected' : ''}`}
                                            alt={`Thumbnail ${index}`}
                                            onClick={() => handleThumbnailClick(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col flex-grow-1">
                            <Carousel activeIndex={selectedIndex} onSelect={handleSelect}>
                                {items.map((item, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={item.imageUrl}
                                            alt={`Slide ${index}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className="row bg-F4F6F0 pb-3 px-2">
                        <div className="col">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="file"
                                        required
                                        accept="image/*"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        placeholder="Escriba la descripción de la imagen aquí..."
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
                <div className="col-md-7 p-1">

                </div>
            </div>
        </div>
    );
}

export default ProductsAddAdmin;