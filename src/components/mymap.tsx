import React, { Component } from 'react';
//import { Container, Row, Form } from 'react-bootstrap';
//import * as ol from 'ol';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
//import KML from 'ol/format/KML';
import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'ol/layer';
//import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';

import GeoJSON from 'ol/format/GeoJSON';
//import MultiPoint from 'ol/geom/MultiPoint';
import VectorLayer from 'ol/layer/Vector';
import { Icon, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';
import { RootState } from '../store';
import { setMapBounds, thunkLoadPoints } from '../store/actions/location';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ILatLngBounds, Feature as appFeature, Geometry } from '../store/types/location';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

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
  loadPoints: () => thunkLoadPoints(),
  setMapBounds: (bounds:ILatLngBounds) => dispatch(setMapBounds(bounds))
}, dispatch);

const connector = connect(mapState, mapDispatch);

class MyMap extends Component<IMapCovidProps, IMapCovidState> {
  drawMap = () => {
    var { lat, lng } = this.props;

    window.addEventListener('resize',
    () => {
      let h = window.innerHeight;
      let map = document.getElementById('map');
      map.style.height = `${h}px`;
    }
    );

    var convertFeature = (feature: appFeature) => {
      if (feature.properties.isconverted === false) {
        feature.properties.isconverted = true;
        if (feature.geometry.type === Geometry.POINT) {
          let pointC = feature.geometry.coordinates;
          pointC = fromLonLat([pointC[1], pointC[0]]);
          feature.geometry.coordinates = pointC;
        } else {
          let polyC = feature.geometry.coordinates[0];
          polyC = polyC.map((point) => {
            return fromLonLat([point[0], point[1]]);
          });
          feature.geometry.coordinates[0] = polyC;
        }
      }
      return feature;
    }

    var geoPoints: appFeature[] = [];
    var geoPolygon: appFeature[] = [];
    this.props.points.forEach((feature: appFeature) => {
      feature = convertFeature(feature);
      if (feature.geometry.type === Geometry.POINT) {
        geoPoints.push(feature);
      } else {
        geoPolygon.push(feature);
      }
    });

    var geoPointsObject = {"type":"FeatureCollection", "features": geoPoints};
    var geoPolygonObject = {"type":"FeatureCollection", "features": geoPolygon};
    console.log(geoPolygonObject);
    console.log(this.props.points);
/*
    var geojsonObject = {
      "type":"FeatureCollection",
      "features":[
        {
          "type": "Feature",
          "properties": {
            "density": 10
          },
          "geometry": {
            "type": "Point",
            "coordinates": fromLonLat([-46.60744710,-23.57756350])
          }
        },
        {
          "type": "Feature",
          "properties": {
            "density": 5.9
          },
          "geometry": {
            "type": "Point",
            "coordinates": fromLonLat([-175.976,-19.962])
          }
        },
        {
          "type": "Feature",
          "properties": {
            "density": 5.9
          },
          "geometry": {
            "type": "Point",
            "coordinates": fromLonLat([-63.555,-22.059])
          }
        }
      ]};
*/
    var heatmapLayer = new HeatmapLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(geoPointsObject)
      }),
      blur: 15,
      radius: 5,
      weight: function(feature: Feature) {
        var density = parseFloat(feature.get('density'));
        return density;
      }
    });

    var markerLayer = mapLayers.marker(lng, lat);

    var polygonLayer = mapLayers.polygon(geoPolygonObject);

    polygonLayer.getSource().on('addfeature', function(evt){
      const source = evt.target;
      if (source.getState() === 'ready') {
        const numFeatures = source.getFeatures().length;
        console.log("Count after change: " + numFeatures);
      }
    });

    var osmLayer = new TileLayer({
      source: new OSM({
        attributions: [
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        ],
        url: 'https://api.mapbox.com/styles/v1/cuemura/ck9lmz4u81ypg1ipn1dompx6d/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3VlbXVyYSIsImEiOiJjazhqdm5yMDAwNmRmM2VzMGVobnBycjBhIn0.GWKHmJhVRikIzoo7kSvIzg'
      })
    });

    //var center = fromLonLat([-46.579380464868166,-23.59469179360468]);
    var map = new Map({
      layers: [osmLayer, polygonLayer, heatmapLayer, markerLayer],
      target: 'map',
      view: new View({
        center: fromLonLat([lng,lat]),
        zoom: this.props.zoom
      })
    });

    if (this.props.bounds == null) {
      let ext = map.getView().calculateExtent();
      var sw = toLonLat([ext[0], ext[1]]).reverse();
      var ne = toLonLat([ext[2], ext[3]]).reverse();
      this.props.setMapBounds({ southWest: { lat: sw[0], lng: sw[1] }, northEast: { lat: ne[0], lng: ne[1] } });
      this.props.loadPoints();
    }
    window.addEventListener('resize', () => {
      let h = window.innerHeight - 66;
      document.getElementById('map').style.height = h + 'px';
    });
  }

  componentDidMount() {
    this.drawMap();
  }

  render() {
    const h = window.innerHeight - 66;
    return (
      <div id="map" style={{height: h}}></div>
      );
  }
}

export default connector(MyMap);

var mapLayers = {
  marker: (lng, lat) => {
    return new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            type: 'geoMarker',
            geometry: new Point(fromLonLat([lng,lat]))
          })
        ]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'icon.png'
        })
      })
    });
  },
  polygon: (geoObj) => {
    return new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(geoObj)
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
      })
    });
  }
};