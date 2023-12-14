import { ReferenceType } from "./reference.interface"
import { DocumentType } from "./documents/mainDocument.interface"
import { ContentType, ServiceType } from "./general.interface"
import { ReportsType } from './report.interface'

interface MenuSubItem {
    title: DocumentType | ReferenceType | ServiceType | ReportsType,
    description: string,
    type: ContentType,
    active:boolean
}

export interface MenuItem {
    title: string,
    isOpened: boolean,
    subMenu: Array<MenuSubItem>
}
