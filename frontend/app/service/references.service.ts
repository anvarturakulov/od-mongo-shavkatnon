import axios from 'axios';
import { getBodyForReferenceRequest } from '../utils/utilsWithRequest';
import { ReferenceBody, TypeReference } from '../interfaces/reference.interface';

export const updateCreateReference = async (body: ReferenceBody, typeReference: TypeReference , isNewReference: boolean) => {
  const uri = process.env.NEXT_PUBLIC_DOMAIN + '/api/reference/create';

  if (isNewReference) {
    await axios.post(uri, getBodyForReferenceRequest(body, typeReference))
      .then(function (response) {
        return {response, ok:true}
      })
      .catch(function (error) {
        return {error, ok:false}
      });
  }
}