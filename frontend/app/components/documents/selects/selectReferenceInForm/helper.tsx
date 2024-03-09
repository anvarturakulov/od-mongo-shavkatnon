import { Maindata } from '@/app/context/app.context.interfaces';

type workersType = 'firstWorker' | 'secondWorker' | 'thirdWorker'

export const definedTandirWorkers = (id: string|undefined, mainData: Maindata, type: workersType| string) => {
  if (id && typeof type != 'string' && id == mainData.tandirWorkers?.[type]) return true
  return false
}