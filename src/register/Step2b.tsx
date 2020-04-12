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

function Step2b() {
  return (
    <div id="step2b" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>Diga-nos um pouco mais sobre as suas últimas 2 semanas</h1>
              <p className="step">Passo 2 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="formQuarentine">
              <Form.Label>Há quantos dias está de quarentena?</Form.Label>
              <Form.Control type="quarentine" placeholder="digite a quantidade" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm md xs lg={8}>
            <p>Teve algum contato com algum infectado nos últimos dias:</p>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="formSymptoms">
              <Form.Check
                type="radio"
                id="contact1"
                name="contact"
                label="Sim"
              />
              <Form.Check
                type="radio"
                id="contact2"
                name="contact"
                label="Não"
                defaultChecked
              />
            </Form.Group>
            <Button variant="primary" size="lg" block href='/register/step3'>Próximo</Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Step2b;