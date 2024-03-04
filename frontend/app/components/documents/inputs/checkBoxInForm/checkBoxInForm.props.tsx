import { DetailedHTMLProps, InputHTMLAttributes } from "react";
export type CheckboxIdTypes = 'partner' | 'worker' | 'founder' | 'proveden'

export interface checkBoxInFormProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id: CheckboxIdTypes,
    label: string,
}
