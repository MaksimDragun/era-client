export class Registration {
  id: number;
  registrationId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  attestateAvg: number;

  prerogatives: string[];
  outOfCompetitions: string[];

  specialty: string;
  fundsSource: string;
  educationForm: string;
  educationBase: string;

  status: string;
  registrationDate: Date;
  registeredById: number;
  registeredBy: string;
  verificationDate: Date;
  verifiedById: number;
  verifiedBy: string;
}
