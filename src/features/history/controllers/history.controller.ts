import {
  Controller,
  Get,
  Param,
  Query,
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
import { HistoryService } from '../services/history.service';

@ApiTags('History')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated session history' })
  @ApiResponse({ status: 200, description: 'Paginated sessions list' })
  getHistory(
    @CurrentUser() user: JwtPayload,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.historyService.getHistory(user.sub, page, limit);
  }

  @Get('sessions/:sessionId')
  @ApiOperation({ summary: 'Get full session details' })
  @ApiResponse({ status: 200, description: 'Session with all details' })
  getSessionDetails(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.historyService.getSessionDetails(sessionId, user.sub);
  }
}
