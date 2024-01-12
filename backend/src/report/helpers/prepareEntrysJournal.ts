import { DocTableItem, Document } from 'src/document/models/document.model';
import { EntryItem, Schet } from 'src/interfaces/report.interface';
import { hasDocumentTablePart } from './hasDocumentTableType';
import { prepareEntry } from './entry/prepareEntry';
import { DocumentType } from 'src/interfaces/document.interface';

export interface DocumentWithId extends Document {
  _id: string
}

export const prepareEntrysJournal = (allDocuments: Array<Document>): Array<EntryItem> => {
  let documents = [...allDocuments]
  let results = []
  documents.forEach((item: Document) => {
    if (!item.deleted) {
      if (hasDocumentTablePart(item.documentType)) {
        item.tableItems.forEach((tableItem: DocTableItem) => {
          let newItemForResults = { ...prepareEntry(item, tableItem) }
          results.push(newItemForResults);

          if (tableItem.isWorker) {
            let newItemForResults = { ...prepareEntry(item, tableItem, true) }
            results.push(newItemForResults);
          }
        })
        if (item.documentType = DocumentType.SaleProd) {
          let newItemForResults = { ...prepareEntry(item) }
          results.push(newItemForResults);
        }
      } else {
        let newItemForResults = { ...prepareEntry(item) }
        results.push(newItemForResults);
      }
    }
  })
  return results
}