import { ReportsType } from "@/app/interfaces/report.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReportWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    reportsType : ReportsType
}