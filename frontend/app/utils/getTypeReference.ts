import { MenuData } from '../data/menu';
import { ReferenceType } from '../interfaces/reference.interface';

export const getTypeReference = (description: string): ReferenceType => {
  const title =  MenuData.filter(item => item.title == 'Руйхатлар')[0].subMenu.filter(el => el.description == description)[0].title

  switch (title) {
    case ReferenceType.PARTNERS:
      return ReferenceType.PARTNERS;
    case ReferenceType.CHARGES:
      return ReferenceType.CHARGES
    case ReferenceType.PRICES:
      return ReferenceType.PRICES;
    case ReferenceType.STORAGES:
      return ReferenceType.STORAGES;
    case ReferenceType.TMZ:
      return ReferenceType.TMZ;
    case ReferenceType.WORKERS:
      return ReferenceType.WORKERS;  
    default:
      return ReferenceType.PARTNERS
  }
}