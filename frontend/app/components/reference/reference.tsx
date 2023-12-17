'use client'
import { useState } from 'react';
import { ReferenceProps } from './reference.props';
import styles from './reference.module.css';
import cn from 'classnames';
import { Button} from '@/app/components';
import { ReferenceBody, TypePartners, TypeReference, TypeTMZ } from '../../interfaces/reference.interface';
import { getTypeReference } from '@/app/utils/getTypeReference';
import { updateCreateReference } from '@/app/service/references.service';
import { DataForSelect, typePartnersList, typeTMZList } from './reference.constants';
import { useAppContext } from '@/app/context/app.context';
import { showMessage } from '@/app/utils/showMessage';

const Select = (list: Array<DataForSelect>, label: string, typeString: string, changeElement: Function) => {
    return (
        <div>
            <div className={styles.label}>{label}</div>
            <select
                className={styles.select}
                onChange={(e) => changeElement(e)}
                id={typeString}
            >
                {list.map(elem => (
                    <>
                        <option value={elem.name}>{elem.title}</option>
                    </>
                ))}
            </select>
        </div>
    )
}

export const Reference = ({ isNewReference, className, ...props }: ReferenceProps) :JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    const { contentTitle } = mainData;
    const typeReference = getTypeReference( contentTitle );
    
    const defaultBody: ReferenceBody = {
        name: '',
        typeReference,
        typePartners: typeReference == TypeReference.PARTNERS ? TypePartners.CLIENTS : '',
        typeTMZ: typeReference == TypeReference.TMZ ? TypeTMZ.MATERIAL : '',
        unit: '',
        comment: ''
    }

    const [body, setBody] = useState<ReferenceBody>(defaultBody) 

    const changeElements = (e: React.FormEvent<HTMLInputElement>, select?:boolean) => {
        let target = e.currentTarget
        setBody(state => {
            return {
                ...state,
                [target.id]: target.value
            }
        })
    }

    const onSubmit = async (body: ReferenceBody, typeReference: TypeReference, isNewReference: boolean) => {
        if (body.name.trim().length != 0) {
            updateCreateReference(body, typeReference, isNewReference, setMainData);
        } else {
            showMessage('Номини тулдиринг', 'error', setMainData);
        }
    }

    return (
            <div className={cn(styles.referenceBox, 
                {[styles.newReference] : isNewReference},
                {[styles.boxClose] : !mainData.showReferenceWindow})}>
                <div>
                    <div>Номи</div>
                    <input type="text" id='name' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
                
                {
                    typeReference == TypeReference.PARTNERS && 
                    Select(typePartnersList, 'Хамкор тури', 'typePartners', changeElements)
                }

                {
                    typeReference == TypeReference.TMZ && 
                    <div className={styles.box}> 
                        {
                            Select(typeTMZList, 'ТМБ тури', 'typeTMZ', changeElements)
                        }
                        <div>
                            <div>Улчов бирлиги</div>
                            <input type="text" id='unit' className={styles.input} onChange={(e)=>changeElements(e)}/>
                        </div>
                    </div>
                }

                <div>
                    <div>Изох</div>
                    <input type="text" id='comment' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
               
            <div className={styles.boxBtn}>
                <Button appearance='primary' onClick={() => onSubmit(body, typeReference, isNewReference)}>Саклаш</Button>
                <Button appearance='ghost'>Бекор килиш</Button>
            </div> 
        </div>   
    )
} 