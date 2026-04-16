import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Query,
  Body,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../core/security/guards/jwt-auth.guard';
import { CurrentUser } from '../../../core/security/decorators/current-user.decorator';
import type { JwtPayload } from '../../../core/security/interfaces/jwt-payload.interface';
import { SessionService } from '../services/session.service';
import { CreateSessionDto } from '../dto/create-session.dto';
import { AddDetailsDto } from '../dto/add-details.dto';
import { CompleteSessionDto } from '../dto/complete-session.dto';

@ApiTags('Sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new training session' })
  @ApiResponse({ status: 201, description: 'Session created' })
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateSessionDto) {
    return this.sessionService.create(user.sub, dto);
  }

  @Post(':id/details')
  @ApiOperation({ summary: 'Add session details in bulk' })
  @ApiResponse({ status: 201, description: 'Details added' })
  addDetails(
    @Param('id', ParseIntPipe) sessionId: number,
    @CurrentUser() user: JwtPayload,
    @Body() dto: AddDetailsDto,
  ) {
    return this.sessionService.addDetails(sessionId, user.sub, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Complete a session' })
  @ApiResponse({ status: 200, description: 'Session completed' })
  complete(
    @Param('id', ParseIntPipe) sessionId: number,
    @CurrentUser() user: JwtPayload,
    @Body() dto: CompleteSessionDto,
  ) {
    return this.sessionService.complete(sessionId, user.sub, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session with details' })
  @ApiResponse({ status: 200, description: 'Session details' })
  getSession(
    @Param('id', ParseIntPipe) sessionId: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.sessionService.getSession(sessionId, user.sub);
  }
}
