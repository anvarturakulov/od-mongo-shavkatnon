import axios from 'axios';
import { getBodyForReferenceRequest } from '../utils/utilsWithRequest';
import { ReferenceBody, TypeReference } from '../interfaces/reference.interface';
import { useAppContext } from '../context/app.context';
import { showMessage } from '../utils/showMessage';

export const updateCreateReference = (body: ReferenceBody, typeReference: TypeReference, isNewReference: boolean, setMainData: Function | undefined) => {
  const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/create';
  if (isNewReference) {
    axios.post(uri, getBodyForReferenceRequest(body, typeReference))
      .then(function (response) {
        // return {response, ok:true}
        if (setMainData) {
          showMessage(`${body.name} - ${typeReference} - янги элемент киритилди`, 'success', setMainData )
          setMainData('showReferenceWindow', false);
        }
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  }
}