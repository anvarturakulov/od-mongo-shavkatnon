import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/document.create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DocumentType } from 'src/interfaces/document.interface';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { DOCUMENT_NOT_FOUND_ERROR } from './document.constants';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateDocumentDto) {
    // console.log(dto)
    this.documentService.createReference(dto);
  };

  @UseGuards(JwtAuthGuard)
  @Get('byType/:documentType')
  async getByTypeDocument(@Param('documentType',) documentType: DocumentType) {
    return this.documentService.getByTypeDocument(documentType)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll/')
  async getAllDocuments() {
    return this.documentService.getAllDocuments()
  }

  @UseGuards(JwtAuthGuard)
  @Delete('markToDelete/:id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const markedDoc = await this.documentService.markToDelete(id);
    if (!markedDoc) {
      throw new HttpException(DOCUMENT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
  }

}
