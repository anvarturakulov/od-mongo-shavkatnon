import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface checkBoxInFormProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    itemIndexInTable: number,
    isPartner: boolean,
    label: string,
}
