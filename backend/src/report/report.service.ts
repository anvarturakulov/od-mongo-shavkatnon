import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { DocDocument, Document } from 'src/document/models/document.model';
import { DocDocument, Document } from '../document//models/document.model';
import { Reference, ReferenceDocument } from 'src/reference/models/referense.model';
import { ReportOptionsDto } from './dto/report.options.dto';
import { DocumentService } from 'src/document/document.service';
import { getEntryJournal } from './helpers/getEntryJournal';


@Injectable()
export class ReportService {
  constructor(@InjectModel(Document.name) private documentModel: Model<DocDocument>,
    private readonly documentService: DocumentService) { }
  
  
  
  async prepareReport(reportType: string, dto: ReportOptionsDto) {
    // return this.documentModel.updateOne({ _id: id }, { $set: dto })
    let result = await this.documentService.getAllDocuments()
    return getEntryJournal(result)
    // let report = {
    //   title: 'New report',
    //   record: true
    // }
    // return result
  }


}
