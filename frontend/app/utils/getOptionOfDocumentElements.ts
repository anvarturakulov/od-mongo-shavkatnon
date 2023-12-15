import { DocumentType, OptionDocumentElements } from "../interfaces/documents/mainDocument.interface";
import { ReferenceType } from "../interfaces/reference.interface";

export const getOptionOfDocumentElements = (documentType: string): OptionDocumentElements => {

    let senderReferenceType = ReferenceType.STORAGES
    let senderLabel = ''
    let receiveReferenceType = ReferenceType.PARTNERS
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
        senderReferenceType = ReferenceType.PARTNERS
        senderLabel = 'Таъминотчи'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.STORAGES
        senderLabel = 'Жунатувчи'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.PARTNERS
        senderLabel = 'Мижоз'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.CHARGES
        senderLabel = 'Харажат тури'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.STORAGES
        senderLabel = 'Кабул килувчи'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.PARTNERS
        senderLabel = 'Хамкор'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.STORAGES
        senderLabel = 'Жунатувчи'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.STORAGES
        senderLabel = '-----'
        receiveReferenceType = ReferenceType.STORAGES
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
        senderReferenceType = ReferenceType.STORAGES
        senderLabel = '-----'
        receiveReferenceType = ReferenceType.STORAGES
        receiveLabel = 'Булим'
        paymentLabel = '------'
        paymentVisible = false
        tableVisible = true
        senderVisible = false
        recieveVisible = true
    }

    return {
        senderReferenceType,
        senderLabel,
        receiveReferenceType,
        receiveLabel,
        paymentLabel,
        paymentVisible,
        tableVisible,
        senderVisible,
        recieveVisible
    }
}