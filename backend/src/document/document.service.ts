import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocDocument, Document } from './models/document.model';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/document.create.dto';
import { DocumentType } from 'src/interfaces/document.interface';
import { DOCUMENT_IS_PROVEDEN, DOCUMENT_NOT_FOUND_ERROR } from './document.constants';
import { prepareEntrysJournal } from 'src/report/helpers/prepareEntrysJournal';
import { EntryItem } from 'src/interfaces/report.interface';
import { ReferenceModel } from 'src/interfaces/reference.interface';
import { ReferenceService } from 'src/reference/reference.service';
import { Reference, ReferenceDocument } from 'src/reference/models/referense.model';

@Injectable()
export class DocumentService {

  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocDocument>,
    private readonly referenceService: ReferenceService
  ) { }

  public globalEntrys: Array<EntryItem>
  public deliverys: Array<ReferenceDocument>
  public founders: Array<ReferenceDocument>

  async createDocument(dto: CreateDocumentDto): Promise<Document> {
    
    const newDocument = new this.documentModel(dto);
    
    // run service to preparing Entrys journal
    let result = await newDocument.save()
    // let res = await this.prepareEntrys();
    
    return result

  }

  async getByTypeDocument(documentType: DocumentType): Promise<Document[]> {
    return this.documentModel.find({ documentType }).exec()
  }

  async getByTypeForDateDocument(documentType, dateStart: number, dateEnd: number): Promise<Document[]> {
    return this.documentModel.find({ documentType, date: {$gte: dateStart, $lte: dateEnd} }).exec()
  }

  async getForDateDocument(dateStart: number, dateEnd: number): Promise<Document[]> {
    let ret = this.documentModel.find({ date: { $gte: dateStart, $lte: dateEnd } }).exec()
    return ret
  }

  async getAllDocuments(toEntryJournal: boolean): Promise<Document[]> {
    if (toEntryJournal) return this.documentModel.find({ deleted: !true, proveden: true }).exec()
    else return this.documentModel.find({ deleted: !true }).exec()
  }

  async findById(id: string) {
    return this.documentModel.findById(id).exec();
  }

  async markToDelete(id: string) {
    const document: CreateDocumentDto = await this.documentModel.findOne({ _id: id })
    if (!document.date) {
      throw new NotFoundException(DOCUMENT_NOT_FOUND_ERROR);
    }

    const state = document.deleted ? false : true
    let result = await this.documentModel.updateOne({ _id: id }, { $set: { deleted: state } })
    
    // run service to preparing Entrys journal
    // let res = this.prepareEntrys();
    
    return result
    // return this.globalEntrys
  }

  async setProvodka(id: string) {
    const document: CreateDocumentDto = await this.documentModel.findOne({ _id: id })
    if (document.proveden) {
      throw new NotFoundException(DOCUMENT_IS_PROVEDEN);
    }
    let result = await this.documentModel.updateOne({ _id: id }, { $set: { proveden: true } })
    // run service to preparing Entrys journal
    // this.prepareEntrys();
    return result

  }

  async updateById(id: string, dto: CreateDocumentDto) {
    
    let result = await this.documentModel.updateOne({ _id: id }, { $set: dto })

    // run service to preparing Entrys journal
    // this.prepareEntrys();
    return result
 
  }

  async prepareEntrys() {
    let result = await this.getAllDocuments(true)
    let deliverys = await this.referenceService.getDeliverys()
    let founders = await this.referenceService.getFounders()
    this.founders = [...founders]
    this.deliverys = [...deliverys]
    this.globalEntrys = [...prepareEntrysJournal(result, founders)];
  }

  async deleteDocumentByDate(dateStart: number, dateEnd: number): Promise<Document[]> {
    this.documentModel.deleteMany({ date: { $gte: dateStart, $lte: dateEnd } }).exec()
    return null
  }
}
