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
