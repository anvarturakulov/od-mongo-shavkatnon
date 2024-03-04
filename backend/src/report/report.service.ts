import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocDocument, Document } from '../document//models/document.model';
import { DocumentService } from 'src/document/document.service';
import { prepareEntrysJournal } from './helpers/prepareEntrysJournal';


@Injectable()
export class ReportService {
  constructor(@InjectModel(Document.name) private documentModel: Model<DocDocument>,
    private readonly documentService: DocumentService) { }
  
  async getEntrysJournal() {
    let result = await this.documentService.getAllDocuments()
    return prepareEntrysJournal(result);
  }


}
