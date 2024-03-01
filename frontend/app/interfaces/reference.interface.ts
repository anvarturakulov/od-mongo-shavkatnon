export enum TypeReference {
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
    typeReference: TypeReference;
    typePartners?: TypePartners;
    typeTMZ?: TypeTMZ;
    unit?: string;
    comment?: string;
    deleted?: boolean;
    delivery?: boolean;
    filial?: boolean;
    sklad?: boolean;
    un: boolean
}

export interface ReferenceBody {
    name: string;
    typeReference: TypeReference;
    typePartners: string;
    typeTMZ: string;
    unit: string;
    comment: string;
    delivery: boolean,
    filial: boolean,
    sklad: boolean,
    un: boolean,
}



