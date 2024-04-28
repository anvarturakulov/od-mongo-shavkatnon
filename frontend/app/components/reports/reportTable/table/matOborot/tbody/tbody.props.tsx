import { Schet } from '@/app/interfaces/report.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TbodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    listSecondSubconts: Array<string>,
    firstSubcontoId: string,
    data: any,
    schet: Schet,
}