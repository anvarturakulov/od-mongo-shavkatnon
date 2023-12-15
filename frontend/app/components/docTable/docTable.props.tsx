import { DocumentTableItem } from "../../interfaces/documents/mainDocument.interface";
import { typeReference } from "../../interfaces/reference.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DocTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    typeReference: typeReference,
    hasWorkers: boolean,
    tableArray: Array<DocumentTableItem>,
    setTableArray:Function
}