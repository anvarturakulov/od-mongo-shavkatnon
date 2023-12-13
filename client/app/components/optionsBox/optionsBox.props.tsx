import { ReportsType } from "@/client/app/interfaces/report.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface OptionsBoxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    reportsType: ReportsType
    showReport: Function
}