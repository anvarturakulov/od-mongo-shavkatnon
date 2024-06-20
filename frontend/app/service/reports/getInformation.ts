import { showMessage } from '../common/showMessage';
import axios from 'axios';
import { Maindata } from '@/app/context/app.context.interfaces';
import { UserRoles } from '@/app/interfaces/general.interface';

export const getInformation = (
  setMainData: Function | undefined, 
  mainData: Maindata,
  endDate?: number,
  ) => {
  
  const { user, interval, dashboardCurrentReportType } = mainData
  let reportType = dashboardCurrentReportType
  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  // if (user?.role == UserRoles.HEADCOMPANY || user?.role == UserRoles.ADMIN ) {
  //   reportType =  'All'
  // }

  let url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/information'+'?startDate='+interval.dateStart+'&endDate='+interval.dateEnd+'&reportType='+reportType;
  console.log('zapros junatildi '+Date.now())
  axios.get(url, config)
    .then(function (response) {
      if (setMainData) {
        // console.log('Анвар ака')
        // console.log(response)
        console.log('date keldi '+Date.now())
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