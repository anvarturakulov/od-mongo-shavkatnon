import { showMessage } from '../common/showMessage';
import axios from 'axios';
import { Maindata } from '@/app/context/app.context.interfaces';

export const getInformation = (
  setMainData: Function | undefined, 
  mainData: Maindata,
  endDate?: number,
  ) => {
  
  const { user, interval, dashboardCurrentReportType } = mainData
  
  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  let url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/information'+'?startDate='+interval.dateStart+'&endDate='+interval.dateEnd+'&reportType='+dashboardCurrentReportType;

  axios.get(url, config)
    .then(function (response) {
      if (setMainData) {
        // console.log('Анвар ака')
        // console.log(response)
        setMainData('informData', [ ...response.data ]);
      }
      
    })
    .catch(function (error) {
      if (setMainData) {
        showMessage(error.message, 'error', setMainData)
      }
    });

  setMainData && setMainData('loading', false);

}