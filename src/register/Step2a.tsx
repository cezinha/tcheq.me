import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ISymptom } from '../store/types/symptoms';
import { toggleSymptom, changeQuarantine } from '../store/actions/form';
import { thunkSymptomFetch } from '../store/actions/symptoms';
import _ from 'lodash';
import CounterInput from "react-counter-input";

const mapState = (state: RootState) => ({
  symptomsList: state.symptoms.list,
  symptomsForm: state.form.symptoms,
  quarantineDays: state.form.quarantineDays,
  isLoading: state.symptoms.isLoading
});

const mapDispatch = (dispatch) => bindActionCreators({
  onSymptomsClick: (symptom, all) => toggleSymptom(symptom, all),
  getSymptoms: () => thunkSymptomFetch(),
  onQuarantineChanged: (days) => dispatch(changeQuarantine(days))
}, dispatch);

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

class Step2a extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getSymptoms();
  }

  render() {
    let {symptomsList, symptomsForm} = this.props;
    let h = window.innerHeight - 66;
    if (this.props.isLoading) {
      return (
        <Container>
          <Row>
            <Col style={{textAlign: "center", height: h}}>
              <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <Spinner animation="border" role="status" variant="light" >
                <span className="sr-only">Loading...</span>
              </Spinner>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <div id="step2a" className="content">
        <Container>
          <Row>
            <Col sm md xs lg={8}>
              <header>
                <h1>
                  <FormattedMessage id="app.register.step2c.title"
                    defaultMessage="Diga-nos um pouco mais sobre os sintomas"
                    description="Register Step 2c Title"/>
                </h1>
                <p className="step">
                  <FormattedMessage id="app.step"
                    defaultMessage="Step"
                    description="Step Label"/> 2 / 3</p>
              </header>
            </Col>
          </Row>
          <Row>
            <Col sm md xs lg={8}>
              <p><FormattedMessage id="app.register.question.symptoms2"
                    defaultMessage="Selecione os sintomas que você possui ou possuiu durante a infecção:"
                    description="Register Step 2c Question Symptoms"/></p>
            </Col>
          </Row>
          <Row>
            <Col sm md={8} xs lg={4}>
              <Form.Group controlId="formSymptoms">
                {
                  symptomsList.map((symptom: ISymptom) => {
                    let checked = (_.find(symptomsForm, symptom) != null);
                    return (<Form.Check
                      key={symptom.id}
                      type="checkbox"
                      id={symptom.type + '-' + symptom.id}
                      label={symptom.type}
                      data-id={symptom.id}
                      onChange={() => this.props.onSymptomsClick(symptom, this.props.symptomsList)}
                      checked={checked}
                    />);
                  })
                }
              </Form.Group>
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

export default connector(Step2a);