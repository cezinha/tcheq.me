import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import { changeHasSymptoms, changeIsInfected } from '../store/actions/form';

const mapState = (state: RootState) => ({
  hasSymptoms: state.form.hasSymptoms,
  isInfected: state.form.isInfected
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  onHasSymptomsClick: () => {
    dispatch(changeHasSymptoms(true));
  },
  onNoSymptomsClick: () => {
    dispatch(changeHasSymptoms(false));
  },
  onIsInfectedClick: () => {
    dispatch(changeIsInfected());
  },
}, dispatch);

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

class Step1 extends React.PureComponent<IProps> {
  render() {
    return (
      <div id="step1" className="content">
        <Container>
          <Row>
            <Col sm md xs lg={8}>
              <header>
                <h1>
                  <FormattedMessage id="app.register.step1.title"
                    defaultMessage="Help the community respond quickly about your health to see our map."
                    description="Register Step 1 Title"/>
                </h1>
                <p className="step">
                  <FormattedMessage id="app.step"
                    defaultMessage="Step"
                    description="Step Label"/> 1 / 3</p>
              </header>
              <p>
                <FormattedMessage id="app.register.step1.question"
                  defaultMessage="No momento você:"
                  description="Register Step 1 Question"/>
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm md xs lg={4}>
              <p><Button variant="primary" size="lg" block href='/register/step2a' onClick={(e) => this.props.onHasSymptomsClick()}>
                <FormattedMessage id="app.register.step1.button1"
                  defaultMessage="Sim"
                  description="Register Step 1 Button 1 Label"/>
              </Button>{' '}</p>
              <p><Button variant="primary" size="lg" block href='/register/step2b' onClick={(e) => this.props.onNoSymptomsClick()}>
                <FormattedMessage id="app.register.step1.button2"
                  defaultMessage="Não"
                  description="Register Step 1 Button 2 Label"/>
              </Button>{' '}</p>
              <p><Button variant="primary" size="lg" block href='/register/step2c' onClick={(e) => this.props.onIsInfectedClick()}>
                <FormattedMessage id="app.register.step1.button3"
                  defaultMessage="Tenho os sintomas"
                  description="Register Step 1 Button 3 Label"/>
              </Button>{' '}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connector(Step1);