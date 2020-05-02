import {
    IContactState,
    ContactActionsTypes,
    ContactType
} from "../types/contact";

const initialState : IContactState = {
    userID: 0,
    phoneNumber: "",
    smsToken: "",
    isTokenValid: false,
    contacts: [],
    dataSaved: false,
    error: ""
}

export function contactReducer(state = initialState, action: ContactActionsTypes) : IContactState {
    switch(action.type) {
        case ContactType.CHANGE_USER_ID:
            return {
                ...state,
                userID: action.userID
            }
        case ContactType.CHANGE_PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case ContactType.CHANGE_SMS_TOKEN:
            return {
                ...state,
                smsToken: action.smsToken
            }
        case ContactType.CHANGE_TOKEN_VALID:
            return {
                ...state,
                isTokenValid: action.isTokenValid
            }
        case ContactType.UPDATE_CONTACTLIST:
            return {
                ...state,
                contacts: action.contacts
            }
        case ContactType.UPDATE_DATA_SAVED:
            return {
                ...state,
                dataSaved: true
            }
        case ContactType.ERROR_UPDATE:
            return {
                ...state,
                error: action.error,
                dataSaved: false
            }
        default:
            return state;
    }
}