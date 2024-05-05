import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { DocDocument, Document } from '../document//models/document.model';
import { DocumentService } from 'src/document/document.service';
import { prepareEntrysJournal } from './helpers/prepareEntrysJournal';
import { query } from './helpers/querys/query';
import { QueryInformation, QueryMatOtchet, QueryObject } from 'src/interfaces/report.interface';
import { ReferenceService } from 'src/reference/reference.service';
import { information } from './reports/information/information';
import { HamirService } from 'src/hamir/hamir.service';
import { matOborot } from './reports/matOborot/matOborot';

@Injectable()
export class ReportService {
  constructor(@InjectModel(Document.name) private documentModel: Model<DocDocument>,
    private readonly documentService: DocumentService,
    private readonly referenceService: ReferenceService,
    private readonly hamirService: HamirService,
  ) { }

  async getEntrysJournal() {
    let result = await this.documentService.globalEntrys
    return result
  }

  async getEntrysJournalForDate(dateStart: number, dateEnd: number) {
    let result = await this.documentService.getForDateDocument(dateStart, dateEnd)
    return prepareEntrysJournal(result);
  }

  async getQueryValue(queryReport: QueryObject) {
    const { typeQuery, schet, startDate, endDate, firstSubcontoId, secondSubcontoId} = queryReport;
    
    return query(schet, typeQuery, startDate, endDate, firstSubcontoId, secondSubcontoId, this.documentService.globalEntrys)
  }

  async getInformation(queryInformation: QueryInformation) {
    let data = await this.referenceService.getAllReferences();
    let hamirs = await this.hamirService.getAllHamirs();
    let {startDate, endDate} = queryInformation;
    
    let inform = information(data, startDate, endDate, this.documentService.globalEntrys, hamirs )
    return inform
    // return query(queryInformation, this.documentService.globalEntrys)
  }

  async getMatOtchet(queryMatOtchet: QueryMatOtchet) {
    let data = await this.referenceService.getAllReferences();
    let { startDate, endDate, section } = queryMatOtchet;

    let result = matOborot(data, startDate, endDate, section, this.documentService.globalEntrys)
    return result
  }


}
