import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { LocationEvent } from 'leaflet';

interface IState {
  hasLocation: boolean;
  latlng: {
    lat: number,
    lng: number,
  };
};

interface IProps {};

class EventsExample extends Component<IProps, IState> {
  state: IState;

  constructor(props:IProps) {
    super(props);

    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09,
      }
    }
  }

  componentDidMount() {
    this.locateUser();
  }

  mapRef: Map;

  handleClick = () => {
    const map = this.mapRef;
    if (map != null) {
      map.leafletElement.locate()
    }
  }

  locateUser = () => {
    const map = this.mapRef;
    if (map != null) {
      map.leafletElement.locate()
    }
  }

  handleLocationFound = (e: LocationEvent) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  }

  render() {
    let h = window.innerHeight - 56 - 121;
    const marker = this.state.hasLocation ? (
    <Marker position={this.state.latlng}>
      <Popup>You are here</Popup>
    </Marker>
    ) : null

    return (
      <Map center={this.state.latlng} zoom={16} style={{height: h +'px'}} onLocationfound={this.handleLocationFound} ref={mapRef => this.mapRef = mapRef}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          id='mapbox/streets-v11'
        />
        {marker}
      </Map>
    );
  }
}

function MyLocation() {
  return (
    <div id="my-location-page">
      <Container>
        <Row>
          <Col>
            <header>
              <h1 className="display-4">My Location</h1>
              <p className="lead">Marker shows where you are</p>
            </header>
          </Col>
        </Row>
      </Container>
      <EventsExample />
    </div>
  );
}

export default MyLocation;