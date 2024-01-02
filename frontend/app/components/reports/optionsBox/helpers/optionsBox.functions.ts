import { defaultReportOptions } from '@/app/context/app.context.constants';
import { Maindata } from '@/app/context/app.context.interfaces';
import { ReportOptions } from '@/app/interfaces/report.interface';
import { showMessage } from '@/app/service/common/showMessage';
import axios from 'axios';

export const onChangeInputOptionsBox = (e: React.FormEvent<HTMLInputElement>, setMainData: Function | undefined, mainData: Maindata) => {
  let target = e.currentTarget
  let { reportOption } = mainData;
  let newObj = {
    ...reportOption,
    [target.id]: Date.parse(target.value),
  }
  if (setMainData) {
    setMainData('reportOption', { ...newObj })
  }
}

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

  const url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/'+contentName;
  
  axios.post(url, body, config)
    .then(function () {
      actionWithMainData('хисобот сервердан келди')
    })
    .catch(function (error) {
      if (setMainData) {
        showMessage(error.message, 'error', setMainData)
      }
    });
  
}