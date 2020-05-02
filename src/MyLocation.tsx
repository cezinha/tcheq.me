import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './MyLocation.css';
import {
  Container,
  Row,
  Col,
  Spinner
} from 'react-bootstrap';
import { RootState } from './store';
import { thunkFindLocation } from './store/actions/location';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import MyMap from './components/mymap';

const mapState = (state: RootState) => ({
  zipcode: state.form.zipcode,
  isLoading: state.location.isLoading,
  lat: state.location.lat,
  lng: state.location.lng,
  bounds: state.location.bounds,
  points: state.location.points,
  zoom: state.location.zoom
});

const mapDispatch = (dispatch) => bindActionCreators({
  findLocation: () => thunkFindLocation()
}, dispatch);

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type IProps = PropsFromRedux;

class MyLocation extends React.PureComponent<IProps> {
  element:HTMLElement;

  componentDidMount() {
    this.props.findLocation();
  }

  render() {
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
      <div id="my-location-page">
        <div className="box-invite">
          <div>
            <p>
              <a href="/monitor">
              <FormattedMessage id="app.my_location.button"
                defaultMessage="Monitore-me"
                description="Check-me Button Label"/></a>
            </p>
          </div>
        </div>
        <MyMap />
      </div>
    );
  }
}

export default connector(MyLocation);