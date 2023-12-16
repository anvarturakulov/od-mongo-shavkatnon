import { DocumentModel } from "../../interfaces/documents/mainDocument.interface";
import { ContentType } from "../../interfaces/general.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface JournalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    documents?: Array<DocumentModel>,
}