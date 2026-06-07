export interface CreateUserData {
  email: string;
  username: string;
  password: string;
  name?: string;
  lastName?: string;
  birthdate?: Date;
}
