import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './models/document.model';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { ReferenceModule } from 'src/reference/reference.module';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  imports: [
    MongooseModule.forFeature([{ name: Document.name, schema: DocumentSchema }]),
    AuthModule,
    ReferenceModule
  ],
  exports: [DocumentService, MongooseModule]
})
export class DocumentModule {}
