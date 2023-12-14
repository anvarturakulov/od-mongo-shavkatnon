import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { ReferenceType } from './models/referense.model';

@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService){}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReferenceDto) {
    this.referenceService.createReference(dto);
  };


  @UseGuards(JwtAuthGuard)
  @Get('byType/:referenceType')
  async getByProductId(@Param('referenceType',) referenceType: ReferenceType) {
    return this.referenceService.getByTypeReference(referenceType)
  }
};
