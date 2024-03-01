import { DetailedHTMLProps, HTMLAttributes } from "react";

export type SectionType = 'delivery' | 'filial' 

export interface SkladProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: any;
  sectionType : SectionType,
  currentSection?: string
}