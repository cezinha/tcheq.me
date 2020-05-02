import {
    IFormState,
    FormActionsTypes,
    FormType
} from "../types/form";
import _ from 'lodash';


const initialState : IFormState = {
    hasSymptoms: false,
    isInfected: false,
    hadContact: false,
    symptoms: [],
    quarantineDays: 0,
    zipcode: '',
    dataSaved: false,
    error: ""
}

export function formReducer(state = initialState, action: FormActionsTypes) : IFormState {
    switch(action.type) {
        case FormType.CHANGE_HAS_SYMPTOMS:
            return {
                ...state,
                hasSymptoms: Boolean(action.hasSymptoms),
                isInfected: false,
                symptoms: [],
                quarantineDays: 0,
                zipcode: '',
                dataSaved: false,
                error: ""
            }
        case FormType.CHANGE_IS_INFECTED:
            return {
                ...state,
                hasSymptoms: false,
                isInfected: true,
                symptoms: [],
                quarantineDays: 0,
                zipcode: '',
                dataSaved: false,
                error: ""
            }
        case FormType.CHANGE_HAD_CONTACT:
            return {
                ...state,
                hasSymptoms: false,
                hadContact: action.hadContact
            }
        case FormType.TOGGLE_SYMPTOM:
            let symptoms = action.all;
            if (symptoms == null || symptoms.length === 0) {
                return {
                    ...state,
                    symptoms: []
                }
            }
            let aux = state.symptoms;
            let found = (_.find(state.symptoms, action.symptom) != null);
            if (!found) {
                aux = [
                    ...state.symptoms,
                    action.symptom
                ]
            } else {
                aux = symptoms.filter((s) => !(s.id === action.symptom.id));
            }
            return {
                ...state,
                symptoms: aux
            }
        case FormType.CHANGE_QUARANTINE:
            return {
                ...state,
                quarantineDays: action.quarantineDays
            }
        case FormType.CHANGE_ZIP_CODE:
            return {
                ...state,
                zipcode: action.zipcode
            }
        case FormType.UPDATE_DATA_SAVED:
            return {
                ...state,
                dataSaved: true
            }
        case FormType.ERROR_UPDATE:
            return {
                ...state,
                error: action.error,
                dataSaved: false
            }
        default:
            return state;
    }
}