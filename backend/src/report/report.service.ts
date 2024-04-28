import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { DocDocument, Document } from '../document//models/document.model';
import { DocumentService } from 'src/document/document.service';
import { prepareEntrysJournal } from './helpers/prepareEntrysJournal';
import { query } from './helpers/querys/query';
import { QueryObject } from 'src/interfaces/report.interface';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Document.name) private documentModel: Model<DocDocument>,
    private readonly documentService: DocumentService) { }
  
  async getEntrysJournal() {
    let result = await this.documentService.globalEntrys 
    return result
  }

  async getEntrysJournalForDate(dateStart: number, dateEnd: number) {
    let result = await this.documentService.getForDateDocument(dateStart, dateEnd )
    return prepareEntrysJournal(result);
  }

  async getQueryValue(queryReport: QueryObject) {
    return query(queryReport, this.documentService.globalEntrys)
  }

}
