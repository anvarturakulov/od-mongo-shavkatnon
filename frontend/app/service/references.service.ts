import axios from 'axios';
import { getBodyForReferenceRequest } from '../utils/utilsWithRequest';
import { ReferenceBody, TypeReference } from '../interfaces/reference.interface';

export const updateCreateReference = (body: ReferenceBody, typeReference: TypeReference , isNewReference: boolean) => {
  const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/create';

  if (isNewReference) {
    axios.post(uri, getBodyForReferenceRequest(body, typeReference))
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