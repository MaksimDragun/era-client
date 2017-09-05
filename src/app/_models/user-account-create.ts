export class UserAccountCreate {
  id: number;
  customerId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
  birthdate: Date;
  roles: string[];
}
