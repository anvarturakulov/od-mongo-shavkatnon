import { ReportsType } from "../../../interfaces/report.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReportWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    reportsType : ReportsType
}