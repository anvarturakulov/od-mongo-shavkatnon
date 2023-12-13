import { DocumentTableItem } from "../../interfaces/documents/mainDocument.interface";
import { ReferenceType } from "../../interfaces/references/mainReference.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DocTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    referenceType: ReferenceType,
    hasWorkers: boolean,
    tableArray: Array<DocumentTableItem>,
    setTableArray:Function
}