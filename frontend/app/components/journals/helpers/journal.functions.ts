import { Maindata } from '@/app/context/app.context.interfaces';
import { DocumentModel } from '@/app/interfaces/document.interface';
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

export const setProvodkaToDoc = (id: string | undefined, token: string | undefined, proveden: boolean | undefined, setMainData: Function | undefined, mainData: Maindata) => {
  if (proveden != undefined && proveden == false) {

    let yes = confirm('Хужжатга провдка берамизми')
    const { user } = mainData

    if (yes && (user?.role == UserRoles.ADMIN || user?.role == UserRoles.HEADCOMPANY || user?.role == UserRoles.GLBUX)) {
      setProvodkaToDocument(id, setMainData, token, mainData)
    } else {
      alert('Узр. Факат админ ва бош хисобчи ушбу хужжатга проводка бера олади хукукига эга')
    }
  }
}

export const getTotalValueForDocument = (document: DocumentModel): number => {
  
  return document.total;
}