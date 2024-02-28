import { DetailedHTMLProps, HTMLAttributes } from "react";

export type SectionType = 'delivery' | 'filial' 

export interface SectionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  sectionType : SectionType
}