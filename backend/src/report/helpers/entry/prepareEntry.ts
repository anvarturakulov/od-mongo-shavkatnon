import { DocTableItem, Document } from 'src/document/models/document.model';
import { getValuesForEntry } from './getValuesForEntry';
import { EntryItem } from 'src/interfaces/report.interface';

export const prepareEntry = (item: Document, newEntryForCharges: boolean, hasTable: boolean, tableItem?: DocTableItem ) :EntryItem => {
  // let hasTableItems = hasDocumentTablePart(item.documentType);
  return {
    date: item.date,
    docNumber: item.docNumber,
    documentType: item.documentType,
    comment: item.comment,
    docId: '',
    ...getValuesForEntry(item, newEntryForCharges, hasTable, tableItem)
  }
}