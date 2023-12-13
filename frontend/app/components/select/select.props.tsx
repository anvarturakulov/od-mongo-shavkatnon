import { ReferenceType } from "@/app/interfaces/references/mainReference.interface";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string,
    referenceType: ReferenceType,
    visibile?: boolean
}