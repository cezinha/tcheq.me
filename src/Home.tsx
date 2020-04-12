import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Home.css';
import { Map, TileLayer } from 'react-leaflet'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import HeatmapLayer from "react-leaflet-heatmap-layer/lib/HeatmapLayer";
import data from "./rodents.json";

class LeafletMap extends React.Component<{}> {
  componentDidMount() {
    let h : Number = window.innerHeight - 66 - document.querySelector('header').parentElement.offsetHeight;
    let el : HTMLElement = document.querySelector('.leaflet-container');
    el.style.height = h+'px';
    el = document.querySelector('.box-invite');
    el.style.height = h+'px';
  }
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

    return (
      <Map center={position} zoom={13} style={{height: '1000px'}}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          id='mapbox/streets-v11'
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
  let h = window.innerHeight - 66 - 121;
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
      <div className="box-invite" style={{height: h +'px'}}>
        <div>
          <p>
            <a href="/register">Ver mapa e bairros afetados</a>
          </p>
        </div>
      </div>
      <LeafletMap />
    </div>
  );
}

export default Home;