export class RegistrationStatus {
  value: string;
}

export const UNCOMPLETE: RegistrationStatus = {value: 'U'};
export const NOT_VERIFIED: RegistrationStatus = {value: 'N'};
export const VERIFIED: RegistrationStatus = {value: 'V'};
export const ACCEPTED: RegistrationStatus = {value: 'A'};
export const CANCELED: RegistrationStatus = {value: 'C'};

export const REGISTRATION_STATUS_LIST: RegistrationStatus[] = [UNCOMPLETE, NOT_VERIFIED, VERIFIED, ACCEPTED, CANCELED];
