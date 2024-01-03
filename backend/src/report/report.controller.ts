import { Body, Controller, NotFoundException, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportOptionsDto } from './dto/report.options.dto';
import { REPORT_NOT_PREPARE } from './report.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }
  
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post(':reportType')
  async post(reportType: string, @Body() dto: ReportOptionsDto) {
    const report = await this.reportService.prepareReport(reportType, dto);
    if (!report) {
      throw new NotFoundException(REPORT_NOT_PREPARE);
    }
    return report;
  }

}
