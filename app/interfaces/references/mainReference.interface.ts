export enum ReferenceType {
    Charges='Харажатлар',
    Partners='Хамкорлар',
    Prices='Нархлар',
    Storages='Омборхоналар',
    TMZ='Товар моддий бойликлар',
    Workers='Ходимлар'
}

export interface Reference {
    _id: string
    name: string
    fullName: string
}