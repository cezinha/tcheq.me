import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import './Monitor.css';

function Monitor1() {
  const [value, setValue] = useState();

  return (
    <div id="monitor1" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>Cadastre o seu celular e ative a notificação de SOS para avisar seus parentes e amigos mais próximos!</h1>
              <p className="step">Passo 1 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="Phone">
              <PhoneInput
                placeholder="Digite o celular"
                value={value}
                onChange={setValue} />
            </Form.Group>
            <Button variant="primary" size="lg" block href="/monitor/step2">Próximo</Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Monitor1;