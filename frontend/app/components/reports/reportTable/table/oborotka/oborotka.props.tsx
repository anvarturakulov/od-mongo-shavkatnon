import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface OborotkaProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  listFirstSubconts: Array<string> | undefined,
  listSecondSubconts: Array<string> ,
  data: any,
}