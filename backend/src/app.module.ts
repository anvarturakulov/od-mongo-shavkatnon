import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from './document/document.module';
import { ReferenceModule } from './reference/reference.module';
import { ReportModule } from './report/report.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/karandash?authMechanism=DEFAULT&authSource=admin'),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: getMongoConfig
    // }),
    AuthModule, 
    DocumentModule, ReferenceModule, ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
