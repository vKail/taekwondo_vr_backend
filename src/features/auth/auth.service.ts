import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../users/repositories/user.repository';
import { JwtPayload } from '../../core/security/interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly BCRYPT_ROUNDS = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ access_token: string; user: { id: number; email: string; username: string } }> {
    const existingUser = await this.userRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, this.BCRYPT_ROUNDS);
    const created = await this.userRepository.createUser({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
    });

    const payload: JwtPayload = { email: created.email, sub: created.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: created.id, email: created.email, username: created.username },
    };
  }
}
