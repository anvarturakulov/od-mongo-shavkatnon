import axios from 'axios';
import { getBodyForReferenceRequest } from '../utils/utilsWithRequest';
import { ReferenceBody, TypeReference } from '../../../interfaces/reference.interface';
import { showMessage } from '../utils/showMessage';
import { BodyForLogin } from '../../../interfaces/general.interface';

export const updateCreateReference = (
                                      body: ReferenceBody, 
                                      id: string | undefined, 
                                      typeReference: TypeReference, 
                                      isNewReference: boolean, 
                                      setMainData: Function | undefined, 
                                      token: string | undefined 
                                    ) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const actionWithMainData = (mes: string) => {
    if (setMainData) {
      showMessage(`${body.name} - ${typeReference} - ${mes}`, 'success', setMainData)
      setMainData('showReferenceWindow', false);
      setMainData('clearControlElements', true);
      setMainData('isNewReference', false);
    }
  }
  
  const uriPost = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/create';
  const uriPatch = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/'+id;

  if (isNewReference) {
    axios.post(uriPost, getBodyForReferenceRequest(body, typeReference), config)
      .then(function () {
        actionWithMainData('янги элемент киритилди')     
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  } else {
    if (id) {
      axios.patch(uriPatch, getBodyForReferenceRequest(body, typeReference), config)
        .then(function () {
          actionWithMainData('элемент янгиланди')
        })
        .catch(function (error) {
          if (setMainData) {
            showMessage(error.message, 'error', setMainData)
          }
        });
     };
  }
}

export const markToDeleteReference = (
                                      id: string | undefined,
                                      name: string, setMainData: Function | undefined,
                                      token: string | undefined
                                    ) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  if (id) {
    const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/markToDelete/' + id;
    axios.delete(uri,config)
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

export const getReferenceById = (
                                id: string | undefined,
                                setMainData: Function | undefined,
                                token: string | undefined
                              ) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  if (id) {
    const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/' + id;
    axios.get(uri, config)
      .then(function (response) {
        setMainData && setMainData('currentReferenceForShow', response.data);
        setMainData && setMainData('showReferenceWindow', true);
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  }
}

export const loginToApp = (body: BodyForLogin, setMainData: Function | undefined) => {
  const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/login';
  axios.post(uri, body)
    .then(function (response) {
      setMainData && setMainData('user', response.data);
    })
    .catch(function (error) {
      if (setMainData) {
        if (error.response.status == 401) {
          showMessage('Фойдаланувчи маълумотлари хато киритилди', 'error', setMainData)  
        } else {
          showMessage(error.message, 'error', setMainData)
        }
      }
    });
}
