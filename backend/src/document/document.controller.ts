import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/document.create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DocumentType } from 'src/interfaces/document.interface';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { DOCUMENT_NOT_FOUND_ERROR } from './document.constants';
import { AuthService } from 'src/auth/auth.service';
import { ReferencesForTelegramMessage, sendMessageToChanel } from './telegram/telegramMessage';
import { ReferenceService } from 'src/reference/reference.service';

@Controller('document')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly userService: AuthService,
    private readonly referenceService: ReferenceService,
  ) { }


  private sendMessage = async (dto: CreateDocumentDto, newDocument: boolean, messageInDeleting?: string) => {
    const user = await this.userService.findUserByName(dto.user);

    let sender, receiver, analitic, firstWorker, secondWorker, thirdWorker
    if (dto.senderId) sender = await this.referenceService.findById(dto.senderId);
    if (dto.receiverId) receiver = await this.referenceService.findById(dto.receiverId);
    if (dto.analiticId) analitic = await this.referenceService.findById(dto.analiticId);
    if (dto.firstWorkerId) firstWorker = await this.referenceService.findById(dto.firstWorkerId);
    if (dto.secondWorkerId) secondWorker = await this.referenceService.findById(dto.secondWorkerId);
    if (dto.thirdWorkerId) thirdWorker = await this.referenceService.findById(dto.thirdWorkerId);

    // console.log(firstWorker, secondWorker, thirdWorker)
    let references: ReferencesForTelegramMessage = {
      sender,
      receiver,
      analitic,
      firstWorker,
      secondWorker,
      thirdWorker,
    }
    sendMessageToChanel(dto, user, references, newDocument, messageInDeleting)
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateDocumentDto) {
    if (dto.proveden) {
      this.sendMessage(dto, true)
    }
    this.documentService.createDocument(dto);
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
    const document = await this.documentService.findById(id);
    let newDto = { ...JSON.parse(JSON.stringify(document)) }
    let messageIndeleting = newDto.deleted ? 'ЧЕК УЧИРИЛДИ' : 'ЧЕК ТИКЛАНДИ'
    this.sendMessage(newDto, false, messageIndeleting)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const document = await this.documentService.findById(id);
    if (!document) {
      throw new NotFoundException(DOCUMENT_NOT_FOUND_ERROR);
    }
    return document;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateDocumentDto) {
    this.sendMessage(dto, false)
    const updatedDocument = await this.documentService.updateById(id, dto);
    if (!updatedDocument) {
      throw new NotFoundException(DOCUMENT_NOT_FOUND_ERROR);
    }
    return updatedDocument;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('setProvodka/:id')
  async patchSetProvodka(@Param('id', IdValidationPipe) id: string) {

    const docForProvodka = await this.documentService.setProvodka(id);
    const document = await this.documentService.findById(id);

    let newDto = { ...JSON.parse(JSON.stringify(document)) }

    if (!docForProvodka) {
      throw new NotFoundException(DOCUMENT_NOT_FOUND_ERROR);
    }
    this.sendMessage(newDto, true)
    return docForProvodka;
  }

}
