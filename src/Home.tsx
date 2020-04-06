import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map, TileLayer } from 'react-leaflet'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import HeatmapLayer from "react-leaflet-heatmap-layer/lib/HeatmapLayer";
import data from "./rodents.json";

class LeafletMap extends React.Component<{}> {
  render() {
    const position = { lat: 42.35, lng: -71.08 };
    var addressPoints = data.features.map(function(rat) {
      // the heatmap plugin wants an array of each location
      var location = rat.geometry.coordinates;
      if (location.length === 2) {
        location.reverse();
        location.push(0.5);
      }
      return location; // e.g. [50.5, 30.5, 0.2], // lat, lng, intensity
    });

    let h = window.innerHeight - 56 - 121;
    return (
      <Map center={position} zoom={13} style={{height: h +'px'}}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={addressPoints}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => parseFloat(m[2])}
          minOpacity={0.1}
          />
      </Map>
    );
  }
}
function Home() {
  return (
    <div id="home-page">
      <Container>
        <Row>
          <Col>
            <header>
              <h1 className="display-4">Testing page</h1>
              <p className="lead">First page for project</p>
            </header>
          </Col>
        </Row>
      </Container>
      <LeafletMap />
    </div>
  );
}

export default Home;