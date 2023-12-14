import { ReferenceModel, ReferenceType } from '@/app/interfaces/reference.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReferenceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    reference?: ReferenceModel,
    referenceType: string,
}