import { DocumentModel, DocumentModelFromServer } from '@/app/interfaces/document.interface';
import { ReferenceModel } from '@/app/interfaces/reference.interface';
import { hasDocumentTablePart } from '@/app/service/documents/hasDocumentTableType';
import { markToDeleteDocument } from '@/app/service/documents/markToDeleteDocument';
import { getReferenceById } from '@/app/service/references/getReferenceById';
import { markToDeleteReference } from '@/app/service/references/markToDeleteReference';

const deleteItem = (id: string | undefined, name: string, token: string | undefined, setMainData: Function | undefined) => {
  markToDeleteReference(id, name, setMainData, token)
}

const getReference = async (
  id: string | undefined,
  setMainData: Function | undefined,
  token: string | undefined
) => {
  if (id) {
    const reference = await getReferenceById(id, setMainData, token);
  }
  setMainData && setMainData('isNewReference', false);
}

export const getNameReference = (references: any, id: string): String => {
  if (references && references.length > 0) {
    return references.filter((item: ReferenceModel) => item._id == id)[0].name
  }
  return 'Аникланмади'
}

export const deleteItemDocument = (id: string | undefined, token: string | undefined, setMainData: Function | undefined) => {
  markToDeleteDocument(id, setMainData, token)
}

export const getTotalValueForDocument = (document: DocumentModelFromServer): number => {
  let hasTablePart = hasDocumentTablePart(document.documentType);
  let total:number = 0;
  if (hasTablePart && document.tableItems) {
    total = document.tableItems.reduce((accum, currentValue) => accum + currentValue.total, 0);
  } else {
    total = document.payValue;
  }
  
  return total;
}