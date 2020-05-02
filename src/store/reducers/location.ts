import { ILocationState, LocationActionTypes, LocationType, Feature, IFeature } from "../types/location";

const initialState: ILocationState = {
    lat: null,
    lng: null,
    bounds: null,
    zoom: 15,
    points: [],
    isLoading: false,
    error: '',
    ip: null,
    zipcep_id: -1,
    restored: false
}

export function locationReducer(state = initialState, action: LocationActionTypes) : ILocationState {
    switch(action.type) {
        case LocationType.LOAD_POINTS_STARTED:
        case LocationType.FIND_LOCATION_STARTED:
        case LocationType.GET_USER_LOCATION_STARTED:
            return {
                ...state,
                isLoading: true
            }
        case LocationType.LOAD_POINTS_COMPLETED:
            var points:IFeature[] = [];
            action.payload.forEach((feature) => {
                let point = Feature.factory(feature);
                points.push(point);
            });
            return {
                ...state,
                points: points,
                isLoading: false
            }
        case LocationType.FIND_LOCATION_COMPLETED:
            return {
                ...state,
                lat: Number(action.payload["lat"]),
                lng: Number(action.payload["lng"]),
                zipcep_id: Number(action.payload["zipcep_id"]),
                bounds: null,
                isLoading: false
            }
        case LocationType.SET_MAP_BOUNDS:
            return {
                ...state,
                bounds: action.bounds,
                points: [],
                isLoading: false
            }
        case LocationType.GET_USER_LOCATION_COMPLETED:
            return {
                ...state,
                lat: (action.payload && action.payload["lat"]) ? Number(action.payload["lat"]) : null,
                lng: (action.payload && action.payload["lng"]) ? Number(action.payload["lng"]) : null,
                ip: (action.payload && action.payload["ip"]) ? action.payload["ip"] : null,
                isLoading: false,
                restored: true
            }
        case LocationType.LOAD_POINTS_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        default:
            return state;
    }
}