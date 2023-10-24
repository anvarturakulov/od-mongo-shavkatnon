import { ReferenceType } from "./references/mainReference.interface"
import { DocumentType } from "./documents/mainDocument.interface"

interface MenuSubItem {
    title: string,
    type: 'document' | 'reference' | 'servis',
    active:boolean
}

export interface MenuItem {
    title: string,
    isOpened: boolean,
    subMenu: Array<MenuSubItem>
}
