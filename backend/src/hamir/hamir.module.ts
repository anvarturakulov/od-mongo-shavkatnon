import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ReferenceModule } from 'src/reference/reference.module';
import { HamirController } from './hamir.controller';
import { HamirService } from './hamir.service';
import { Hamir, HamirSchema } from './models/hamir.model';

@Module({
  controllers: [HamirController],
  providers: [HamirService],
  imports: [
    MongooseModule.forFeature([{ name: Hamir.name, schema: HamirSchema }]),
    AuthModule,
    ReferenceModule
  ],
  exports: [HamirService, MongooseModule]
})
export class HamirModule { }
