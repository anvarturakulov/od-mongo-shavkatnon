import { ReferenceType } from "./references/mainReference.interface"
import { DocumentType } from "./documents/mainDocument.interface"
import { ContentType, ReportsType, ServiceType } from "./general.interface"

interface MenuSubItem {
    title: DocumentType | ReferenceType | ServiceType | ReportsType,
    type: ContentType,
    active:boolean
}

export interface MenuItem {
    title: string,
    isOpened: boolean,
    subMenu: Array<MenuSubItem>
}
