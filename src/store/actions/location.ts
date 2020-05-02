import { LocationActionTypes, LocationType, ILatLngBounds, IPoint } from "../types/location";
import Axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { changeZipcode } from "./form";
import { FormActionsTypes } from "../types/form";
import { updateDataSaved } from "../actions/form";
import settings from '../../settings.json';

export function loadPointsStarted(): LocationActionTypes {
    return {
        type: LocationType.LOAD_POINTS_STARTED
    };
}

export function loadPointsCompleted(payload): LocationActionTypes {
    return {
        type: LocationType.LOAD_POINTS_COMPLETED,
        payload: payload
    };
}

export function loadPointsError(error: string): LocationActionTypes {
    return {
        type: LocationType.LOAD_POINTS_ERROR,
        error: error
    };
}

export function findLocationStarted(): LocationActionTypes {
    return {
        type: LocationType.FIND_LOCATION_STARTED
    };
}

export function findLocationCompleted(payload): LocationActionTypes {
    return {
        type: LocationType.FIND_LOCATION_COMPLETED,
        payload: payload
    };
}

export function findLocationError(error: string): LocationActionTypes {
    return {
        type: LocationType.FIND_LOCATION_ERROR,
        error: error
    };
}

export function getUserLocationStarted(): LocationActionTypes {
    return {
        type: LocationType.GET_USER_LOCATION_STARTED
    }
}

export function getUserLocationCompleted(payload): LocationActionTypes {
    return {
        type: LocationType.GET_USER_LOCATION_COMPLETED,
        payload: payload
    };
}

export function getUserLocationError(error: string): LocationActionTypes {
    return {
        type: LocationType.GET_USER_LOCATION_ERROR,
        error: error
    };
}

export function setMapBounds(bounds: ILatLngBounds): LocationActionTypes {
    console.log(`setMapBounds:`);
    console.log(bounds);
    return {
        type: LocationType.SET_MAP_BOUNDS,
        bounds: bounds
    }
}

export const thunkLoadPoints = (): ThunkAction<void, RootState, unknown, LocationActionTypes> => async (dispatch, getState) => {
    dispatch(loadPointsStarted());
    const { zoom, bounds } = getState().location;
    const { northEast, southWest } = bounds;
    const northWest:IPoint = {
        lat: northEast.lat,
        lng: southWest.lng
    }
    const southEast:IPoint = {
        lat: southWest.lat,
        lng: northEast.lng
    }
    let pointsToStr = (point:IPoint) => `${point.lat},${point.lng}`;

    let params = `top_left=${pointsToStr(northWest)}&top_right=${pointsToStr(northEast)}&bot_left=${pointsToStr(southWest)}&bot_right=${pointsToStr(southEast)}&zoom=${zoom}`;
    console.log(params);
    try {
        Axios.get(`${settings.API_URL}/list_geo?${params}`)
        .then(res => {
            const data = res.data;
            dispatch(loadPointsCompleted(data));
        });
    } catch (err) {
        dispatch(loadPointsError(String(err)));
    }
}

export const thunkFindLocation = (): ThunkAction<void, RootState, unknown, LocationActionTypes> => async (dispatch, getState) => {
    dispatch(findLocationStarted());
    const zipcode = getState().form.zipcode;

    try {
        Axios.get(`${settings.API_URL}/find_location_by_ref?zip_cep=${zipcode}`)
        .then(res => {
            const data = res.data;
            dispatch(findLocationCompleted(data));
        });
    } catch (err) {
        dispatch(findLocationError(String(err)));
    }
}

export const thunkGetUserLocation = (): ThunkAction<void, RootState, unknown, LocationActionTypes | FormActionsTypes> => async (dispatch, getState) => {
    dispatch(getUserLocationStarted());

    try {
        console.log(`${settings.API_URL}/get_user_location`);
        Axios.get(`${settings.API_URL}/get_user_location`)
        .then(async res => {
            const data = res.data;
            console.log(res.data);
            if (data["ld_lang"] != null) {
                var zip = (data["ld_lang"] === "en") ? data["zip"] : data["cep"];
                await dispatch(changeZipcode(zip));
            }

            await dispatch(updateDataSaved());
            await new Promise(resolve => setTimeout(resolve, 500));
            dispatch(getUserLocationCompleted(data));
        });
    } catch (err) {
        dispatch(getUserLocationError(String(err)));
    }
}