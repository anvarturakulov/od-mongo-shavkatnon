import { DetailedHTMLProps, HTMLAttributes } from "react";
import { SectionType } from '../../inform.props';

export interface NormaItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentId: string | undefined,
  data: any,
  title: string,
}