import { ContactActionsTypes, ContactType, IContact } from '../types/contact';
import Axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import settings from '../../settings.json';


export function changeUserID(userID: number): ContactActionsTypes {
    return {
        type: ContactType.CHANGE_USER_ID,
        userID: userID
    };
}

export function changePhoneNumber(phoneNumber: string): ContactActionsTypes {
    return {
        type: ContactType.CHANGE_PHONE_NUMBER,
        phoneNumber: phoneNumber
    };
}

export function changeSmsToken(smsToken: string): ContactActionsTypes {
    return {
        type: ContactType.CHANGE_SMS_TOKEN,
        smsToken: smsToken
    }
}

export function changeTokenValid(isTokenValid: boolean): ContactActionsTypes {
    return {
        type: ContactType.CHANGE_TOKEN_VALID,
        isTokenValid: isTokenValid
    };
}

export function updateContactList(contacts: IContact[]): ContactActionsTypes {
    return {
        type: ContactType.UPDATE_CONTACTLIST,
        contacts: contacts
    };
}

function updateDataSaved(): ContactActionsTypes {
    return {
        type: ContactType.UPDATE_DATA_SAVED
    };
}

function errorUpdate(error: string): ContactActionsTypes {
    return {
        type: ContactType.ERROR_UPDATE,
        error: error
    }
}

export const saveContacts = (): ThunkAction<void, RootState, unknown, ContactActionsTypes> => async (dispatch, getState) => {
    try {
        // get store data
        // var form = getState().form;
        // do request with data
        Axios.get(`${settings.API_URL}/list_symptoms?ld_lang=`)
        .then(res => {
            // const data = res.data;
            // check is correct
            dispatch(updateDataSaved());
        });
    } catch (err) {
        dispatch(errorUpdate(String(err)));
    }
}