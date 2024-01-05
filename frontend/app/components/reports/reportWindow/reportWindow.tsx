import { ReportWindowProps } from './reportWindow.props'
import OptionsBox from '../optionsBox/optionsBox'
import { useAppContext } from '@/app/context/app.context'
import { ReportType } from '@/app/interfaces/report.interface'
import MatOborot from '../typesReport/matOborot/matOborot'

export default function ReportWindow({ className, ...props }: ReportWindowProps):JSX.Element {
    const {mainData, setMainData} = useAppContext()
    const { contentName, reportOption } = mainData;
    const { startReport } = reportOption;

    return (
        <>
            {!startReport && <OptionsBox/>}
            {
                contentName == ReportType.MatOborot && 
                <MatOborot/>
            }
        </>
    )
}
