import { DocTableItem, Document } from 'src/document/models/document.model';
import { getValuesForEntry } from './getValuesForEntry';

export const prepareEntry = (item: Document, newEntryForCharges?: boolean, tableItem?: DocTableItem, ) => {
  // let hasTableItems = hasDocumentTablePart(item.documentType);
  return {
    date: item.date,
    docNumber: item.docNumber,
    documentType: item.documentType,
    comment: item.comment,
    docId: '',
    ...getValuesForEntry(item, newEntryForCharges, tableItem)
  }
}