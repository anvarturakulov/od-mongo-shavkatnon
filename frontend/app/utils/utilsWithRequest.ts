import { ReferenceBody, TypeReference } from '../interfaces/reference.interface';

export const getBodyForReferenceRequest = (state: ReferenceBody, typeReference: TypeReference) => {
 let newReq = {
   name: state.name,
   comment: state.comment,
   typeReference
 }
  switch (typeReference) {
    case TypeReference.CHARGES:
      return {
        ...newReq
      };
    case TypeReference.PARTNERS:
      return {
        ...newReq,
        typePartners: state.typePartners
      };;
    case TypeReference.PRICES:
      return {
        ...newReq,
      };
    case TypeReference.STORAGES:
      return {
        ...newReq,
      };
    case TypeReference.TMZ:
      return {
        ...newReq,
        typeTMZ: state.typeTMZ,
        unit: state.unit
      };
    case TypeReference.WORKERS:
      return {
        ...newReq,
      };
    default:
      return {};
  }
}