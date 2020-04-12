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

function Step2c() {
  return (
    <div id="step2a" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>Diga-nos um pouco mais sobre os sintomas</h1>
              <p className="step">Passo 2 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm md xs lg={8}>
            <p>Selecione os sintomas que você possui ou possuiu durante a infecção:</p>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="formSymptoms">
              <Form.Check
                type="checkbox"
                id="gripe"
                label="Gripe"
              />
              <Form.Check
                type="checkbox"
                id="febre"
                label="Febre"
              />
              <Form.Check
                type="checkbox"
                id="dor-peito"
                label="Dor no peito"
              />
              <Form.Check
                type="checkbox"
                id="dor-garganta"
                label="Dor de garganta"
              />
              <Form.Check
                type="checkbox"
                id="tosse"
                label="Tosse"
              />
            </Form.Group>
            <Form.Group controlId="formQuarentine">
              <Form.Label>Há quantos dias está de quarentena?</Form.Label>
              <Form.Control type="quarentine" placeholder="digite a quantidade" />
            </Form.Group>
            <Button variant="primary" size="lg" block href='/register/step3'>Próximo</Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Step2c;