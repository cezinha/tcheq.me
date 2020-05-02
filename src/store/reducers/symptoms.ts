import {
    ISymptomState,
    SYMPTOM_FETCH_COMPLETED,
    SYMPTOM_FETCH_STARTED,
    SYMPTOM_FETCH_ERROR,
    SymptomActionsTypes
} from '../types/symptoms';

const initialState: ISymptomState = {
    list: [],
    error: '',
    isLoading: false,
    language: navigator.language.replace(/-.*/, '')
}

export function symptomsReducer(state = initialState, action: SymptomActionsTypes) : ISymptomState {
    switch(action.type) {
        case SYMPTOM_FETCH_STARTED:
            return {
                ...state,
                list: [],
                error: '',
                isLoading: true
            }
        case SYMPTOM_FETCH_COMPLETED:
            return {
                ...state,
                list: action.list,
                error: '',
                isLoading: false
            }
        case SYMPTOM_FETCH_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}