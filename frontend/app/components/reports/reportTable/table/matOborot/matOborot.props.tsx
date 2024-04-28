import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MatOborotProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  firstSubcontoId: string,
  listSecondSubconts: Array<string>,
  data: any,
}