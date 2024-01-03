import { ReportOptions } from '@/app/interfaces/report.interface';
import { showMessage } from '../common/showMessage';
import { defaultReportOptions } from '@/app/context/app.context.constants';
import axios from 'axios';
import { Maindata } from '@/app/context/app.context.interfaces';

export const getReport = (setMainData: Function | undefined, mainData: Maindata) => {

  const { user, reportOption, contentName } = mainData

  let body: ReportOptions = {
    ...reportOption,
  }

  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  const actionWithMainData = (mes: string) => {
    if (setMainData) {
      setMainData('reportOption', { ...defaultReportOptions });
      showMessage(`${contentName} буйича - ${mes}`, 'success', setMainData)
    }
  }

  const url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/' + contentName;

  axios.post(url, body, config)
    .then(function (response) {
      console.log(response.data)
      actionWithMainData('хисобот сервердан келди')
    })
    .catch(function (error) {
      if (setMainData) {
        showMessage(error.message, 'error', setMainData)
      }
    });

}