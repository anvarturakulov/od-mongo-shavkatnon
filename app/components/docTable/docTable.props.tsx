import { DocumentTableItem } from "@/app/interfaces/documents/mainDocument.interface";
import { ReferenceType } from "@/app/interfaces/references/mainReference.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DocTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    referenceType: ReferenceType,
    hasWorkers: boolean,
    tableArray: Array<DocumentTableItem>,
    setTableArray:Function
}