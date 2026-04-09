export class UserEntity {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: UserEntityProps) {
    this.id = props.id;
    this.email = props.email;
    this.username = props.username;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

interface UserEntityProps {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
