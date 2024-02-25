import { Document } from 'src/document/models/document.model';
import { prepareEntry } from './entry/prepareEntry';

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

        if (item.isWorker || item.cashFromPartner > 0) {
          let newItemForResults = { ...prepareEntry(item, true) }
          results.push(newItemForResults);
        }
        // ?????????
        // if (item.documentType = DocumentType.SaleProd) {
        //   let newItemForResults = { ...prepareEntry(item) }
        //   results.push(newItemForResults);
        // }
    }
  })
  return results
}