import './ProductView.css'
import React from 'react'
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';

const ProductView = () => {
  return (
    <div className='MainPV'>
        <Card className='Cuerpo'>
            <Card.Body>
                <Row>
                <Col md={3}>
                    <Card.Img variant="top" src="path/to/product-image.jpg" />
                </Col>
                <Col md={9}>
                    <Card.Title>Classic clog white (Unisex)</Card.Title>
                    <Card.Text>
                    ¡Crocs cotidianas, populares y coloridas! Estos clásicos están fabricados con espuma Croslite™ que es duradera y elimina los olores de los zapatos. Estos clásicos fáciles de limpiar son el calzado ideal para los días de primavera/verano. Ventilados con orificios, estos clásicos se pueden personalizar con dijes Jibbitz™.
                    </Card.Text>
                    <Row>
                    <Col md={4}>
                        <Card.Text className="h4">
                        $ 27,000 <Badge bg="success">-35%</Badge>
                        </Card.Text>
                    </Col>
                    <Col md={8}>
                        <div className="d-flex align-items-center">
                        <div className="me-3">
                            <Button variant="outline-secondary">
                            <i className="bi bi-dash"></i>
                            </Button>
                            <span className="mx-2">1</span>
                            <Button variant="outline-secondary">
                            <i className="bi bi-plus"></i>
                            </Button>
                        </div>
                        <Button variant="success">Agregar al carrito</Button>
                        </div>
                    </Col>
                    </Row>
                </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ProductView