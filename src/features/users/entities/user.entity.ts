export class UserEntity {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly name: string | null;
  readonly lastName: string | null;
  readonly birthdate: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: UserEntityProps) {
    this.id = props.id;
    this.email = props.email;
    this.username = props.username;
    this.password = props.password;
    this.name = props.name ?? null;
    this.lastName = props.lastName ?? null;
    this.birthdate = props.birthdate ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

interface UserEntityProps {
  id: number;
  email: string;
  username: string;
  password: string;
  name?: string | null;
  lastName?: string | null;
  birthdate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
