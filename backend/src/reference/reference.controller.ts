import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { TypeReference } from './models/referense.model';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { REFERENCE_NOT_FOUND_ERROR } from './reference.constants';

@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) { }

  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReferenceDto) {
    this.referenceService.createReference(dto);
  };

  // @UseGuards(JwtAuthGuard)
  @Delete('markToDelete/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const markedDoc = await this.referenceService.markToDelete(id);
    if (!markedDoc) {
      throw new HttpException(REFERENCE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('byType/:typeReference')
  async getByProductId(@Param('typeReference',) typeReference: TypeReference) {
    return this.referenceService.getByTypeReference(typeReference)
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const reference = await this.referenceService.findById(id);
    if (!reference) {
      throw new NotFoundException(REFERENCE_NOT_FOUND_ERROR);
    }
    return reference;
  }
};
