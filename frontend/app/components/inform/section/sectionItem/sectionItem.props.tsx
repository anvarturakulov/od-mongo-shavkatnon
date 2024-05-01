import { DetailedHTMLProps, HTMLAttributes } from "react";
import { SectionType } from '../../inform.props';

export interface SectionItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentId: string | undefined,
  data: any,
  title: string,
  sectionType : SectionType
}