import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputInFormProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    payValue: number,
    label: string,
    visible?: boolean,
}
