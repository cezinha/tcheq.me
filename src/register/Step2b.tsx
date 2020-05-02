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
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeQuarantine, changeHadContact } from '../store/actions/form';
import { fmt } from '..';
import CounterInput from "react-counter-input";

const mapState = (state: RootState) => ({
  hadContact: state.form.hadContact,
  symptomsForm: state.form.symptoms,
  quarantineDays: state.form.quarantineDays,
  isLoading: state.symptoms.isLoading
});

const mapDispatch = (dispatch) => bindActionCreators({
  onQuarantineChanged: (days) => dispatch(changeQuarantine(days)),
  onHadContactChanged: (flag) => dispatch(changeHadContact(flag))
}, dispatch);

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

class Step2b extends React.PureComponent<IProps> {
  render() {
    return (
      <div id="step2b" className="content">
        <Container>
          <Row>
            <Col sm md xs lg={8}>
              <header>
                <h1>
                  <FormattedMessage id="app.register.step2b.title"
                    defaultMessage="Diga-nos um pouco mais sobre as suas últimas 2 semanas"
                    description="Register Step 2b Title"/>
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
              <Form.Group controlId="formQuarantine">
                <Form.Label>
                  <FormattedMessage id="app.register.question.quarantine"
                    defaultMessage="Há quantos dias está de quarentena?"
                    description="Question Quarantine Label"/>
                </Form.Label>
                <div className="input-counter">
                  <CounterInput
                    min={0}
                    max={20}
                    onCountChange={count => this.props.onQuarantineChanged(count)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm md xs lg={8}>
              <p>
                <FormattedMessage id="app.register.question.contact"
                  defaultMessage="Teve algum contato com algum infectado nos últimos dias:"
                  description="Question Contact Label"/>
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm md={8} xs lg={4}>
              <Form.Group controlId="formSymptoms">
                <Form.Check
                  type="radio"
                  id="contact1"
                  name="contact"
                  label={fmt({id: 'app.register.question.yes'})}
                  onChange={(e) => this.props.onHadContactChanged(true)}
                />
                <Form.Check
                  type="radio"
                  id="contact2"
                  name="contact"
                  label={fmt({id: 'app.register.question.no'})}
                  defaultChecked
                  onChange={(e) => this.props.onHadContactChanged(false)}
                />
              </Form.Group>
              <Button variant="primary" size="lg" block href='/register/step3'>
                <FormattedMessage id="app.register.button.next"
                  defaultMessage="Próximo"
                  description="Next Button Label"/>
              </Button>{' '}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connector(Step2b);