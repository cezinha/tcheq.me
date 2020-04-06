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
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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