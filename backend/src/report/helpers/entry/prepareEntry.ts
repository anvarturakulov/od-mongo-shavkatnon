import { EntryItem, Schet } from 'src/interfaces/report.interface';
import { DocumentType } from 'src/interfaces/document.interface';
import { DocTableItem, Document } from 'src/document/models/document.model';
import { hasDocumentTablePart } from '../hasDocumentTableType';
import { getValuesForEntry } from './getValuesForEntry';

export const prepareEntry = (item: Document, tableItem?: DocTableItem ) => {
  // let hasTableItems = hasDocumentTablePart(item.documentType);
  return {
    date: item.date,
    docNumber: item.docNumber,
    documentType: item.documentType,
    comment: item.comment,
    docId: '',
    ...getValuesForEntry(item, tableItem)
  }
}