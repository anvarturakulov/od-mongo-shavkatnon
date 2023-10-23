import { DocumentModel } from "@/app/interfaces/documents/mainDocument.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DocumentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    document?: DocumentModel
}