export enum ReferenceType {
    Charges='Харажатлар',
    Partners='Хамкорлар',
    Prices='Нархлар',
    Storages='Омборхоналар',
    TMZ='Товар моддий бойликлар',
    Workers='Ходимлар'
}

export enum TypePartners {
    Clients,
    Suppliers
}

export enum TypeTMZ {
    Material,
    Product,
    Halfstuff
}

export interface Reference {
    name: string;
    referenceType: ReferenceType;
    fullName?: string;
    typePartners?: TypePartners;
    typeTMZ?: TypeTMZ;
    location?: string;
    unit?: string;
}
