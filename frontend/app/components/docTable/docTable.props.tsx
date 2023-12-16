import { TypeReference } from '@/app/interfaces/reference.interface';
import { DocumentTableItem } from "../../interfaces/documents/mainDocument.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DocTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    typeReference: TypeReference,
    hasWorkers: boolean,
    tableArray: Array<DocumentTableItem>,
    setTableArray:Function
}