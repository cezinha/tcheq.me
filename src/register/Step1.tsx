import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';

function Step1() {
  return (
    <div id="step1" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>Ajude a comunidade responda rápido sobre a sua saúde para ver o nosso mapa.</h1>
              <p className="step">Passo 1 / 3</p>
            </header>
            <p>No momento você:</p>
          </Col>
        </Row>
        <Row>
          <Col sm md xs lg={4}>
            <p><Button variant="primary" size="lg" block href='/register/step2a'>Possui sintomas</Button>{' '}</p>
            <p><Button variant="primary" size="lg" block href='/register/step2b'>Não possui sintomas</Button>{' '}</p>
            <p><Button variant="primary" size="lg" block href='/register/step2c'>Está infectado</Button>{' '}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Step1;