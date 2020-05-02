import { ISymptom } from "./symptoms";

export interface IFormState {
    hasSymptoms: boolean,
    isInfected: boolean,
    hadContact: boolean,
    symptoms: ISymptom[],
    quarantineDays: number,
    zipcode: string,
    dataSaved: boolean,
    error: string
}

export interface IContact {
    phoneNumber: string,
    type: string
}

export enum FormType {
    CHANGE_HAS_SYMPTOMS = "CHANGE_HAS_SYMPTOMS",
    CHANGE_IS_INFECTED = "CHANGE_IS_INFECTED",
    CHANGE_HAD_CONTACT = "CHANGE_HAD_CONTACT",
    TOGGLE_SYMPTOM = "TOGGLE_SYMPTOM",
    CHANGE_QUARANTINE = "CHANGE_QUARANTINE",
    CHANGE_ZIP_CODE = "CHANGE_ZIP_CODE",
    UPDATE_DATA_SAVED = "UPDATE_DATA_SAVED",
    ERROR_UPDATE = "ERROR_UPDATE"
}

interface IChangeHasSymptoms {
    type: typeof FormType.CHANGE_HAS_SYMPTOMS,
    hasSymptoms: boolean
}
interface IChangeIsInfected {
    type: typeof FormType.CHANGE_IS_INFECTED
}
interface IChangeHadContact {
    type: typeof FormType.CHANGE_HAD_CONTACT,
    hadContact: boolean
}
interface IToggleSymptom {
    type: typeof FormType.TOGGLE_SYMPTOM,
    symptom: ISymptom,
    all: ISymptom[]
}
interface IChangeQuarantine {
    type: typeof FormType.CHANGE_QUARANTINE,
    quarantineDays: number
}
interface IChangeZipCode {
    type: typeof FormType.CHANGE_ZIP_CODE,
    zipcode: string
}
interface IUpdateDataSaved {
    type: typeof FormType.UPDATE_DATA_SAVED,
}
interface IErrorUpdate {
    type: typeof FormType.ERROR_UPDATE,
    error: string
}
export type FormActionsTypes =
    IChangeHasSymptoms |
    IChangeIsInfected |
    IChangeHadContact |
    IToggleSymptom |
    IChangeZipCode |
    IChangeQuarantine |
    IUpdateDataSaved |
    IErrorUpdate;

export class Contact implements IContact {
    phoneNumber: string;
    type: string;

    constructor(phoneNumber: string, type: string) {
        this.phoneNumber = phoneNumber
        this.type = type
    }
}