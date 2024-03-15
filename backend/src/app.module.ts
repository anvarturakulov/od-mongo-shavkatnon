import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';
import { ReferenceModule } from './reference/reference.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://anvar:SWSMFL5TDk3Jq9xg@cluster0.uoe1t.mongodb.net/karandash'),
    AuthModule, 
    DocumentModule, ReferenceModule, ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
