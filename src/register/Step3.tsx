import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';

function Step1() {
  return (
    <div id="step3" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>Ajude a comunidade responda rápido sobre a sua saúde para ver o nosso mapa.</h1>
              <p className="step">Passo 3 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="formZipCode">
              <Form.Label>Digite o seu CEP:</Form.Label>
              <Form.Control type="ZipCode" placeholder="00000-000" />
            </Form.Group>
            <Button variant="primary" size="lg" block href="/my-location">Próximo</Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Step1;