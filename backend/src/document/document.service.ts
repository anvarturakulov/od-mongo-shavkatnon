import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocDocument, Document } from './models/document.model';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/document.create.dto';
import { DocumentType } from 'src/interfaces/document.interface';
import { DOCUMENT_NOT_FOUND_ERROR } from './document.constants';

@Injectable()
export class DocumentService {

  constructor(@InjectModel(Document.name) private documentModel: Model<DocDocument>) { }

  async createDocument(dto: CreateDocumentDto): Promise<Document> {
    const newDocument = new this.documentModel(dto);
    
    return newDocument.save()
  }


  async getByTypeDocument(documentType: DocumentType): Promise<Document[]> {
    return this.documentModel.find({ documentType }).exec()
  }

  async getAllDocuments(): Promise<Document[]> {
    return this.documentModel.find({deleted: !true}).exec()
  }

  async findById(id: string) {
    return this.documentModel.findById(id).exec();
  }

  async markToDelete(id: string) {
    // db.movies.findOne({ _id: ObjectId("1") }) - найти фильмы по переданному "id"
    // db.movies.updateOne({ _id: ObjectId('1') }, { $set: { rating: 10, year: 1995 } }) - обновить фильм с переданным id, обновляются поля "rating" И "year"
    const document: CreateDocumentDto = await this.documentModel.findOne({ _id: id })
    if (!document.date) {
      throw new NotFoundException(DOCUMENT_NOT_FOUND_ERROR);
    }
    const state = document.deleted ? false : true
    return this.documentModel.updateOne({ _id: id }, { $set: { deleted: state } })
  }

  async updateById(id: string, dto: CreateDocumentDto) {
    return this.documentModel.updateOne({ _id: id }, { $set: dto })
  }
}
