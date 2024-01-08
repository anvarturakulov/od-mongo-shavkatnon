import { ReportWindowProps } from './reportWindow.props'
import OptionsBox from '../optionsBox/optionsBox'
import { useAppContext } from '@/app/context/app.context'
import ReportTable from '../reportTable/reportTable'

export default function ReportWindow({ className, ...props }: ReportWindowProps):JSX.Element {
    const {mainData, setMainData} = useAppContext()
    const { startReport } = mainData.reportOption;

    const content = !startReport ? <OptionsBox/> : <ReportTable/>;
    
    return (
        <>
            {content}
        </>
    )
}
