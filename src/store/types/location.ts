//import { fromLonLat } from 'ol/proj';
export interface ILocationState {
    lat: number,
    lng: number,
    bounds: ILatLngBounds,
    zoom: number,
    points: IFeature[],
    isLoading: boolean,
    error: string,
    ip: string,
    zipcep_id: number,
    restored: boolean
}

export interface IPoint {
    lat: number,
    lng: number
}

export interface ILatLngBounds {
    northEast: IPoint,
    southWest: IPoint
}

export enum LocationType {
    LOAD_POINTS_STARTED = "LOAD_POINTS_STARTED",
    LOAD_POINTS_COMPLETED = "LOAD_POINTS_COMPLETED",
    LOAD_POINTS_ERROR = "LOAD_POINTS_ERROR",
    FIND_LOCATION_STARTED = "FIND_LOCATION_STARTED",
    FIND_LOCATION_COMPLETED = "FIND_LOCATION_COMPLETED",
    FIND_LOCATION_ERROR = "FIND_LOCATION_ERROR",
    SET_MAP_BOUNDS = "SET_MAP_BOUNDS",
    GET_USER_LOCATION_STARTED = "GET_USER_LOCATION_STARTED",
    GET_USER_LOCATION_COMPLETED = "GET_USER_LOCATION_COMPLETED",
    GET_USER_LOCATION_ERROR = "GET_USER_LOCATION_ERROR"
}

interface ISetMapBounds {
    type: typeof LocationType.SET_MAP_BOUNDS,
    bounds: ILatLngBounds
}

interface ILoadPointsStarted {
    type: typeof LocationType.LOAD_POINTS_STARTED
}

interface ILoadPointsCompleted {
    type: typeof LocationType.LOAD_POINTS_COMPLETED,
    payload: any
}

interface ILoadPointsError {
    type: typeof LocationType.LOAD_POINTS_ERROR,
    error: string
}

interface IFindLocationStarted {
    type: typeof LocationType.FIND_LOCATION_STARTED
}

interface IFindLocationCompleted {
    type: typeof LocationType.FIND_LOCATION_COMPLETED,
    payload: any
}

interface IFindLocationError {
    type: typeof LocationType.FIND_LOCATION_ERROR,
    error: string
}

interface IGetUserLocationStarted {
    type: typeof LocationType.GET_USER_LOCATION_STARTED
}

interface IGetUserLocationCompleted {
    type: typeof LocationType.GET_USER_LOCATION_COMPLETED,
    payload: any
}

interface IGetUserLocationError {
    type: typeof LocationType.GET_USER_LOCATION_ERROR,
    error: string
}

export type LocationActionTypes = ILoadPointsStarted | ILoadPointsCompleted | ILoadPointsError
    | IFindLocationStarted | IFindLocationCompleted | IFindLocationError
    | IGetUserLocationStarted | IGetUserLocationCompleted | IGetUserLocationError
    | ISetMapBounds;

export interface IFeature {
    type: String,
    geometry: IGeometry,
    properties: Properties
}

export interface IGeometry {
    type: string,
    coordinates: Array<Array<Array<number>>>[]
}

export class Feature implements IFeature {
    type: String;
    geometry: IGeometry;
    properties: Properties;

    constructor(geometry, density) {
        this.type = "Feature";
        this.geometry = geometry;
        this.properties = new Properties(density);
    }

    static factory(feature:object) {
        if ('poli' in feature && feature['poli'] != null && feature['poli'].length > 0) {
            return new Feature(Geometry.poli(feature), parseFloat(feature['ct']));
        }
        return new Feature(Geometry.point(feature), parseFloat(feature['ct']));
    }

    static point(feature:object) {
        return new Feature(Geometry.point(feature), parseFloat(feature['ct']));
    }

    static poli(feature:object) {
        return new Feature(Geometry.poli(feature), parseFloat(feature['ct']));
    }
}

export class Properties {
    name?: String;
    density: number;
    isconverted: boolean;

    constructor(density = 0, name = null) {
        this.density = density;
        this.isconverted = false;

        if (name != null) {
            this.name = name;
        }
    }
}

export class Geometry implements IGeometry {
    type: string;
    coordinates: [];

    constructor(type, coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }

    static POINT:string = "Point";
    static POLYGON:string = "Polygon";

    static point(feature: object) {
        return new Geometry(
            Geometry.POINT,
            [parseFloat(feature['lng']), parseFloat(feature['lat'])]
        )
    }

    static poli(feature: object) {
        let coordinates = feature['poli'].split(";");
        let allCoordinates = coordinates.map((c) => {
            let points = c.split(",");
            return ([Number(points[0]), Number(points[1])]);
        });
        return new Geometry(
            Geometry.POLYGON,
            [allCoordinates]
        )
    }
}