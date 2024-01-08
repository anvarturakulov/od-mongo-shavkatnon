import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MatOborotProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  listSecondSubconts: Array<string>,
  data: any,
}