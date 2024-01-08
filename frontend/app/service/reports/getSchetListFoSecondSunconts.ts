import { OborotType, ReportType, Schet } from '@/app/interfaces/report.interface'

export const getSchetListFoSecondSunconts = (contentName: string, oborotType: OborotType): Array<Schet> => {
  switch (contentName) {
    case ReportType.AktSverka:
      return [Schet.S40]
    case ReportType.MatOborot:
      return [Schet.S10, Schet.S21, Schet.S28]
    case ReportType.Oborotka:
      switch (oborotType){
        case OborotType.S20 : return [Schet.S20];
        case OborotType.S40: return [Schet.S40];
        case OborotType.S50: return [Schet.S50];
        default: return [Schet.S00];
      }
    default:
      return [Schet.S00]
  }
}