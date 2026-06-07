import { UserEntity } from '../entities/user.entity';

interface UserRecord {
  id: number;
  email: string;
  username: string;
  password: string;
  name: string | null;
  lastName: string | null;
  birthdate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UserMapper {
  static toDomain(record: UserRecord): UserEntity {
    return new UserEntity({
      id: record.id,
      email: record.email,
      username: record.username,
      password: record.password,
      name: record.name,
      lastName: record.lastName,
      birthdate: record.birthdate,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
