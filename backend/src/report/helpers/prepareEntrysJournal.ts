import { DocTableItem, Document } from 'src/document/models/document.model';
import { prepareEntry } from './entry/prepareEntry';
import { DocumentType } from 'src/interfaces/document.interface';
import { hasDocumentTablePart } from './hasDocumentTableType';
import { EntryItem } from 'src/interfaces/report.interface';

export interface DocumentWithId extends Document {
  _id: string
}

export const prepareEntrysJournal = (allDocuments: Array<Document>):Array<EntryItem> => {
  let documents = [...allDocuments]
  let results: Array<EntryItem> = []
  documents.forEach((item: Document) => {
    if (!item.deleted) {
        
      if ( hasDocumentTablePart(item.documentType)) {
        if ( item?.tableItems && item.tableItems != undefined || item.tableItems.length > 0 ) {
          item.tableItems.forEach((tableItem: DocTableItem) => {
            let newItemForResults = { ...prepareEntry(item, false, true, tableItem, false) }
            results.push(newItemForResults);

          })
        }

      } else {
        let newItemForResults = { ...prepareEntry(item, true, false, undefined, item.isCash) }
        results.push(newItemForResults);

        if (item.documentType == DocumentType.SaleProd || item.documentType == DocumentType.SaleMaterial) {
          let newItemForResults = { ...prepareEntry(item, false, false, undefined, false) }
          results.push(newItemForResults);
        }
      }
      
      if (item.documentType == DocumentType.ComeHalfstuff) {
        let newItemForResults = { ...prepareEntry(item, true, false, undefined, false) }
        let total: number = 0;
        if (item?.tableItems && item.tableItems.length >0) {
          total = item.tableItems.reduce((summa, item) => summa + item.total, 0);
        }
        newItemForResults.summa = total
        results.push(newItemForResults);
      }
    }
  })
  return results
}