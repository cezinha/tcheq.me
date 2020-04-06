import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function About() {
  return (
    <div id="about-page">
      <Container>
        <Row>
          <Col>
            <header>
              <h1 className="display-4">About page</h1>
              <p className="lead">About page for project</p>
            </header>
            <div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
