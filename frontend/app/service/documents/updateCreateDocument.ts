import { ReferenceBody, TypeReference } from '@/app/interfaces/reference.interface';
import axios from 'axios';
import { showMessage } from '../common/showMessage';
import { Maindata } from '@/app/context/app.context.interfaces';
import { defaultDocumentFormItems, defaultDocumentTableItem } from '@/app/context/app.context.constants';
import { DocumentModel } from '@/app/interfaces/document.interface';

export const updateCreateDocument = (mainData: Maindata, setMainData: Function | undefined) => {
  
  const { user, currentDocument, isNewDocument, docTable } = mainData
  const id = 'asasasa879797987'
  
  let body: DocumentModel = {
    ...currentDocument,
    tableItems: [ ...docTable.items ]
  }
  
  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  const actionWithMainData = (mes: string) => {
    if (setMainData) {
      showMessage(`${body.docNumber} ракамли - ${body.documentType} - ${mes}`, 'success', setMainData)
      setMainData('clearControlElements', true);
      setMainData('showDocumentWindow', false);
      setMainData('isNewDocument', false);
      let defaultTableItemsObj = { items: [defaultDocumentTableItem] }
      setMainData('docTable', { ...defaultTableItemsObj });
      setMainData('currentDocument', { ...defaultDocumentFormItems });
    }
  }

  const uriPost = process.env.NEXT_PUBLIC_DOMAIN + '/api/document/create';
  const uriPatch = process.env.NEXT_PUBLIC_DOMAIN + '/api/document/' + id;

  if (isNewDocument) {
    // console.log('jr')
    // console.log(JSON.stringify(body))
    axios.post(uriPost, body, config)
      .then(function () {
        actionWithMainData('янги хужжати киритилди')
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  } else {
    if (id) {
      axios.patch(uriPatch, body, config)
        .then(function () {
          actionWithMainData('хужжат янгиланди')
        })
        .catch(function (error) {
          if (setMainData) {
            showMessage(error.message, 'error', setMainData)
          }
        });
    };
  }
}