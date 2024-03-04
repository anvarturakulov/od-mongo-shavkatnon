import { ReferenceBody, TypeReference } from '@/app/interfaces/reference.interface';

export const getBodyForReferenceRequest = (state: ReferenceBody, typeReference: TypeReference) => {
  let newReq = {
    name: state.name,
    comment: state.comment,
    typeReference,
  }
  switch (typeReference) {
    case TypeReference.CHARGES:
      return {
        ...newReq
      };
    case TypeReference.PARTNERS:
      return {
        ...newReq,
        typePartners: state.typePartners,
        clientForDeliveryId: state.clientForDeliveryId
      };;
    case TypeReference.PRICES:
      return {
        ...newReq,
      };
    case TypeReference.STORAGES:
      return {
        ...newReq,
        delivery: state.delivery,
        filial: state.filial,
        sklad: state.sklad
      };
    case TypeReference.TMZ:
      return {
        ...newReq,
        typeTMZ: state.typeTMZ,
        unit: state.unit,
        un: state.un
      };
    case TypeReference.WORKERS:
      return {
        ...newReq,
      };
    default:
      return {};
  }
}