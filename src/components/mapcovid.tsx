import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
//import { Map, Marker, Popup } from 'react-leaflet';
//import { Map } from 'react-leaflet';
import { LocationEvent } from 'leaflet';
import { RootState } from '../store';
import { setMapBounds } from '../store/actions/location';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ILatLngBounds, Feature, Geometry } from '../store/types/location';
import HeatmapLayer from "react-leaflet-heatmap-layer/lib/HeatmapLayer";
//import * as L from 'leaflet';
//import './leaflet_heat';

interface IMapCovidState {
  hasLocation: boolean;
  initialized: boolean;
  latlng: {
    lat: number,
    lng: number,
  };
};

type PropsFromRedux = ConnectedProps<typeof connector>

interface IMapCovidProps extends PropsFromRedux {
};

const mapState = (state: RootState) => ({
  zipcode: state.form.zipcode,
  isLoading: state.location.isLoading,
  lat: state.location.lat,
  lng: state.location.lng,
  bounds: state.location.bounds,
  zoom: state.location.zoom,
  points: state.location.points
});

const mapDispatch = (dispatch) => bindActionCreators({
  setMapBounds: (bounds:ILatLngBounds) => dispatch(setMapBounds(bounds))
}, dispatch);

const connector = connect(mapState, mapDispatch);

const Heatmap = (props) => {
  if (props.points == null) {
    return null;
  }
  if (props.points.length > 0) {
    var points = [];
    props.points.forEach((point:Feature) => {
      if (point.geometry.type === Geometry.POINT) {
        let {coordinates} = point.geometry;
        points.push([coordinates[0], coordinates[1], point.properties.density/10]);
      }
    });

    return (
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={points}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => parseFloat(m[2])}
        minOpacity={0.1}
        />
    );
  }
  return null;
}

class MapCovid extends Component<IMapCovidProps, IMapCovidState> {
  state: IMapCovidState;
  map;

  constructor(props:IMapCovidProps) {
    super(props);

    this.state = {
      hasLocation: false,
      latlng: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
      initialized: false
    }
  }

  /*loadMap = () => {
    setTimeout(((self) => {
      return() => {
        if (self.map == null) {
          var mymap = L.map('mymap').setView([51.505, -0.09], 13);
          mymap.on('load', (ev) => {
            console.log('loaded');
            if (props.bounds == null) {
              props.setMapBounds({ northEast: bounds['_northEast'], southWest: bounds['_southWest'] });
            }
          });
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3VlbXVyYSIsImEiOiJjazhqdm5yMDAwNmRmM2VzMGVobnBycjBhIn0.GWKHmJhVRikIzoo7kSvIzg', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 16,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
          }).addTo(mymap);
          self.map = mymap;
        }
      }
    })(this), 1000);
    this.setState({initialized: true});
  }*/

  componentDidMount() {
    this.locateUser();
    let bounds = this.mapRef.leafletElement.getBounds();
    if (this.props.bounds == null) {
      this.props.setMapBounds({ northEast: bounds['_northEast'], southWest: bounds['_southWest'] });
    }
    /*if (!this.state.initialized) {
      this.loadMap();
    }*/
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
    let h = window.innerHeight - 66;
    const marker = this.state.hasLocation ? (
    <Marker position={this.state.latlng}>
      <Popup>You are here</Popup>
    </Marker>
    ) : null

    /*return (
      <div id="mymap" style={{height: h +'px'}}></div>
    );*/
    return (
      <Map center={this.state.latlng} zoom={this.props.zoom} style={{height: h +'px'}} onLocationfound={this.handleLocationFound} onClick={this.handleClick} ref={mapRef => this.mapRef = mapRef}>
        <TileLayer
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          id='mapbox/streets-v11'
        />
        {marker}
        <Heatmap points={this.props.points} />
      </Map>
    );
  }
}

export default connector(MapCovid);
