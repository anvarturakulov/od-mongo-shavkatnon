import { typeReference } from "../../interfaces/reference.interface";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectForReferenceProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string,
    typeReference: typeReference,
    visibile?: boolean
}