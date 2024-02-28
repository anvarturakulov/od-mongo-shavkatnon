import { DetailedHTMLProps, InputHTMLAttributes } from "react";
export type CheckboxIdTypes = 'partner' | 'worker' | 'founder'

export interface checkBoxInFormProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    itemIndexInTable: number,
    id: CheckboxIdTypes,
    label: string,
}
