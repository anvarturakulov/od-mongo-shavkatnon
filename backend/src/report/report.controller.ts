import { Body, Controller, Get, NotFoundException, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportOptionsDto } from './dto/report.options.dto';
import { REPORT_NOT_PREPARE } from './report.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { QueryInformation, QueryMatOtchet, QueryObject } from 'src/interfaces/report.interface';


@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }
  
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/entrys')
  async get() {
    const report = await this.reportService.getEntrysJournal();
    if (!report) {
      throw new NotFoundException(REPORT_NOT_PREPARE);
    }
    return report;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/entrysForDate')
  async getForDate(@Req() request: Request) {
    let dateStart = +request.query?.dateStart
    let dateEnd = +request.query?.dateEnd
    
    const report = await this.reportService.getEntrysJournalForDate(dateStart, dateEnd );
    if (!report) {
      throw new NotFoundException(REPORT_NOT_PREPARE);
    }
    return report;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/query')
  async getQuery(@Req() request: Request) {
    
    const queryObject: QueryObject = {
      typeQuery: `${request.query?.typeQuery}`,
      schet: `${request.query?.schet}`,
      startDate: +request.query?.startDate,
      endDate: +request.query?.endDate,
      firstSubcontoId: `${request.query?.firstSubcontoId}`,
      secondSubcontoId: `${request.query?.secondSubcontoId}`
    }

    const report = await this.reportService.getQueryValue(queryObject);
    
    if (!report) {
      throw new NotFoundException(REPORT_NOT_PREPARE);
    }
    return report;
  }


  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/information')
  async getInformation(@Req() request: Request) {
    
    const queryInformation: QueryInformation = {
      startDate: +request.query?.startDate,
      endDate: +request.query?.endDate,
    }

    const report = await this.reportService.getInformation(queryInformation);

    if (!report) {
      throw new NotFoundException(REPORT_NOT_PREPARE);
    }
    return report;
  }

  // @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('/matOborot')
  async getMatOtchet(@Req() request: Request) {

    const queryMatOtchet: QueryMatOtchet = {
      startDate: +request.query?.startDate,
      endDate: +request.query?.endDate,
      section: String(request.query.section),
    }

    const report = await this.reportService.getMatOtchet(queryMatOtchet);

    if (!report) {
      throw new NotFoundException(REPORT_NOT_PREPARE);
    }
    return report;
  }




}
