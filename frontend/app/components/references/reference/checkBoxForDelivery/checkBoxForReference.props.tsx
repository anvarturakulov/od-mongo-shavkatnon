import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface checkBoxForReferenceProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    checked: boolean,
    label: string,
    setCheckbox: Function,
    id: string
}
