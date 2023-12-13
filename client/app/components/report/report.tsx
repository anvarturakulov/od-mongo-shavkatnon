import styles from './report.module.css'
import {ReportProps} from './report.props'
import { ReportsData as reportsData } from '@/client/app/data/report';
import { getOptionsByReportType } from '@/client/app/utils/getOptionsByReportType';
import { useRef } from 'react';
import {useReactToPrint} from 'react-to-print'
import PrintIco from './print.svg'
import { numberValue } from '@/client/app/utils/converters';


export default function Report({ options, className, ...props}:ReportProps):JSX.Element {
    
    const componentRef = useRef<HTMLInputElement>(null)
    const { reportsType, startDate, endDate, referenceId } = options
    const label = getOptionsByReportType(options.reportsType).label

    const handlePrint = useReactToPrint({
        content : () => componentRef.current,
        documentTitle: options.reportsType
    })

    return (
        <>
            <div className={styles.container} ref={componentRef} >
                <div className={styles.titleBox}>
                    <div className={styles.organization}>{`'Шавкат Нон' хусусий корхонаси`}</div>
                    <div className={styles.title}>{`${reportsType} буйича хисобот`}</div>
                    <div>{`Хисобот даври: ${startDate} дан ${endDate}`}</div>
                    {/* <div>{`${label}: ${referenceId}`}</div> */}
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th>№ </th>
                            <th>ТМБ</th>
                            <th>улч. бир.</th>
                            <th>нархи</th>
                            <th>Бошлангич (сони)</th>
                            <th>Бошлангич (суммаси)</th>
                            <th>Кирим (сони)</th>
                            <th>Кирим (суммаси)</th>
                            <th>Чиким (сони)</th>
                            <th>Чиким (суммаси)</th>
                            <th>Охирига (сони)</th>
                            <th>Охирига (сумма)</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {reportsData.map((item, key) => (
                            <>
                                <tr
                                    key={key}
                                    onDoubleClick={() => { alert(item.TMZ) }}
                                    className={styles.trRow}
                                >
                                    <tr>
                                        <td>{key + 1} </td>
                                        <td>{item.TMZ}</td>
                                        <td>{item.TMZEd}</td>
                                        <td>{item.Price}</td>
                                        <td className={styles.numberValue}>{numberValue(item.SNDK)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.SNDS)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.ODK)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.ODS)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.OKK)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.OKS)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.SKDK)}</td>
                                        <td className={styles.numberValue}>{numberValue(item.SKDS)}</td>
                                    </tr>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            <PrintIco onClick={handlePrint} className={styles.ico}/>
        </>
    )
}
