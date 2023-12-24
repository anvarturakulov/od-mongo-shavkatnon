import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/document.create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateDocumentDto) {
    this.documentService.createReference(dto);
  };


}
