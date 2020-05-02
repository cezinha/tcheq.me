export interface IContactState {
    userID: number,
    phoneNumber: string,
    smsToken: string,
    isTokenValid: boolean,
    contacts: IContact[],
    dataSaved: boolean,
    error: string
}

export interface IContact {
    phoneNumber: string,
    type: string
}

export enum ContactType {
    CHANGE_USER_ID = "CHANGE_USER_ID",
    CHANGE_PHONE_NUMBER = "CHANGE_PHONE_NUMBER",
    CHANGE_SMS_TOKEN = "CHANGE_SMS_TOKEN",
    CHANGE_TOKEN_VALID = "CHANGE_TOKEN_VALID",
    UPDATE_CONTACTLIST = "UPDATE_CONTACTLIST",
    UPDATE_DATA_SAVED = "UPDATE_DATA_SAVED",
    ERROR_UPDATE = "ERROR_UPDATE"
}

interface IChangeUserID {
    type: typeof ContactType.CHANGE_USER_ID,
    userID: number
}
interface IChangePhoneNumber {
    type: typeof ContactType.CHANGE_PHONE_NUMBER,
    phoneNumber: string
}
interface IChangeSmsToken {
    type: typeof ContactType.CHANGE_SMS_TOKEN,
    smsToken: string
}
interface IChangeTokenValid {
    type: typeof ContactType.CHANGE_TOKEN_VALID,
    isTokenValid: boolean
}
interface IUpdateContactList {
    type: typeof ContactType.UPDATE_CONTACTLIST,
    contacts: IContact[]
}
interface IUpdateDataSaved {
    type: typeof ContactType.UPDATE_DATA_SAVED,
}
interface IErrorUpdate {
    type: typeof ContactType.ERROR_UPDATE,
    error: string
}
export type ContactActionsTypes =
    IChangeUserID |
    IChangePhoneNumber |
    IChangeSmsToken |
    IChangeTokenValid |
    IUpdateContactList |
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