import { defaultDocumentFormItems, defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { Maindata } from '@/app/context/app.context.interfaces';
import { DocTableItem } from '@/app/interfaces/document.interface';
import { getRandomID } from '@/app/utils/getRandomID';
import { showMessage } from '@/app/utils/showMessage';

export const addItems = (setMainData: Function | undefined, newItem: DocTableItem, items: Array<DocTableItem>) => {
  let newItems = [...items, newItem];
  if (setMainData) {
      setMainData('docTable', {items: newItems})
  }
}

export const saveNumber = (setNumberDoc: Function, setMainData: Function | undefined, mainData: Maindata) => {
  let num = getRandomID()
  setNumberDoc(num);
  
  let {currentDocument} = mainData;
  let newObj = {
      ...currentDocument,
      docNumber: num,
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

export const onSubmit = (
    body: ReferenceBody, 
    id: string | undefined, 
    typeReference: TypeReference, 
    isNewReference: boolean, 
    setMainData: Function| undefined,
    token: string | undefined) => {
    
    if (typeReference == TypeReference.TMZ && body.typeTMZ == '') {
        showMessage('ТМБ турини танланг', 'error', setMainData);
        return
    }
    
    if (body.name.trim().length != 0) {
        updateCreateReference(body, id, typeReference, isNewReference, setMainData, token);
    } else {
        showMessage('Номини тулдиринг', 'error', setMainData);
    }
}