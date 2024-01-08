import { OborotType, Schet } from '@/app/interfaces/report.interface';

export const getSchetForOborotType = (oborotType: OborotType): Schet => {
  switch (oborotType){
    case OborotType.S20 : return Schet.S20;
    case OborotType.S40: return Schet.S40;
    case OborotType.S50: return Schet.S50;
    default: return Schet.S00;
  }

}