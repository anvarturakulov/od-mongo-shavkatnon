import { Schet } from '@/app/interfaces/report.interface';

export const getTitleBySchet = (schet: Schet): string => {
  switch (schet) {
    case Schet.S1010:
      return 'Хом ашёлар'
    case Schet.S2110:
      return 'Ярим тайёр махсулотлар'
    case Schet.S2810:
      return 'Тайёр махсулотлар'
    default :
      return ''
  }
}