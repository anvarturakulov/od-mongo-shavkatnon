import { DocTableItem } from '../interfaces/document.interface';
import { ContentType, MessageType, User } from '../interfaces/general.interface';
import { ReferenceModel } from '../interfaces/reference.interface';

export interface DocTable {
  items: Array<DocTableItem>
}

export interface Maindata {
  activeMenuKey: string,
  contentType?: ContentType,
  contentName: string,
  contentTitle: string;
  user: User | undefined,
  mainPage: boolean,
  showMessageWindow: boolean,
  message: string,
  messageType: MessageType,
  showDocumentWindow: boolean,
  isNewDocument: boolean,
  docTable: DocTable,
  clearControlElements: boolean,
  showReferenceWindow: boolean,
  isNewReference: boolean;
  updateDataForRefenceJournal: boolean,
  currentReferenceForShow: ReferenceModel | undefined,
}

export interface IAppContext {
  mainData: Maindata,
  setMainData? : (key: string, value: any) => void;
};