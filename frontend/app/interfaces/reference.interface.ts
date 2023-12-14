export enum ReferenceType {
    CHARGES = 'CHARGES',
    PARTNERS = 'PARTNERS',
    PRICES = 'PRICES',
    STORAGES = 'STORAGES',
    TMZ = 'TMZ',
    WORKERS = 'WORKERS'
}

export enum TypePartners {
    CLIENTS = 'CLIENTS',
    SUPPLIERS = 'SUPPLIERS'
}

export enum TypeTMZ {
    MATERIAL = 'MATERIAL',
    PRODUCT = 'PRODUCT',
    HALFSTUFF = 'HALFSTUFF'
}

export interface ReferenceModel {
    _id?: string;
    name: string;
    referenceType: ReferenceType;
    typePartners?: TypePartners;
    typeTMZ?: TypeTMZ;
    unit?: string;
    comment?: string;
    deleted?: boolean;
}
