


import { Maindata } from '@/app/context/app.context.interfaces';
import { EntryItem, Schet, TypeQuery } from '@/app/interfaces/report.interface';
import axios from 'axios';


export const queryForOne = (
  mainData: Maindata,
  schet: Schet,
  typeQuery: TypeQuery,
  firstSubcontoId: string,
  secondSubcontoId: string,
  forDashboard: boolean,
): number => {

  const { reportOption, interval, user } = mainData;

  let startDate = reportOption?.startDate
  let endDate = reportOption?.endDate

  endDate = endDate + 86399999

  if (forDashboard) {
    startDate = interval?.dateStart;
    endDate = interval?.dateEnd;
  }

  let url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/query' +
    '?typeQuery=' + typeQuery + '&schet=' + schet +
    '&startDate=' + startDate + '&endDate=' + endDate +
    '&firstSubcontoId=' + firstSubcontoId + '&secondSubcontoId=' + secondSubcontoId;

  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  let result;
  axios.get(url, config)
    .then(function (request) {
      result = request
    })
    .catch(function (error) {
      // if (setMainData) {
      //   showMessage(error.message, 'error', setMainData)
      // }
    });



  return 0
}