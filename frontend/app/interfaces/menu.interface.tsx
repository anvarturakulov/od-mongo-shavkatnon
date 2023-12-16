import { DocumentType } from "./documents/mainDocument.interface"
import { ContentType, ServiceType } from "./general.interface"
import { TypeReference } from './reference.interface'
import { ReportsType } from './report.interface'

interface MenuSubItem {
    title: DocumentType | TypeReference | ServiceType | ReportsType,
    description: string,
    type: ContentType,
    active:boolean
}

export interface MenuItem {
    title: string,
    isOpened: boolean,
    subMenu: Array<MenuSubItem>
}
