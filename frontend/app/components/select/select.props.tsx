import { DataForSelect } from '@/app/interfaces/general.interface';
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string,
    data: Array<DataForSelect>,
}