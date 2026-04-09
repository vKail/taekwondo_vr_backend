import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUserData } from '../interfaces/create-user-data.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async createUser(data: CreateUserData): Promise<UserEntity> {
    const record = await this.prisma.user.create({ data });
    return UserMapper.toDomain(record);
  }
}
