import { defaultDocumentFormItems } from '@/app/context/app.context.constants';
import { Maindata } from '@/app/context/app.context.interfaces';
import { DocumentModel, DocumentType } from '@/app/interfaces/document.interface';
import { UserRoles } from '@/app/interfaces/general.interface';
import { showMessage } from '@/app/service/common/showMessage';
import { getRandomID } from '@/app/service/documents/getRandomID';
import { updateCreateDocument } from '@/app/service/documents/updateCreateDocument';
import { validateBody } from '@/app/service/documents/validateBody';

export const saveNumber = (setNumberDoc: Function, setMainData: Function | undefined, mainData: Maindata) => {
//   let num = getRandomID()
// //   setNumberDoc(num);
//   let dateDoc = new Date();
//   let dateStr = dateDoc.toISOString().split('T')[0]
  
//   let {currentDocument} = mainData;
//   let newObj = {
//       ...currentDocument,
//       docNumber: num,
//     //   date: 787878
//       date: Date.parse(dateStr)

//   }
//   if ( setMainData ) {
//       console.log(typeof newObj)
//       console.log(Array.isArray(newObj))
//       setMainData('currentDocument', {...newObj})
//   }
}

export const saveUser = (setMainData: Function | undefined, mainData: Maindata): any => {
  let {currentDocument} = mainData;
  let newObj = {
      ...currentDocument,
      user: mainData.user?.name,
  }

  if ( setMainData ) {
      setMainData('currentDocument', {...newObj})
  }
}

export const saveProvodka = (setMainData: Function | undefined, mainData: Maindata) => {
  let { currentDocument ,isNewDocument, contentName } = mainData;
  let value = true
  
  if (contentName == DocumentType.LeaveCash || contentName == DocumentType.MoveCash) {
    value = false
  }

  let newObj = {
      ...currentDocument,
      proveden: value,
  }

  if ( setMainData ) {
      setMainData('currentDocument', {...newObj})
  }
}

export const cancelSubmit = (setMainData: Function | undefined, mainData: Maindata) => {
    if (setMainData) {
        setMainData('clearControlElements', true);
        setMainData('showDocumentWindow', false);
        setMainData('isNewDocument', false);
        setMainData('currentDocument', {...defaultDocumentFormItems});
        if (mainData.user?.role != UserRoles.HEADCOMPANY && mainData.user?.role != UserRoles.ADMIN) setMainData('mainPage', true)
    }
}

export const onSubmit = ( mainData: Maindata, setMainData: Function| undefined ) => {
    const {currentDocument, } = mainData;
    
    let body: DocumentModel = {
        ...currentDocument,
    }
    
    if (!validateBody(body)) {
        showMessage('Хужжатни тулдиришда хатолик бор.', 'error', setMainData);
    } else {
        updateCreateDocument(mainData, setMainData);
    }
}

export const secondsToDateString = (seconds: number): String => {
    return new Date(seconds).toLocaleDateString('ru-RU')
}

export const saveDocumentType = (setMainData: Function | undefined, mainData: Maindata) => {
  
  let {currentDocument, contentName} = mainData;
  let newObj = {
      ...currentDocument,
      documentType: contentName,
  }

  if ( setMainData ) {
      setMainData('currentDocument', {...newObj})
  }
}