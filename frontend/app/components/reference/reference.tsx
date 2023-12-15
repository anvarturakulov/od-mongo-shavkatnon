'use client'
import { useState } from 'react';
import { ReferenceProps } from './reference.props';
import styles from './reference.module.css';
import cn from 'classnames';
import { Button} from '@/app/components';
import { ReferenceRequestModel, ReferenceType, TypePartners, TypeTMZ } from '../../interfaces/reference.interface';
import { getTypeReference } from '@/app/utils/getTypeReference';
import { DataForSelect } from '@/app/interfaces/general.interface';
import axios from 'axios';
import { getBodyForReferenceRequest } from '@/app/utils/utilsWithRequest';

const Select = (list:Array<DataForSelect>, label: string, typeString: string, changeElement: Function) => {
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

export const Reference = ({reference, referenceTitle, isNewReference, className, ...props }: ReferenceProps) :JSX.Element => {

    const referenceType = getTypeReference(referenceTitle);
    
    const defaultReferenceRequestModel: ReferenceRequestModel = {
        name: '',
        referenceType,
        typePartners: '',
        typeTMZ: '',
        unit: '',
        comment: ''
    }

    const typePartnersList = [
        {name: TypePartners.CLIENTS, title: 'Мижоз'},
        {name: TypePartners.SUPPLIERS, title: 'Таъминотчи'}
    ]

    const typeTMZList = [
        {name: TypeTMZ.MATERIAL, title: 'Материал'},
        {name: TypeTMZ.PRODUCT, title: 'Тайёр махсулот'},
        {name: TypeTMZ.HALFSTUFF, title: 'Ярим тайёр махсулот'}
    ]

    const [stateRequest, setStateRequest] = useState<ReferenceRequestModel>(defaultReferenceRequestModel) 

    const changeElements = (e: React.FormEvent<HTMLInputElement>, select?:boolean) => {
        let target = e.currentTarget
        setStateRequest(state => {
            return {
                ...state,
                [target.id]: target.value
            }
        })
    }

    const updateCreateReference = (body: ReferenceRequestModel, referenceType: ReferenceType, isNewReference: boolean) => {
        const uri = process.env.NEXT_PUBLIC_DOMAIN+'/api/reference/create';
        if (isNewReference) {
            axios.post(uri, getBodyForReferenceRequest(body, referenceType))
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                prompt(error);
            });
        }
    }

    return (
            <div className={cn(styles.referenceBox, {[styles.newReference] : isNewReference})}>
                <div>
                    <div>Номи</div>
                    <input type="text" id='name' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
                
                {
                    referenceType == ReferenceType.PARTNERS && 
                    Select(typePartnersList, 'Хамкор тури', 'typePartners', changeElements)
                }

                {
                    referenceType == ReferenceType.TMZ && 
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
                <Button appearance='primary' onClick={() => updateCreateReference(stateRequest, referenceType, isNewReference)}>Саклаш</Button>
                <Button appearance='ghost'>Бекор килиш</Button>
            </div> 
        </div>   
    )
} 