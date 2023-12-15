import { TypePartners, TypeTMZ } from '@/app/interfaces/reference.interface'

export const typePartnersList = [
  { name: TypePartners.CLIENTS, title: 'Мижоз' },
  { name: TypePartners.SUPPLIERS, title: 'Таъминотчи' }
]

export const typeTMZList = [
  { name: TypeTMZ.MATERIAL, title: 'Материал' },
  { name: TypeTMZ.PRODUCT, title: 'Тайёр махсулот' },
  { name: TypeTMZ.HALFSTUFF, title: 'Ярим тайёр махсулот' }
]

export interface DataForSelect {
  name: string,
  title: string
}