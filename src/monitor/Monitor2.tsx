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
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

function Monitor2() {
  return (
    <div id="monitor2" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>
                <FormattedMessage id="app.monitor.step2.title"
                  defaultMessage="Confirme o token recebido em seu celular"
                  description="Monitor Step 2 Title"/>
              </h1>
              <p className="step">
                <FormattedMessage id="app.step"
                  defaultMessage="Step"
                  description="Step Label"/> 2 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Form.Group controlId="Token">
              <NumberFormat format="# # # # # #" mask="_" className="form-control form-control-lg" />
            </Form.Group>
            <Button variant="primary" size="lg" block href="/monitor/step3">
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

export default Monitor2;