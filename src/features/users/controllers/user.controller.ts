import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../../../core/security/guards/jwt-auth.guard';
import { CurrentUser } from '../../../core/security/decorators/current-user.decorator';
import type { JwtPayload } from '../../../core/security/interfaces/jwt-payload.interface';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile (about-me)' })
  @ApiResponse({ status: 200, description: 'Returns current user data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getMe(@CurrentUser() user: JwtPayload) {
    return this.userService.getProfile(user.sub);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile (patch)' })
  @ApiResponse({ status: 200, description: 'Returns updated user data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateData: UpdateUserDto,
  ) {
    return this.userService.updateProfile(user.sub, updateData);
  }
}
