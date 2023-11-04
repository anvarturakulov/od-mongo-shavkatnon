import { DocumentType, OptionDocumentElements } from "../interfaces/documents/mainDocument.interface";
import { ReferenceType } from "../interfaces/references/mainReference.interface";

export const getOptionOfDocumentElements = (documentType: string): OptionDocumentElements => {
    
    let senderReferenceType = ReferenceType.Storages
    let senderLabel = ''
    let receiveReferenceType = ReferenceType.Partners
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
        senderReferenceType = ReferenceType.Partners
        senderLabel = 'Таъминотчи'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Storages
        senderLabel = 'Жунатувчи'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Partners
        senderLabel = 'Мижоз'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Charges
        senderLabel = 'Харажат тури'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Storages
        senderLabel = 'Кабул килувчи'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Partners
        senderLabel = 'Хамкор'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Storages
        senderLabel = 'Жунатувчи'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Storages
        senderLabel = '-----'
        receiveReferenceType = ReferenceType.Storages
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
        senderReferenceType = ReferenceType.Storages
        senderLabel = '-----'
        receiveReferenceType = ReferenceType.Storages
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