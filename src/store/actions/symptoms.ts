import { Action } from 'redux';
import { RootState } from '../index';
import { ThunkAction } from 'redux-thunk';
import {
    ISymptom,
    SymptomActionsTypes,
    SYMPTOM_FETCH_STARTED,
    SYMPTOM_FETCH_COMPLETED,
    SYMPTOM_FETCH_ERROR,
} from "../types/symptoms";
import axios from 'axios';
import settings from '../../settings.json';

export function symptomFetchStarted() : SymptomActionsTypes {
    return {
        type: SYMPTOM_FETCH_STARTED
    }
}

export function symptomFetchCompleted(list : ISymptom[]) : SymptomActionsTypes {
    return {
        type: SYMPTOM_FETCH_COMPLETED,
        list: list
    }
};

export function symptomFetchError(error: string) : SymptomActionsTypes {
    return {
        type: SYMPTOM_FETCH_ERROR,
        error: error
    }
}

export const thunkSymptomFetch = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(symptomFetchStarted());
    const lang = getState().symptoms.language;

    try {
        axios.get(`${settings.API_URL}/list_symptoms?ld_lang=${lang}`)
        .then(res => {
            const list = res.data;
            dispatch(symptomFetchCompleted(list));
        });
    } catch (err) {
        dispatch(symptomFetchError(String(err)));
    }
}
