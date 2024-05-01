import { DetailedHTMLProps, HTMLAttributes } from "react";
import { SectionType } from '../../inform.props';

export interface ProductionItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentId: string | undefined,
  data: any,
  hamirs: any,
  title: string,
}