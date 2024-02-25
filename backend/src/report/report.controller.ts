import { Body, Controller, Get, NotFoundException, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportOptionsDto } from './dto/report.options.dto';
import { REPORT_NOT_PREPARE } from './report.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

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
    // console.log(report)
    return report;
  }

}
