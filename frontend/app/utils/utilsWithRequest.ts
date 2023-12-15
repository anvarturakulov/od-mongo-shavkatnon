import { ReferenceRequestModel, ReferenceType } from '../interfaces/reference.interface';

export const getBodyForReferenceRequest = (state: ReferenceRequestModel, referenceType: ReferenceType) => {

  switch (referenceType) {
    case ReferenceType.CHARGES:
      return {
        name: state.name,
        commment: state.comment
      };
    case ReferenceType.PARTNERS:
      return {
        name: state.name,
        commment: state.comment,
        typePartners: state.typePartners
      };;
    case ReferenceType.PRICES:
      return {
        name: state.name,
        commment: state.comment,
      };
    case ReferenceType.STORAGES:
      return {
        name: state.name,
        commment: state.comment,
      };
    case ReferenceType.TMZ:
      return {
        name: state.name,
        commment: state.comment,
        typeTMZ: state.typeTMZ,
        unit: state.unit
      };
    case ReferenceType.WORKERS:
      return {
        name: state.name,
        commment: state.comment,
      };
    default:
      return {};
  }
}