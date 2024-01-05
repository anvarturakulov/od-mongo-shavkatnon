import { ReferenceModel } from '@/app/interfaces/reference.interface'

export const getPropertySubconto = (data: any, subcontoId: string) => {
  let elem
  if (data && data.length > 0) {
   elem = data.find((item: ReferenceModel) => item._id == subcontoId)
  }
  return {
    name: elem?.name,
    unit: elem?.unit,
  }
}