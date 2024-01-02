import { ReportWindowProps } from './reportWindow.props'
import OptionsBox from '../optionsBox/optionsBox'

export default function ReportWindow({ reportsType, className, ...props }: ReportWindowProps):JSX.Element {
    return (
        <>
            <OptionsBox />
            {/* {report && 
            <Report options={options} />} */}
        </>
    )
}
