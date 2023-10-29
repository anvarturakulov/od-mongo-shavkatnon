import { Reference } from "./mainReference.interface"

export enum TypePartners {
    Clients,
    Suppliers
}

export interface Partners extends Reference {
    typePartner: TypePartners
}