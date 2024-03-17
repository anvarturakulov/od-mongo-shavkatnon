import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HamirService } from './hamir.service';
import { CreateHamirDto } from './dto/hamir.create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { HAMIR_NOT_FOUND_ERROR } from './hamir.constants';
import { DocumentService } from 'src/document/document.service';
import { CreateDocumentDto } from 'src/document/dto/document.create.dto';
import { ReferencesForTelegramMessage, sendMessageToChanel } from 'src/telegram/telegramMessage';
import { ReferenceService } from 'src/reference/reference.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('hamir')
export class HamirController {
  constructor(
    private readonly hamirService: HamirService,
    private readonly documentService: DocumentService,
    private readonly referenceService: ReferenceService,
    private readonly userService: AuthService,

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
  async create(@Body() dto: CreateHamirDto) {
    let hamirs = await this.hamirService.getHamirsByUserToDate(dto)
    let countHamir = dto.fromHamirchi ? 51 : 26
    if (dto.sectionId != '' && dto.analiticId != '' && !hamirs.length) {
      for (let i = 1; i < countHamir; i++) {
        let newDto = { ...dto };
        newDto.order = i;
        let newHamir = this.hamirService.createHamir(newDto);
      }
    }

  };

  @UseGuards(JwtAuthGuard)
  @Get('getForDate/:date')
  async getAllHamirsForDate(@Param('date') date: string) {
    return this.hamirService.getAllHamirsForDate(date)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchSetProvodka(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateDocumentDto) {
    const hamirForProvodka = await this.hamirService.setProvodka(id, dto.count);
    if (!hamirForProvodka) {
      throw new NotFoundException(HAMIR_NOT_FOUND_ERROR);
    }

    let newDoc = this.documentService.createDocument(dto);
    if ((await newDoc).user && (await newDoc).proveden) {
      this.sendMessage(dto, true)
    }

    return hamirForProvodka;
  }

}
