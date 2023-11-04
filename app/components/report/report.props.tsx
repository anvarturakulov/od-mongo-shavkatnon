import { OptionsToGenerateReport } from "@/app/interfaces/report.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ReportProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    options: OptionsToGenerateReport
}