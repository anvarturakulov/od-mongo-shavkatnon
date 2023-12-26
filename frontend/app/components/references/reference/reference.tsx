'use client'
import { useEffect, useState } from 'react';
import { ReferenceProps } from './reference.props';
import styles from './reference.module.css';
import cn from 'classnames';
import { Button} from '@/app/components';
import { ReferenceBody, TypeReference } from '../../../interfaces/reference.interface';
import { getTypeReference } from '@/app/utils/getTypeReference';
import { updateCreateReference } from '@/app/service/references.service';
import { typePartnersList, typeTMZList } from './reference.constants';
import { useAppContext } from '@/app/context/app.context';
import { showMessage } from '@/app/utils/showMessage';
import { getTypeReferenceByTitle } from '@/app/utils/getTypeReferenceByTitle';
import { Select } from './reference.components';

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

    const onSubmit = (
        body: ReferenceBody, 
        id: string | undefined, 
        typeReference: TypeReference, 
        isNewReference: boolean, 
        setMainData: Function| undefined,
        token: string | undefined) => {
        if (typeReference == TypeReference.TMZ && body.typeTMZ == '') {
            showMessage('ТМБ турини танланг', 'error', setMainData);
            return
        }
        
        if (body.name.trim().length != 0) {
            updateCreateReference(body, id, typeReference, isNewReference, setMainData, token);
        } else {
            showMessage('Номини тулдиринг', 'error', setMainData);
        }
    }

    const cancelSubmit = () => {
        if (setMainData) {
            setMainData('clearControlElements', true);
            setMainData('showReferenceWindow', false);
            setMainData('isNewReference', false);
        }
    }

    useEffect(()=> {
        setBody(defaultBody);
    }, [mainData.clearControlElements])

    useEffect(() => {
        const {currentReferenceForShow} = mainData
        
        if (currentReferenceForShow != undefined) {
            const { typePartners, typeTMZ, unit, comment } = currentReferenceForShow
            let newBody = {
                name: currentReferenceForShow.name,
                typeReference: getTypeReferenceByTitle(currentReferenceForShow.typeReference),
                typePartners: typePartners ? typePartners: '',
                typeTMZ: typeTMZ ? typeTMZ : '',
                unit: unit ? unit : '',
                comment: comment ? comment : '' 
            }
            setBody(newBody)
        }
    }, [mainData.currentReferenceForShow])

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

                <div>
                    <div>Изох</div>
                    <input value={body.comment} type="text" id='comment' className={styles.input} onChange={(e)=>changeElements(e)}/>
                </div>
               
            <div className={styles.boxBtn}>
                <Button appearance='primary' onClick={() => 
                    onSubmit(body, 
                             mainData.currentReferenceForShow?._id, 
                             typeReference, 
                             isNewReference,
                             setMainData,
                             user?.access_token)}
                    >Саклаш</Button>
                <Button appearance='ghost' onClick={cancelSubmit}>Бекор килиш</Button>
            </div> 
        </div>   
    )
} 