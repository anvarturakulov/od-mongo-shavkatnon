import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HamirService } from './hamir.service';
import { CreateHamirDto } from './dto/hamir.create.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { AuthService } from 'src/auth/auth.service';
import { HAMIR_NOT_FOUND_ERROR } from './hamir.constants';
import { ReferenceService } from 'src/reference/reference.service';

@Controller('hamir')
export class HamirController {
  constructor(
    private readonly hamirService: HamirService,
    private readonly userService: AuthService,
    private readonly referenceService: ReferenceService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateHamirDto) {
    for (let i = 1; i < 51; i++) { 
      let newDto = {...dto};
      newDto.order = i;
      let newHamir = this.hamirService.createHamir(dto);
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async getAllHamirs() {
    return this.hamirService.getAllHamirs()
  }

  @UseGuards(JwtAuthGuard)
  @Get('getForDate/:date')
  async getHamirsForDate(date: string) {
    return this.hamirService.getHamirsForDate(date)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const document = await this.hamirService.findById(id);
    if (!document) {
      throw new NotFoundException('Hamir topilmadi');
    }
    return document;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateHamirDto) {
    const updatedDocument = await this.hamirService.updateById(id, dto);
    if (!updatedDocument) {
      throw new NotFoundException(HAMIR_NOT_FOUND_ERROR);
    }

    return updatedDocument;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('setProvodka/:id')
  async patchSetProvodka(@Param('id', IdValidationPipe) id: string) {

    const hamirForProvodka = await this.hamirService.setProvodka(id);
    const hamir = await this.hamirService.findById(id);

    let newDto = { ...JSON.parse(JSON.stringify(document)) }

    if (!hamirForProvodka) {
      throw new NotFoundException(HAMIR_NOT_FOUND_ERROR);
    }

    return hamirForProvodka;
  }

}
