import { FormActionsTypes, FormType } from '../types/form';
import { ISymptom } from '../types/symptoms';
import Axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import settings from '../../settings.json';

export function changeHasSymptoms(hasSymptoms: boolean): FormActionsTypes {
    return {
        type: FormType.CHANGE_HAS_SYMPTOMS,
        hasSymptoms: hasSymptoms
    };
}

export function changeIsInfected(): FormActionsTypes {
    return {
        type: FormType.CHANGE_IS_INFECTED
    };
}

export function changeHadContact(hadContact: boolean): FormActionsTypes {
    return {
        type: FormType.CHANGE_HAD_CONTACT,
        hadContact: hadContact
    };
}

export function toggleSymptom(symptom: ISymptom, all: ISymptom[]): FormActionsTypes {
    return {
        type: FormType.TOGGLE_SYMPTOM,
        symptom: symptom,
        all: all
    };
}

export function changeQuarantine(quarantineDays: number): FormActionsTypes {
    return {
        type: FormType.CHANGE_QUARANTINE,
        quarantineDays: quarantineDays
    };
}

export function changeZipcode(zipcode: string): FormActionsTypes {
    return {
        type: FormType.CHANGE_ZIP_CODE,
        zipcode: zipcode
    };
}

export function updateDataSaved(): FormActionsTypes {
    return {
        type: FormType.UPDATE_DATA_SAVED
    };
}

export function errorUpdate(error: string): FormActionsTypes {
    return {
        type: FormType.ERROR_UPDATE,
        error: error
    };
}

export const thunkSaveForm = (): ThunkAction<void, RootState, unknown, FormActionsTypes> => async (dispatch, getState) => {
    try {
        const serialize = function(obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        }
        // get store data
        var form = getState().form;
        var location = getState().location;
        // do request with data
        var api_url = `${settings.API_URL}/save_symptoms?`;
        // var api_url = "http://localhost:3000/save_symptoms?"
        console.log(form);
        console.log(api_url);
        //console.log(form.symptoms);
         // form.symptoms.map((s) => s.id).join(",").toString()
        let postObj = {
            is_infected: (form.isInfected) ? 1 : 0,
            has_symptoms: (form.hasSymptoms) ? 1 : 0,
            symptoms_array: '',
            days_quarantine: form.quarantineDays,
            had_contact: (form.hadContact) ? 1 : 0,
            zip_cep_id: location.zipcep_id
        }
        Axios.get(`${api_url}${serialize(postObj)}`, )
        .then(res => {
            // const data = res.data;
            // check is correct
            dispatch(updateDataSaved());
        });
    } catch (err) {
        dispatch(errorUpdate(String(err)));
    }
}