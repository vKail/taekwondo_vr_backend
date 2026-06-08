import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EvaluationService } from '../services/evaluation.service';
import { CreateReferenceMovementDto } from '../dto/create-reference-movement.dto';
import { EvaluateAttemptDto } from '../dto/evaluate-attempt.dto';
import { JwtAuthGuard } from '../../../core/security/guards/jwt-auth.guard';

@ApiTags('Evaluation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('reference-movement')
  @ApiOperation({ summary: 'Save base JSON (Gold Standard)' })
  @ApiResponse({ status: 201, description: 'Reference movement created' })
  async createReferenceMovement(@Body() dto: CreateReferenceMovementDto) {
    return this.evaluationService.createReferenceMovement(dto);
  }

  @Post('evaluate')
  @ApiOperation({ summary: 'Evaluate user VR attempt against reference movement' })
  @ApiResponse({ status: 201, description: 'Evaluation completed and record saved' })
  async evaluate(@Body() dto: EvaluateAttemptDto, @Request() req) {
    return this.evaluationService.evaluateMovement(dto, req.user.sub);
  }
}
