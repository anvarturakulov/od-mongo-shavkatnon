import { DocumentModel } from '../interfaces/document.interface';
import { ContentType, MessageType, TandirWorkers, User } from '../interfaces/general.interface';
import { ReferenceModel } from '../interfaces/reference.interface';
import { EntryItem, ReportOptions } from '../interfaces/report.interface';

export interface Maindata {
  activeMenuKey: string,
  contentType?: ContentType,
  contentName: string,
  contentTitle: string;
  user: User | undefined,
  mainPage: boolean,
  showMessageWindow: boolean,
  message: string | Array<EntryItem>,
  messageType: MessageType,
  showDocumentWindow: boolean,
  isNewDocument: boolean,
  currentDocument: DocumentModel,
  updateDataForDocumentJournal: boolean,
  clearControlElements: boolean,
  showReferenceWindow: boolean,
  isNewReference: boolean;
  updateDataForRefenceJournal: boolean,
  currentReference: ReferenceModel | undefined,
  reportOption: ReportOptions,
  showIntervalWindow: boolean,
  showMayda: boolean,
  tandirWorkers: TandirWorkers | undefined
  
}

export interface IAppContext {
  mainData: Maindata,
  setMainData? : (key: string, value: any) => void;
};