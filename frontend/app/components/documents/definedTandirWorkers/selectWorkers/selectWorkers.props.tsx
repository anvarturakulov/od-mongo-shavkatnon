import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { TandirWorkersType } from '../../selects/selectReferenceInForm/helper';

export interface SelectReferenceInFormProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string,
    currentItemId: string,
    type: TandirWorkersType,
}