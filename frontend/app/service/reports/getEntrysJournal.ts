import { ReportOptions } from '@/app/interfaces/report.interface';
import { showMessage } from '../common/showMessage';
import axios from 'axios';
import { Maindata } from '@/app/context/app.context.interfaces';

export const getEntrysJournal = (setMainData: Function | undefined, mainData: Maindata, endDate?: number) => {
  const { user, contentName } = mainData
  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  const actionWithMainData = (mes: string) => {
    if (setMainData) {
      
      showMessage(`${contentName} буйича - ${mes}`, 'success', setMainData)
    }
  }

  const url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/entrys';

  axios.get(url, config)
    .then(function (response) {
      if (setMainData) {
        
        const { reportOption } = mainData;
        const newEntrys = [...response.data];

        let newReportOptions: ReportOptions = {
            ...reportOption,
            entrys: [...newEntrys],
            startReport: true,
          }

          if (endDate && endDate >= 0) {
            newReportOptions.endDate = endDate;
          }

        setMainData('reportOption', { ...newReportOptions });
      }
      
    })
    .catch(function (error) {
      if (setMainData) {
        showMessage(error.message, 'error', setMainData)
      }
    });

}