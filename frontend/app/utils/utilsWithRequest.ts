import { ReferenceRequestModel, ReferenceType } from '../interfaces/reference.interface';

export const getBodyForReferenceRequest = (state: ReferenceRequestModel, referenceType: ReferenceType) => {
 let newReq = {
   name: state.name,
   comment: state.comment,
   referenceType
 }
  switch (referenceType) {
    case ReferenceType.CHARGES:
      return {
        ...newReq
      };
    case ReferenceType.PARTNERS:
      return {
        ...newReq,
        typePartners: state.typePartners
      };;
    case ReferenceType.PRICES:
      return {
        ...newReq,
      };
    case ReferenceType.STORAGES:
      return {
        ...newReq,
      };
    case ReferenceType.TMZ:
      return {
        ...newReq,
        typeTMZ: state.typeTMZ,
        unit: state.unit
      };
    case ReferenceType.WORKERS:
      return {
        ...newReq,
      };
    default:
      return {};
  }
}