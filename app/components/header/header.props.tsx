import { ContentType } from "@/app/interfaces/general.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    contentType: ContentType,
    contentTitle: string
}