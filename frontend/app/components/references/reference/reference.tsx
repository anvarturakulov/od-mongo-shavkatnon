'use client'
import { useEffect, useState } from 'react';
import { ReferenceProps } from './reference.props';
import styles from './reference.module.css';
import cn from 'classnames';
import { Button} from '@/app/components';
import { ReferenceBody, TypeReference } from '../../../interfaces/reference.interface';
import { typePartnersList, typeTMZList } from './helpers/reference.constants';
import { useAppContext } from '@/app/context/app.context';
import { Select } from './helpers/reference.components';
import { cancelSubmit, onSubmit } from './helpers/reference.functions';
import { getTypeReference } from '@/app/service/references/getTypeReference';
import { getTypeReferenceByTitle } from '@/app/service/references/getTypeReferenceByTitle';
import { UserRoles } from '@/app/interfaces/general.interface';
import { CheckBoxForDelivery } from './checkBoxForDelivery/checkBoxForDelivery';

export const Reference = ({ className, ...props }: ReferenceProps) :JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    
    const { contentName } = mainData;
    const typeReference = getTypeReference( contentName );
    
    const defaultBody: ReferenceBody = {
        name: '',
        typeReference,
        typePartners: '',
        typeTMZ: '',
        unit: '',
        comment: '',
        delivery: true
    }

    const [body, setBody] = useState<ReferenceBody>(defaultBody) 

    const changeElements = (e: React.FormEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        setBody(state => {
            return {
                ...state,
                [target.id]: target.value
            }
        })
    }

    const setCheckbox = (checked: boolean) => {
        setBody(state => {
            return {
                ...state,
                delivery: checked
            }
        })
    }

    useEffect(()=> {
        setBody(defaultBody);
    }, [mainData.clearControlElements])

    useEffect(() => {
        const {currentReference} = mainData
        
        if (currentReference != undefined) {
            const { typePartners, typeTMZ, unit, comment, delivery } = currentReference
            let newBody = {
                name: currentReference.name,
                typeReference: getTypeReferenceByTitle(currentReference.typeReference),
                typePartners: typePartners ? typePartners: '',
                typeTMZ: typeTMZ ? typeTMZ : '',
                unit: unit ? unit : '',
                comment: comment ? comment : '' ,
                delivery: currentReference.delivery ? true : false
            }
            setBody(newBody)
        }
    }, [mainData.currentReference])

    const {isNewReference, showReferenceWindow, user} = mainData

    return (
            <div className={cn(styles.referenceBox, 
                {[styles.newReference] : isNewReference},
                {[styles.boxClose] : !showReferenceWindow})}>
                <div className={styles.nameBox}>
                    <div>Номи</div>
                    <input value={body.name} type="text" id='name' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
                {
                    typeReference == TypeReference.PARTNERS && 
                    Select(typePartnersList, body, 'Хамкор тури', 'typePartners', changeElements)
                }
 
                {
                    typeReference == TypeReference.TMZ && 
                    <div className={styles.box}> 
                        {
                            Select(typeTMZList, body, 'ТМБ тури', 'typeTMZ', changeElements)
                        }
                        <div>
                            <div>Улчов бирлиги</div>
                            <input value={body.unit} type="text" id='unit' className={styles.input} onChange={(e)=>changeElements(e)}/>
                        </div>
                    </div>
                }

                {
                    mainData.user?.role == UserRoles.ADMIN && 
                    <CheckBoxForDelivery label='Юк ташувчи' setCheckbox={setCheckbox} checked={body.delivery}/>
                }
                <div>
                    <div>Изох</div>
                    <input value={body.comment} type="text" id='comment' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
               
            <div className={styles.boxBtn}>
                <Button appearance='primary' onClick={() => 
                    onSubmit(body, 
                             mainData.currentReference?._id, 
                             typeReference, 
                             isNewReference,
                             setMainData,
                             user?.access_token)}
                    >Саклаш</Button>
                <Button appearance='ghost' onClick={() => cancelSubmit(setMainData)}>Бекор килиш</Button>
            </div> 
        </div>   
    )
} 