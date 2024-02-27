import { Document } from 'src/document/models/document.model';
import { prepareEntry } from './entry/prepareEntry';
import { DocumentType } from 'src/interfaces/document.interface';

export interface DocumentWithId extends Document {
  _id: string
}

export const prepareEntrysJournal = (allDocuments: Array<Document>) => {
  let documents = [...allDocuments]
  let results = []
  documents.forEach((item: Document) => {
    if (!item.deleted) {
        let newItemForResults = { ...prepareEntry(item) }
        results.push(newItemForResults);

      if (item.isWorker || item.documentType == DocumentType.SaleProd || item.documentType == DocumentType.SaleMaterial) {
          let newItemForResults = { ...prepareEntry(item, true) }
          results.push(newItemForResults);
        }
    }
  })
  return results
}