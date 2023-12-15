import axios from 'axios';
import { ReferenceRequestModel, ReferenceType } from '../interfaces/reference.interface';
import { getBodyForReferenceRequest } from '../utils/utilsWithRequest';

export const updateCreateReference = (body: ReferenceRequestModel, referenceType: ReferenceType, isNewReference: boolean) => {
  const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/create';
  console.log(getBodyForReferenceRequest(body, referenceType))
  if (isNewReference) {
    axios.post(uri, getBodyForReferenceRequest(body, referenceType))
      .then(function (response) {
        if (response.status == 201) {
          alert('Янги элемент яратилди');
        }
      })
      .catch(function (error) {

        alert('Саклашда хатолик руй берди ' + error.message);
      });
  }
}