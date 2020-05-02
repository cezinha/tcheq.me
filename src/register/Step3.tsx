import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import FormZip from '../components/formzip';
class Step3 extends React.PureComponent<{}> {
  render() {
    return (
      <div id="step3" className="content">
        <Container>
          <Row>
            <Col sm md xs lg={8}>
              <header>
                <h1>
                  <FormattedMessage id="app.register.step3.title"
                    defaultMessage="Ajude a comunidade responda rápido sobre a sua saúde para ver o nosso mapa."
                    description="Register Step 3 Title"/></h1>
                <p className="step">
                  <FormattedMessage id="app.step"
                    defaultMessage="Step"
                    description="Step Label"/> 3 / 3</p>
              </header>
            </Col>
          </Row>
          <Row>
            <Col sm md={8} xs lg={4}>
              <FormZip />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Step3;