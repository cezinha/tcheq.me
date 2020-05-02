export interface ISymptomState {
    list: ISymptom[],
    error: string,
    isLoading: boolean,
    language: string
}

export interface ISymptom {
    id: number,
    type: string
}

// fetch symptoms
export const SYMPTOM_FETCH_STARTED: string = "SYMPTOM_FETCH_STARTED";
export const SYMPTOM_FETCH_COMPLETED: string = "SYMPTOM_FETCH_COMPLETED";
export const SYMPTOM_FETCH_ERROR: string = "SYMPTOM_FETCH_ERROR";

interface ISymptomFetchStarted {
    type: typeof SYMPTOM_FETCH_STARTED,
    list?: undefined,
    error?: undefined
}

interface ISymptomFetchCompleted {
    type: typeof SYMPTOM_FETCH_COMPLETED,
    list: ISymptom[],
    error?: undefined
}

interface ISymptomFetchError {
    type: typeof SYMPTOM_FETCH_ERROR,
    list?: undefined,
    error: string
}

export type SymptomActionsTypes = ISymptomFetchCompleted | ISymptomFetchError | ISymptomFetchStarted;