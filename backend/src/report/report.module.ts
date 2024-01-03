import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { DocumentModule } from 'src/document/document.module';


@Module({
  imports: [DocumentModule],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
