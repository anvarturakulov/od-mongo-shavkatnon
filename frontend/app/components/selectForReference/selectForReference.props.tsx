import { TypeReference } from '@/app/interfaces/reference.interface';
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export interface SelectForReferenceProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    label: string,
    typeReference: TypeReference,
    visibile?: boolean
}