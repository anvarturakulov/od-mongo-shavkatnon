import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocDocument, Document } from './models/document.model';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/document.create.dto';

@Injectable()
export class DocumentService {

  constructor(@InjectModel(Document.name) private documentModel: Model<DocDocument>) { }

  async createReference(dto: CreateDocumentDto): Promise<Document> {
    const newDocument = new this.documentModel(dto);
    return newDocument.save()
  }
}
