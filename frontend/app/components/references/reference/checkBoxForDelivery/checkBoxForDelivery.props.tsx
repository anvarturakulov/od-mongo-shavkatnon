import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface checkBoxForDeliveryProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    checked: boolean,
    label: string,
    setCheckbox: Function
}
