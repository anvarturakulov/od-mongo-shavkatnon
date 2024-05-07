import { Schet } from '@/app/interfaces/report.interface';
import { getTypeDocumentForReference } from './getTypeDocumentForReference';
import { Maindata } from '@/app/context/app.context.interfaces';
import { setPriceAndBalance } from './setPriceAndBalance';

export const getPriceAndBalance = (
  mainData: Maindata,
  setMainData: Function | undefined,
  firstSubcontoId: string,
  secondSubcontoId: string,
  endDate: number,
  forTable: boolean,
) => {

  const { contentName } = mainData;

  endDate = 1717113583000;

  let schet = undefined
  let typeDocumentForReference = getTypeDocumentForReference(contentName);

  if (typeDocumentForReference == 'MATERIAL') {
    schet = Schet.S10
  }
  if (typeDocumentForReference == 'HALFSTUFF') {
    schet = Schet.S21;
  }
  if (typeDocumentForReference == 'PRODUCT') {
    schet = Schet.S28
  }

  if (schet) {
    setPriceAndBalance(mainData, setMainData, schet, firstSubcontoId, secondSubcontoId, endDate, forTable)
  }
  
}

