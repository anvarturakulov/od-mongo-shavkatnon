import { ReportOptions } from '@/app/interfaces/report.interface';
import { showMessage } from '../common/showMessage';
import { defaultReportOptions } from '@/app/context/app.context.constants';
import axios from 'axios';
import { Maindata } from '@/app/context/app.context.interfaces';

export const getEntrysJournal = (setMainData: Function | undefined, mainData: Maindata) => {

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
        const newReportOptions:ReportOptions = {
          ...reportOption,
          entrys: [...newEntrys],
          startReport: true,
        }
        setMainData('reportOption', { ...newReportOptions });
      }
      actionWithMainData('Журнал сервердан келди')
    })
    .catch(function (error) {
      if (setMainData) {
        showMessage(error.message, 'error', setMainData)
      }
    });

}