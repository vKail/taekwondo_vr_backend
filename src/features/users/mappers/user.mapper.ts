import { UserEntity } from '../entities/user.entity';

interface UserRecord {
  id: number;
  email: string;
  username: string;
  password: string;
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
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }
}
