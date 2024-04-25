'use client'
import { useEffect, useState } from 'react';
import { ReferenceProps } from './reference.props';
import styles from './reference.module.css';
import cn from 'classnames';
import { Button} from '@/app/components';
import { ReferenceModel, TypePartners, TypeReference, TypeTMZ } from '../../../interfaces/reference.interface';
import { typePartnersList, typeTMZList } from './helpers/reference.constants';
import { useAppContext } from '@/app/context/app.context';
import { Select } from './helpers/reference.components';
import { cancelSubmit, onSubmit } from './helpers/reference.functions';
import { getTypeReference } from '@/app/service/references/getTypeReference';
import { getTypeReferenceByTitle } from '@/app/service/references/getTypeReferenceByTitle';
import { UserRoles } from '@/app/interfaces/general.interface';
import { CheckBoxForReference } from './checkBoxForDelivery/checkBoxForReference';
import { SelectForReferences } from './selectForReferences/selectForReferences';

export const Reference = ({ className, ...props }: ReferenceProps) :JSX.Element => {

    const {mainData, setMainData} = useAppContext();
    
    const { contentName } = mainData;
    const typeReference = getTypeReference( contentName );
    
    const defaultBody: ReferenceModel = {
        name: '',
        typeReference,
        typePartners: undefined,
        typeTMZ: undefined,
        unit: '',
        comment: '',
        delivery: false,
        filial: false,
        sklad: false,
        buxgalter: false,
        un: false,
        clientForDeliveryId: '',
        firstPrice:0,
        secondPrice:0,
        thirdPrice:0,
        deleted: false,
        norma: 0
    }

    const [body, setBody] = useState<ReferenceModel>(defaultBody) 

    const changeElements = (e: React.FormEvent<HTMLInputElement>) => {
        let target = e.currentTarget
        setBody((state:ReferenceModel) => {
            return {
                ...state,
                [target.id]: target.value
            }
        })
    }

    const setCheckbox = (checked: boolean, id: string) => {
        setBody((state:ReferenceModel) => {
            return {
                ...state,
                [`${id}`]: checked
            }
        })
    }

    const setClientForDeliveryId = (id: string) => {
        setBody((state:ReferenceModel) => {
            return {
                ...state,
                clientForDeliveryId: id
            }
        })
    }

    useEffect(()=> {
        setBody(defaultBody);
    }, [mainData.clearControlElements])

    useEffect(() => {
        const {currentReference} = mainData
        
        if (currentReference != undefined) {
            const { typePartners, typeTMZ, unit, comment } = currentReference
            let newBody: ReferenceModel = {
                ...currentReference,
                typeReference: getTypeReferenceByTitle(currentReference.typeReference),
                typePartners: typePartners,
                typeTMZ: typeTMZ,
                unit: unit,
                comment: comment,
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

            <div className={styles.checkBoxs}>
                {
                    mainData.user?.role == UserRoles.ADMIN && 
                    body.typeReference == TypeReference.STORAGES &&
                    <CheckBoxForReference label='Юк ташувчи' setCheckbox={setCheckbox} checked={body.delivery} id={'delivery'}/>
                }

                {
                    mainData.user?.role == UserRoles.ADMIN && 
                    body.typeReference == TypeReference.STORAGES &&
                    <CheckBoxForReference label='Умумий булим' setCheckbox={setCheckbox} checked={body.umumBulim} id={'umumBulim'}/>
                }

                {
                    mainData.user?.role == UserRoles.ADMIN && 
                    body.typeReference == TypeReference.STORAGES &&
                    <CheckBoxForReference label='Филиал' setCheckbox={setCheckbox} checked={body.filial} id={'filial'}/>
                }

                {
                    mainData.user?.role == UserRoles.ADMIN && 
                    body.typeReference == TypeReference.STORAGES &&
                    <CheckBoxForReference label='Склад' setCheckbox={setCheckbox} checked={body.sklad} id={'sklad'}/>
                }

                {
                    ( mainData.user?.role == UserRoles.ADMIN || mainData.user?.role == UserRoles.HEADCOMPANY )  && 
                    body.typeReference == TypeReference.TMZ &&
                    <CheckBoxForReference label='Ун' setCheckbox={setCheckbox} checked={body.un} id={'un'}/>
                }

                {
                    ( mainData.user?.role == UserRoles.ADMIN || mainData.user?.role == UserRoles.HEADCOMPANY )  && 
                    body.typeReference == TypeReference.STORAGES &&
                    <CheckBoxForReference label='Бухгалтер' setCheckbox={setCheckbox} checked={body.buxgalter} id={'buxgalter'}/>
                }
                
            </div>

            {
                ( 
                    mainData.user?.role == UserRoles.ADMIN || 
                    mainData.user?.role == UserRoles.HEADCOMPANY 
                ) &&
                body.typeReference == TypeReference.TMZ &&
                body.typeTMZ == TypeTMZ.PRODUCT &&

                <div className={styles.priceBox}>
                    <div>
                        <div>Биринчи нарх</div>
                        <input value={body.firstPrice} type="number" id='firstPrice' className={styles.input} onChange={(e)=>changeElements(e)}/>
                    </div>
                    <div>
                        <div>Иккинчи нарх</div>
                        <input value={body.secondPrice} type="number" id='secondPrice' className={styles.input} onChange={(e)=>changeElements(e)}/>
                    </div>
                    <div>
                        <div>Учинчи нарх</div>
                        <input value={body.thirdPrice} type="number" id='thirdPrice' className={styles.input} onChange={(e)=>changeElements(e)}/>
                    </div>
                </div>
            }
            
            {
                ( mainData.user?.role == UserRoles.ADMIN || mainData.user?.role == UserRoles.HEADCOMPANY )  && 
                (body.typePartners == TypePartners.CLIENTS) &&
                <SelectForReferences label='Клиент сохиби' typeReference={TypeReference.STORAGES} currentItemId={mainData.currentReference?.clientForDeliveryId} setClientForDeliveryId={setClientForDeliveryId}/>
            }

            {
                ( mainData.user?.role == UserRoles.ADMIN || mainData.user?.role == UserRoles.HEADCOMPANY )  && 
                (body.typeReference == TypeReference.TMZ) && (body.typeTMZ = TypeTMZ.MATERIAL) &&
                <>
                <div>Норма</div>
                <input value={body.norma} type="number" id='norma' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </>
            }

            {
                body.typeReference == TypeReference.WORKERS &&
                <div>
                    <div>Телеграм ID</div>
                    <input value={body.telegramId} type="text" id='telegramId' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
            }

            <div>
                <div>Изох</div>
                <input value={body.comment} type="text" id='comment' className={styles.input} onChange={(e)=>changeElements(e)}/>
            </div>
            
        <div className={styles.boxBtn}>
            <Button appearance='primary' onClick={() => 
                onSubmit(body,
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