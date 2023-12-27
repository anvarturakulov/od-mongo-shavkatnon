import { DocumentType, OptionsForDocument } from "../../interfaces/document.interface";
import { TypeReference } from '../../interfaces/reference.interface';

export const getOptionOfDocumentElements = (documentType: string): OptionsForDocument => {

    let senderType = TypeReference.STORAGES
    let senderLabel = ''
    let receiverType = TypeReference.PARTNERS
    let receiverLabel = ''
    let paymentLabel = ''
    let paymentIsVisible = true
    let tableIsVisible = true
    let senderIsVisible = true
    let recieverIsVisible = true

    const documentsForComeMaterial = [
        `${DocumentType.ComeMaterial}`,
    ]

    if (documentsForComeMaterial.includes(documentType)) {
        senderType = TypeReference.PARTNERS
        senderLabel = 'Таъминотчи'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Омборхона'
        paymentLabel = '----'
        paymentIsVisible = false
        tableIsVisible = true
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documentsForComeProductHalfstuff = [
        `${DocumentType.ComeProduct}`,
        `${DocumentType.ComeHalfstuff}`,
    ]

    if (documentsForComeProductHalfstuff.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Жунатувчи'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Кабул килувчи'
        paymentLabel = '----'
        paymentIsVisible = false
        tableIsVisible = true
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documetsForSaleTMZ = [
        `${DocumentType.SaleProd}`,
        `${DocumentType.SaleMaterial}`,
    ]

    if (documetsForSaleTMZ.includes(documentType)) {
        senderType = TypeReference.PARTNERS
        senderLabel = 'Мижоз'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Жунатувчи'
        paymentLabel = 'Мижоздан олинган пул'
        paymentIsVisible = true
        tableIsVisible = true
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documentsForLeaveTMZ = [
        `${DocumentType.LeaveProd}`,
        `${DocumentType.LeaveMaterial}`,
        `${DocumentType.LeaveHalfstuff}`,
    ]

    if (documentsForLeaveTMZ.includes(documentType)) {
        senderType = TypeReference.CHARGES
        senderLabel = 'Харажат тури'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Жунатувчи'
        paymentLabel = '----'
        paymentIsVisible = false
        tableIsVisible = true
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documentsForMoveTMZ = [
        `${DocumentType.MoveProd}`,
        `${DocumentType.MoveMaterial}`,
        `${DocumentType.MoveHalfstuff}`,
    ]

    if (documentsForMoveTMZ.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Кабул килувчи'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Жунатувчи'
        paymentLabel = '----'
        paymentIsVisible = false
        tableIsVisible = true
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documentsForCashFromPartners = [
        `${DocumentType.ComeCashFromPartners}`,
    ]

    if (documentsForCashFromPartners.includes(documentType)) {
        senderType = TypeReference.PARTNERS
        senderLabel = 'Хамкор'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Кабул килувчи'
        paymentLabel = 'Хамкордан олинган пул'
        paymentIsVisible = true
        tableIsVisible = false
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documentsForCashMove = [
        `${DocumentType.MoveCash}`,
    ]

    if (documentsForCashMove.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = 'Жунатувчи'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Кабул килувчи'
        paymentLabel = 'Кабул олинган пул'
        paymentIsVisible = true
        tableIsVisible = false
        senderIsVisible = true
        recieverIsVisible = true
    }

    const documentsForCashLeave = [
        `${DocumentType.LeaveCash}`,
    ]

    if (documentsForCashLeave.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = '-----'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Харажат килувчи'
        paymentLabel = '-----'
        paymentIsVisible = false
        tableIsVisible = true
        senderIsVisible = false
        recieverIsVisible = true
    }

    const documentsForZp = [
        `${DocumentType.ZpCalculate}`,
    ]

    if (documentsForZp.includes(documentType)) {
        senderType = TypeReference.STORAGES
        senderLabel = '-----'
        receiverType = TypeReference.STORAGES
        receiverLabel = 'Булим'
        paymentLabel = '------'
        paymentIsVisible = false
        tableIsVisible = true
        senderIsVisible = false
        recieverIsVisible = true
    }

    return {
        senderType,
        senderLabel,
        receiverType,
        receiverLabel,
        paymentLabel,
        paymentIsVisible,
        tableIsVisible,
        senderIsVisible,
        recieverIsVisible
    }
}