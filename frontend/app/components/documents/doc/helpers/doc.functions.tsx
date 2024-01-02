import { defaultDocumentFormItems, defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { Maindata } from '@/app/context/app.context.interfaces';
import { DocTableItem, DocumentModel } from '@/app/interfaces/document.interface';
import { showMessage } from '@/app/service/common/showMessage';
import { getRandomID } from '@/app/service/documents/getRandomID';
import { updateCreateDocument } from '@/app/service/documents/updateCreateDocument';
import { validateBody } from '@/app/service/documents/validateBody';

export const addItems = (setMainData: Function | undefined, mainData: Maindata, newItem: DocTableItem) => {
  
    let newObj = {...mainData.currentDocument};
    newObj.tableItems?.push(newItem) 

    if (setMainData) {
        setMainData('currentDocument', {...newObj})
    }
}

export const saveNumber = (setNumberDoc: Function, setMainData: Function | undefined, mainData: Maindata) => {
  let num = getRandomID()
  setNumberDoc(num);
  let dateDoc = new Date();
  let dateStr = dateDoc.toISOString().split('T')[0]
  
  let {currentDocument} = mainData;
  let newObj = {
      ...currentDocument,
      docNumber: num,
      date: Date.parse(dateStr)

  }

  if ( setMainData ) {
      setMainData('currentDocument', {...newObj})
  }
}

export const cancelSubmit = (setMainData: Function | undefined) => {
    if (setMainData) {
        setMainData('clearControlElements', true);
        setMainData('showDocumentWindow', false);
        setMainData('isNewDocument', false);
        let defaultTableItemsObj = {items: [defaultDocumentTableItem]}
        setMainData('docTable', {...defaultTableItemsObj});
        setMainData('currentDocument', {...defaultDocumentFormItems});
    }
}

export const onSubmit = ( mainData: Maindata, setMainData: Function| undefined ) => {
    const {currentDocument} = mainData;
    
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
    return new Date(seconds).toISOString().split('T')[0]
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