import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return(
        <>
            <footer className="bg-dark text-light mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Información de contacto</h5>
            <p>Dirección: 123 Calle Principal, Ciudad</p>
            <p>Teléfono: (123) 456-7890</p>
            <p>Correo Electrónico: info@example.com</p>
          </Col>
          <Col md={6}>
            <h5>Enlaces útiles</h5>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#acerca-de">Acerca de</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
        </>
    )
} 
export default Footer;