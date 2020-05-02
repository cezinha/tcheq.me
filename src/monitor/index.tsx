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
import { FormattedMessage } from 'react-intl';
import './Monitor.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

function Monitor1() {
  const [value, setValue] = useState();
  return (
    <div id="monitor1" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>
                <FormattedMessage id="app.monitor.step1.title"
                  defaultMessage="Cadastre o seu celular e ative a notificação de SOS para avisar seus parentes e amigos mais próximos!"
                  description="Monitor Step 1 Title"/>
              </h1>
              <p className="step">
                <FormattedMessage id="app.step"
                  defaultMessage="Step"
                  description="Step Label"/> 1 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="Phone">
              <PhoneInput
                value={value}
                onChange={setValue} />
            </Form.Group>
            <Button variant="primary" size="lg" block href="/monitor/step2">
              <FormattedMessage id="app.monitor.button.next"
                defaultMessage="Próximo"
                description="Next Button Label"/>
            </Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Monitor1;