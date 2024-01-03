import { DocumentType } from "./document.interface"
import { ContentType, ServiceType } from "./general.interface"
import { TypeReference } from './reference.interface'
import { ReportType } from './report.interface'

interface MenuSubItem {
    title: DocumentType | TypeReference | ServiceType | ReportType,
    description: string,
    type: ContentType,
    active:boolean
}

export interface MenuItem {
    title: string,
    isOpened: boolean,
    subMenu: Array<MenuSubItem>
}
