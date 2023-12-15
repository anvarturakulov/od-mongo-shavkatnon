import { MenuData } from '../data/menu';
import { typeReference } from '../interfaces/reference.interface';

export const getTypeReference = (description: string): typeReference => {
  const title = MenuData.filter(item => item.title == 'Руйхатлар')[0].subMenu.filter(el => el.description == description)[0].title

  switch (title) {
    case typeReference.PARTNERS:
      return typeReference.PARTNERS;
    case typeReference.CHARGES:
      return typeReference.CHARGES
    case typeReference.PRICES:
      return typeReference.PRICES;
    case typeReference.STORAGES:
      return typeReference.STORAGES;
    case typeReference.TMZ:
      return typeReference.TMZ;
    case typeReference.WORKERS:
      return typeReference.WORKERS;
    default:
      return typeReference.PARTNERS
  }
}