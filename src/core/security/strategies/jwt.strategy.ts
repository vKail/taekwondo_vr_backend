import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {

        const authHeader = req?.headers?.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.substring(7);
        }

        const cookieAuth = req?.headers?.cookie
          ?.split('Authorization=')?.[1]
          ?.split(';')[0];
        return cookieAuth || authHeader;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub, email: payload.email };
  }
}
