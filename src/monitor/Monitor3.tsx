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
import { FormattedMessage } from 'react-intl';
import './Monitor.css';

function Monitor3() {
  return (
    <div id="monitor3" className="content">
      <Container>
        <Row>
          <Col sm md xs lg={8}>
            <header>
              <h1>
                <FormattedMessage id="app.monitor.step3.title"
                  defaultMessage="Por favor, cadastre até 5 celulares que receberão alertas caso seu estado de saúde se agrave!"
                  description="Monitor Step 3 Title"/>
              </h1>
              <p className="step">
                <FormattedMessage id="app.step"
                  defaultMessage="Step"
                  description="Step Label"/> 3 / 3</p>
            </header>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} xs={12} lg={8}>
            <p>Celular 1</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Phone">
              <Form.Control type="Phone" placeholder="+99 (99) 99999-9999" size="lg" />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Family">
              <Form.Control as="select" size="lg" custom>
                <option>Familiar</option>
                <option>Amigo</option>
                <option>Médico</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} xs={12} lg={8}>
            <p>Celular 2</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Phone">
              <Form.Control type="Phone" placeholder="+99 (99) 99999-9999" size="lg" />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Family">
              <Form.Control as="select" size="lg" custom>
                <option>Familiar</option>
                <option>Amigo</option>
                <option>Médico</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} xs={12} lg={8}>
            <p>Celular 3</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Phone">
              <Form.Control type="Phone" placeholder="+99 (99) 99999-9999" size="lg" />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Family">
              <Form.Control as="select" size="lg" custom>
                <option>Familiar</option>
                <option>Amigo</option>
                <option>Médico</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} xs={12} lg={8}>
            <p>Celular 4</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Phone">
              <Form.Control type="Phone" placeholder="+99 (99) 99999-9999" size="lg" />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Family">
              <Form.Control as="select" size="lg" custom>
                <option>Familiar</option>
                <option>Amigo</option>
                <option>Médico</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} xs={12} lg={8}>
            <p>Celular 5</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Phone">
              <Form.Control type="Phone" placeholder="+99 (99) 99999-9999" size="lg" />
            </Form.Group>
          </Col>
          <Col sm={12} md={4} xs={12} lg={4}>
            <Form.Group controlId="Family">
              <Form.Control as="select" size="lg" custom>
                <option>Familiar</option>
                <option>Amigo</option>
                <option>Médico</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} xs lg={4}>
            <Button variant="primary" size="lg" block href="/my-location">
              <FormattedMessage id="app.monitor.button.submit"
                defaultMessage="Concluir"
                description="Submit Button Label"/>
            </Button>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Monitor3;