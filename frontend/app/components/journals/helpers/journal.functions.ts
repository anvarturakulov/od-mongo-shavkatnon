import { Maindata } from '@/app/context/app.context.interfaces';
import { DocumentModel, DocumentType } from '@/app/interfaces/document.interface';
import { UserRoles } from '@/app/interfaces/general.interface';
import { ReferenceModel } from '@/app/interfaces/reference.interface';
import { getDocumentById } from '@/app/service/documents/getDocumentById';
import { markToDeleteDocument } from '@/app/service/documents/markToDeleteDocument';
import { setProvodkaToDocument } from '@/app/service/documents/setProvodkaToDocument';
import { markToDeleteReference } from '@/app/service/references/markToDeleteReference';

const deleteItem = (id: string | undefined, name: string, token: string | undefined, setMainData: Function | undefined) => {
  markToDeleteReference(id, name, setMainData, token)
}

export const getDocument = async (
  id: string | undefined,
  setMainData: Function | undefined,
  token: string | undefined
) => {
  if (id) {
    const reference = await getDocumentById(id, setMainData, token, true);
  }

}

export const getNameReference = (references: any, id: string | undefined | null): String => {
  if (references && references.length > 0) {
    return references.filter((item: ReferenceModel) => item._id == id)[0]?.name
  }
  return 'Аникланмади'
}

export const deleteItemDocument = (id: string | undefined, token: string | undefined, setMainData: Function | undefined, mainData: Maindata) => {
  const { user } = mainData
  if (user?.role == UserRoles.ADMIN || user?.role == UserRoles.HEADCOMPANY) {
    markToDeleteDocument(id, setMainData, token)
  } else {
    alert('Узр. Факат админлар учириш хукукига эга')
  }
}

export const setProvodkaToDoc = (id: string | undefined, token: string | undefined, proveden: boolean | undefined, setMainData: Function | undefined, mainData: Maindata, receiverId: string | undefined) => {
  if (proveden != undefined && proveden == false) {

    let yes = confirm('Хужжатга провдка берамизми')
    const { user, contentName } = mainData

    if (
        yes && 
        ( user?.role == UserRoles.ADMIN || user?.role == UserRoles.HEADCOMPANY ) || 
        ( user?.role == UserRoles.GLBUX && contentName == DocumentType.LeaveCash ) ||
        ( user?.storageId == receiverId)
    ){
      setProvodkaToDocument(id, setMainData, mainData)
    } else {
      alert('Узр. Сиз ушбу хужжатга проводка бера олмайсиз')
    }
  }
}

export const getTotalValueForDocument = (document: DocumentModel): number => {
  
  return document.total;
}

export const isFounder = (references: any, id: string | undefined | null): boolean => {
  if (references && references.length > 0) {
    let item =  references.filter((item: ReferenceModel) => item._id == id)[0]
    if (item?.shavkat || item?.maxsud) return true
  }
  return false
}

export const isDirector = (references: any, id: string | undefined | null): boolean => {
  if (references && references.length > 0) {
    let item = references.filter((item: ReferenceModel) => item._id == id)[0]
    if (item?.director) return true
  }
  return false
}