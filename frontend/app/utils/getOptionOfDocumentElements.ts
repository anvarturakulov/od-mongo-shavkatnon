import { DocumentType, OptionDocumentElements } from "../interfaces/documents/mainDocument.interface";
import { TypeReference } from '../interfaces/reference.interface';

export const getOptionOfDocumentElements = (documentType: string): OptionDocumentElements => {

    let sendertypeReference = TypeReference.STORAGES
    let senderLabel = ''
    let receivetypeReference = TypeReference.PARTNERS
    let receiveLabel = ''
    let paymentLabel = ''
    let paymentVisible = true
    let tableVisible = true
    let senderVisible = true
    let recieveVisible = true

    const documentsForComeMaterial = [
        `${DocumentType.ComeMaterial}`,
    ]

    if (documentsForComeMaterial.includes(documentType)) {
        sendertypeReference = TypeReference.PARTNERS
        senderLabel = 'Таъминотчи'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Омборхона'
        paymentLabel = '----'
        paymentVisible = false
        tableVisible = true
        senderVisible = true
        recieveVisible = true
    }

    const documentsForComeProductHalfstuff = [
        `${DocumentType.ComeProduct}`,
        `${DocumentType.ComeHalfstuff}`,
    ]

    if (documentsForComeProductHalfstuff.includes(documentType)) {
        sendertypeReference = TypeReference.STORAGES
        senderLabel = 'Жунатувчи'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Кабул килувчи'
        paymentLabel = '----'
        paymentVisible = false
        tableVisible = true
        senderVisible = true
        recieveVisible = true
    }

    const documetsForSaleTMZ = [
        `${DocumentType.SaleProd}`,
        `${DocumentType.SaleMaterial}`,
    ]

    if (documetsForSaleTMZ.includes(documentType)) {
        sendertypeReference = TypeReference.PARTNERS
        senderLabel = 'Мижоз'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Жунатувчи'
        paymentLabel = 'Мижоздан олинган пул'
        paymentVisible = true
        tableVisible = true
        senderVisible = true
        recieveVisible = true
    }

    const documentsForLeaveTMZ = [
        `${DocumentType.LeaveProd}`,
        `${DocumentType.LeaveMaterial}`,
        `${DocumentType.LeaveHalfstuff}`,
    ]

    if (documentsForLeaveTMZ.includes(documentType)) {
        sendertypeReference = TypeReference.CHARGES
        senderLabel = 'Харажат тури'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Жунатувчи'
        paymentLabel = '----'
        paymentVisible = false
        tableVisible = true
        senderVisible = true
        recieveVisible = true
    }

    const documentsForMoveTMZ = [
        `${DocumentType.MoveProd}`,
        `${DocumentType.MoveMaterial}`,
        `${DocumentType.MoveHalfstuff}`,
    ]

    if (documentsForMoveTMZ.includes(documentType)) {
        sendertypeReference = TypeReference.STORAGES
        senderLabel = 'Кабул килувчи'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Жунатувчи'
        paymentLabel = '----'
        paymentVisible = false
        tableVisible = true
        senderVisible = true
        recieveVisible = true
    }

    const documentsForCashFromPartners = [
        `${DocumentType.ComeCashFromPartners}`,
    ]

    if (documentsForCashFromPartners.includes(documentType)) {
        sendertypeReference = TypeReference.PARTNERS
        senderLabel = 'Хамкор'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Кабул килувчи'
        paymentLabel = 'Хамкордан олинган пул'
        paymentVisible = true
        tableVisible = false
        senderVisible = true
        recieveVisible = true
    }

    const documentsForCashMove = [
        `${DocumentType.MoveCash}`,
    ]

    if (documentsForCashMove.includes(documentType)) {
        sendertypeReference = TypeReference.STORAGES
        senderLabel = 'Жунатувчи'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Кабул килувчи'
        paymentLabel = 'Кабул олинган пул'
        paymentVisible = true
        tableVisible = false
        senderVisible = true
        recieveVisible = true
    }

    const documentsForCashLeave = [
        `${DocumentType.LeaveCash}`,
    ]

    if (documentsForCashLeave.includes(documentType)) {
        sendertypeReference = TypeReference.STORAGES
        senderLabel = '-----'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Харажат килувчи'
        paymentLabel = '-----'
        paymentVisible = false
        tableVisible = true
        senderVisible = false
        recieveVisible = true
    }

    const documentsForZp = [
        `${DocumentType.ZpCalculate}`,
    ]

    if (documentsForZp.includes(documentType)) {
        sendertypeReference = TypeReference.STORAGES
        senderLabel = '-----'
        receivetypeReference = TypeReference.STORAGES
        receiveLabel = 'Булим'
        paymentLabel = '------'
        paymentVisible = false
        tableVisible = true
        senderVisible = false
        recieveVisible = true
    }

    return {
        sendertypeReference,
        senderLabel,
        receivetypeReference,
        receiveLabel,
        paymentLabel,
        paymentVisible,
        tableVisible,
        senderVisible,
        recieveVisible
    }
}