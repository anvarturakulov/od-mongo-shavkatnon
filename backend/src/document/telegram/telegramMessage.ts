import { CreateDocumentDto } from '../dto/document.create.dto';
import { User, UserDocument } from '../../auth/models/user.model';
import { UserRoles } from '../../auth/dto/auth.dto';
import { AuthService } from '../../auth/auth.service';
import { getDescriptionDocument } from '../../data/menu';
import { Reference } from 'src/reference/models/referense.model';

const TelegramBot = require('node-telegram-bot-api');

enum TelegramChanelsIds {
  Production = '-1002006894052',
  MainSklad = '-1002012045551',
  Halqobod = '-1001835659653',
  Chashma = '-1001946482895',
  Konteyner = '-1002017218377',
  All = '-1002097943185',
  Samarkand = '-1001965481251',
  GlBux = '-1002123973259',
  Delivery = '-1002107734996'
}

export type ReferencesForTelegramMessage = {
  sender: Reference | undefined,
  receiver: Reference | undefined,
  analitic: Reference | undefined
}

export const numberValue = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const prepareCheck = (body: CreateDocumentDto, references: ReferencesForTelegramMessage, newDocument: boolean, messageInDeleting: string) => {
  
  let title = newDocument ? 'ШАВКАТ НОН" - ЧЕК': 'ЧЕК УЗГАРТИРИЛДИ'
  if (messageInDeleting && messageInDeleting.length > 0) title = messageInDeleting
  let dateDoc = new Date(body.date).toLocaleDateString('ru-RU')
  let user = body.user ? `Ходим --- ${body.user}`: ''
  let date = dateDoc ? `Сана --- ${dateDoc}` : ''
  let doc = getDescriptionDocument(body.documentType) ? `Хужжат тури --- ${ getDescriptionDocument(body.documentType) }`: '';

  let receiver = references.receiver?.name ? `Олувчи-- - ${references.receiver.name}` : ''
  let analitic = references.analitic?.name ? `Аналитика-- - ${references.analitic.name}` : ''
  let sender = references.sender?.name ? `Жунатувчи-- - ${ references.sender.name }` : ''
  
  let count = body.count > 0 ? `Сон --- ${ numberValue(body.count) }`: ''
  let price = body.price > 0 ? `Нарх --- ${numberValue(body.price)}` : ''
  let total = body.total > 0 ? `Сумма --- ${numberValue(body.total)}` : ''
  let cashFromPartner = body.cashFromPartner > 0 ? `Хамкордан олинган пул --- ${numberValue(body.cashFromPartner)}` : ''
  let comment = body.comment ? `Изох: ${body.comment}`: ''
  
  
  return ( 
  `==========================
      ${title}      
   =========================
   ${user}
   ${doc}
   ${date} № - ${body.docNumber}
   --------------------------------------------
   ${receiver}
   ${sender}
   ${analitic}
   ${count} ${price}
   ${total} 
   ${comment}
   ==========================
   МЕХНАТИНГИЗ УЧУН РАХМАТ!
   ==========================
  `
  )
}

export const sendMessageToChanel = (body: CreateDocumentDto, user: User, references: ReferencesForTelegramMessage, newDocument: boolean, messageInDeleting: string) => {
  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });
  let firstChadId = ''

  if (user && user.role != null && user.role == UserRoles.ZUVALACHI || user.role == UserRoles.HAMIRCHI ) {
    firstChadId = TelegramChanelsIds.Production
  }
  
  if (user.role == UserRoles.ELAKCHI) {
    firstChadId = TelegramChanelsIds.MainSklad
  }
  
  if (user.role == UserRoles.HEADSECTION || user.role == UserRoles.SELLER ) {
    if (user.storageId == '659ce07f523a48fdeb6ad8c3') firstChadId = TelegramChanelsIds.Chashma
    if (user.storageId == '659ce094523a48fdeb6ad8c7') firstChadId = TelegramChanelsIds.Halqobod
    if (user.storageId == '659ce0ab523a48fdeb6ad8cb') firstChadId = TelegramChanelsIds.Konteyner
    if (user.storageId == '65d8ea57c94c5501899dcc39') firstChadId = TelegramChanelsIds.Samarkand
  }

  if (user?.role == UserRoles.DELIVERY) firstChadId = TelegramChanelsIds.Delivery

  if (user?.role == UserRoles.GLBUX || user?.role == UserRoles.ZAMGLBUX) firstChadId = TelegramChanelsIds.GlBux
  
  let secondChatId = TelegramChanelsIds.All
  
  bot.sendMessage(firstChadId, prepareCheck(body, references, newDocument, messageInDeleting));
  bot.sendMessage(secondChatId, prepareCheck(body, references, newDocument, messageInDeleting)); 
  
}
