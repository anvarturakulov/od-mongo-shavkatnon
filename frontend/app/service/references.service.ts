import axios, { AxiosResponse } from 'axios';
import { getBodyForReferenceRequest } from '../utils/utilsWithRequest';
import { ReferenceBody, ReferenceModel, TypeReference } from '../interfaces/reference.interface';
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
          setMainData('clearControlElements', true);
        }
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  }
}

export const markToDeleteReference = (id: string | undefined, name: string, setMainData: Function | undefined) => {
  if (id) {
    const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/markToDelete/' + id;
    axios.delete(uri)
      .then(function () {
        if (setMainData) {
          showMessage(`${name} - холати узгартирилди`, 'success', setMainData);
          setMainData('updateDataForRefenceJournal', true);
        }
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  }
}

export const getReferenceById = (id: string | undefined, setMainData: Function | undefined) => {
  if (id) {
    const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/' + id;
    axios.get(uri)
      .then(function (response) {
        setMainData && setMainData('currentReferencyForShow', response.data);
        setMainData && setMainData('showReferenceWindow', true);
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  }
}

