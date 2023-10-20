import { Reference } from "./mainReference.interface";

export enum TypeTMZ {
    Material,
    Product,
    Halfstuff
}


export interface Storages extends Reference {
    type: TypeTMZ,
    
}