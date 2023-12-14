import { ReferenceModel } from '@/app/interfaces/reference.interface';
import { ContentType } from "../../interfaces/general.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReferenceWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    contentTitle: string,
    contentType: ContentType,
}