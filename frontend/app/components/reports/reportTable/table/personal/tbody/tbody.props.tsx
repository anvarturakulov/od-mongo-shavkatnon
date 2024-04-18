import { Schet } from '@/app/interfaces/report.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TbodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    fixedFirstSuncont: string,
    bodyByFirstSunconto: boolean,
    data: any,
    schet: Schet,
}