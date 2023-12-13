import { DocumentModel } from "@/app/interfaces/documents/mainDocument.interface";
import { ContentType } from "@/app/interfaces/general.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface JournalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    documents?: Array<DocumentModel>,
    contentTitle: string,
    contentType: ContentType,
}