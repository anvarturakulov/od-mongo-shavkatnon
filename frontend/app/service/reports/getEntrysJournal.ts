import { ReportOptions, Schet } from '@/app/interfaces/report.interface';
import { showMessage } from '../common/showMessage';
import axios from 'axios';
import { Maindata } from '@/app/context/app.context.interfaces';
import { dateNumberToString } from '../common/converterForDates';

export const getEntrysJournal = (
  setMainData: Function | undefined, 
  mainData: Maindata,
  endDate?: number,
  ) => {
  
  const { user, contentName } = mainData
  
  // if (endDate) {
  //   let now = Date.now() + 18000000
  //   let nowInstr = dateNumberToString(now)
  //   dateStartForUrl = Date.parse(nowInstr)
  //   dateEndForUrl = Date.parse(nowInstr) + 86399999
  // }

  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };
  let url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/entrys';
  // else url = process.env.NEXT_PUBLIC_DOMAIN + '/api/report/entrysForDate'+'?dateStart='+dateStartForUrl+'&dateEnd='+dateEndForUrl;

  axios.get(url, config)
    .then(function (response) {
      if (setMainData) {
        
        const { reportOption } = mainData;
        const newEntrys = [...response.data];
        
        let newE = [...newEntrys.filter((item:any) => {
          return (item.debet == Schet.S67 || item.kredit == Schet.S67)
        })]

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