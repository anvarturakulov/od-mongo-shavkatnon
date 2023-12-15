import { ReferenceModel } from '@/app/interfaces/reference.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReferenceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    reference?: ReferenceModel,
    referenceTitle: string,
    isNewReference: boolean
}