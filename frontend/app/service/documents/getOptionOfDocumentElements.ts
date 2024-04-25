import { DocumentType, OptionsForDocument } from "../../interfaces/document.interface";
import { TypeReference } from '../../interfaces/reference.interface';

export const getOptionOfDocumentElements = (documentType: string): OptionsForDocument => {

    let senderType = TypeReference.STORAGES, senderLabel = '', senderIsVisible = false
    let receiverType = TypeReference.STORAGES, receiverLabel = '', recieverIsVisible = false  
    let analiticType = TypeReference.STORAGES , analiticLabel = '', analiticIsVisible = false
    let cashFromPartnerLabel = '' , cashFromPartnerVisible = false;
    let tableIsVisible = false;
    let countIsVisible = true;

    const documentsForComeMaterial = [
        `${DocumentType.ComeMaterial}`,
    ]

    if (documentsForComeMaterial.includes(documentType)) {
        senderType = TypeReference.PARTNERS
        senderLabel = 'Таъминотчи'
        senderIsVisible = true
        
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Кабул килувчи булим'
        recieverIsVisible = true

        analiticType = TypeReference.TMZ
        analiticLabel = 'Товар моддий бойлик'
        analiticIsVisible = true
    }

    const documentsForComeProduct = [
        `${DocumentType.ComeProduct}`,
        `${DocumentType.ComeHalfstuff}`,
    ]

    if (documentsForComeProduct.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Ишлаб чикарувчи булим'
        senderIsVisible = false
        
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Кабул килувчи булим'
        recieverIsVisible = false

        analiticType = TypeReference.TMZ
        analiticLabel = 'Товар моддий бойлик'
        analiticIsVisible = true
    }

    const documentsForComeHalfstuff = [
        `${DocumentType.ComeHalfstuff}`,
    ]

    if (documentsForComeHalfstuff.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Берувчи булим'
        senderIsVisible = true

        receiverType = TypeReference.CHARGES
        receiverLabel = 'Чиким учун харажат тури'
        recieverIsVisible = true

        analiticType = TypeReference.TMZ
        analiticLabel = 'ЯТМ номи'
        analiticIsVisible = true;

        tableIsVisible = true;
    }

    const documetsForSaleTMZ = [
        `${DocumentType.SaleProd}`,
        `${DocumentType.SaleMaterial}`,
    ]

    if (documetsForSaleTMZ.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Жунатувчи булим'
        senderIsVisible = true
        
        receiverType = TypeReference.PARTNERS
        receiverLabel = 'Сотиб олувчи'
        recieverIsVisible = true

        analiticType = TypeReference.TMZ
        analiticLabel = 'Товар моддий бойлик'
        analiticIsVisible = true

    }

    const documentsForLeaveProdAndHalfStuff = [
        `${DocumentType.LeaveProd}`,
        `${DocumentType.LeaveHalfstuff}`,
    ]

    if (documentsForLeaveProdAndHalfStuff.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Берувчи булим'
        senderIsVisible = true
        
        receiverType = TypeReference.CHARGES
        receiverLabel = 'Чиким учун харажат тури'
        recieverIsVisible = true

        analiticType = TypeReference.TMZ
        analiticLabel = 'Товар моддий бойлик'
        analiticIsVisible = true
    }

    const documentsForLeaveMaterial = [
        `${DocumentType.LeaveMaterial}`,
    ]

    if (documentsForLeaveMaterial.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Берувчи булим'
        senderIsVisible = true

        receiverType = TypeReference.CHARGES
        receiverLabel = 'Чиким учун харажат тури'
        recieverIsVisible = true

        tableIsVisible = true;
    }


    const documentsForMoveTMZ = [
        `${DocumentType.MoveProd}`,
        `${DocumentType.MoveMaterial}`,
        `${DocumentType.MoveHalfstuff}`,
    ]

    if (documentsForMoveTMZ.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Жунатувчи булим'
        senderIsVisible = true
        
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Кабул килувчи булим'
        recieverIsVisible = true

        analiticType = TypeReference.TMZ
        analiticLabel = 'Товар моддий бойлик'
        analiticIsVisible = true
    }

    const documentsForCashFromPartners = [
        `${DocumentType.ComeCashFromPartners}`,
    ]

    if (documentsForCashFromPartners.includes(documentType)) {
        senderType = TypeReference.PARTNERS
        senderLabel = 'Пулни берган хамкор'
        senderIsVisible = true
        
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Пулни кабул килувчи булим'
        recieverIsVisible = true

    }

    const documentsForCashMove = [
        `${DocumentType.MoveCash}`,
    ]

    if (documentsForCashMove.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Пулни берувчи булим'
        senderIsVisible = true
        
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Пулни кабул килувчи булим'
        recieverIsVisible = true
    }

    const documentsForCashLeave = [
        `${DocumentType.LeaveCash}`,
    ]

    if (documentsForCashLeave.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Пулни харажат килувчи булим'
        senderIsVisible = true

        analiticType = TypeReference.CHARGES
        analiticLabel = 'Харажат тури'
        analiticIsVisible = true
    }

    const documentsForZp = [
        `${DocumentType.ZpCalculate}`,
    ]

    if (documentsForZp.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = '-----'
        senderIsVisible = false
        
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Булим'
        recieverIsVisible = true

        analiticType = TypeReference.WORKERS
        analiticLabel = 'Ходим'
        analiticIsVisible = true
    }

    const documentsCountNotVisibel = [
        `${DocumentType.LeaveCash}`,
        `${DocumentType.MoveCash}`,
        `${DocumentType.ComeCashFromPartners}`,
        `${DocumentType.ZpCalculate}`,
        `${DocumentType.LeaveMaterial}`,
    ]

    if (documentsCountNotVisibel.includes(documentType)) {
        countIsVisible = false
    }

    return {
        senderType,
        senderLabel,
        receiverType,
        receiverLabel,
        senderIsVisible,
        recieverIsVisible,
        analiticType,
        analiticLabel,
        analiticIsVisible,
        cashFromPartnerLabel,
        cashFromPartnerVisible,
        tableIsVisible,
        countIsVisible,
    }
}