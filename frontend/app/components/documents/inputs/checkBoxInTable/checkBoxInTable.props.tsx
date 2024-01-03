import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface checkBoxInTableProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    itemIndexInTable: number,
    isPartner: boolean,
}
