export class UserAccountCRUD {
  id: number;
  customerId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
  birthdate: Date;
  roles: {role: string, enabled}[] = [];
}
