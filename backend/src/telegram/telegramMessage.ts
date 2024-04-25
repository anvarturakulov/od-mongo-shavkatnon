import { CreateDocumentDto } from '../document/dto/document.create.dto';
import { User } from '../auth/models/user.model';
import { UserRoles } from '../auth/dto/auth.dto';
import { getDescriptionDocument } from '../data/menu';
import { Reference } from 'src/reference/models/referense.model';
import { DocumentType } from 'src/interfaces/document.interface';

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
  analitic: Reference | undefined,
  firstWorker: Reference | undefined,
  secondWorker: Reference | undefined,
  thirdWorker: Reference | undefined,
}

export const numberValue = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const prepareCheck = (body: CreateDocumentDto, references: ReferencesForTelegramMessage, newDocument: boolean, messageInDeleting: string) => {

  let title = newDocument ? 'ШАВКАТ НОН" - ЧЕК' : 'ЧЕК УЗГАРТИРИЛДИ'
  if (messageInDeleting && messageInDeleting.length > 0) title = messageInDeleting
  let dateDoc = new Date(body.date).toLocaleDateString('ru-RU')
  let user = body.user ? `Ходим --- ${body.user}` : ''
  let date = dateDoc ? `Сана --- ${dateDoc}` : ''
  let hodim = body.documentType == DocumentType.LeaveHalfstuff ? 'Хамирчи' : 'Ёпувчи';
  let doc = getDescriptionDocument(body.documentType) ? `Хужжат тури --- ${getDescriptionDocument(body.documentType)}` : '';

  let receiver = references.receiver?.name ? `Олувчи -- - ${references.receiver.name}` : ''
  let analitic = references.analitic?.name ? `Аналитика -- - ${references.analitic.name}` : ''
  let sender = references.sender?.name ? `Жунатувчи -- - ${references.sender.name}` : ''
  let firstWorker = references.firstWorker?.name ? `( ${hodim} --- ${references.firstWorker.name}` : ''
  let secondWorker = references.secondWorker?.name ? `Зувалачи бир --- ${references.secondWorker.name}` : ''
  let thirdWorker = references.thirdWorker?.name ? `Зувалачи икки --- ${references.thirdWorker.name} )` : ''

  let count = body.count > 0 ? `Сон --- ${numberValue(body.count)} та` : ''
  let price = body.price > 0 ? `Нарх --- ${numberValue(body.price)}` : ''
  let total = body.total > 0 ? `Сумма --- ${numberValue(body.total)}` : ''
  let cashFromPartner = body.cashFromPartner > 0 ? `Хамкордан олинган пул --- ${numberValue(body.cashFromPartner)}` : ''
  let comment = body.comment ? `Изох: ${body.comment} ${firstWorker} ${secondWorker} ${thirdWorker}` : ''
  if (!comment) comment = `Изох: ${firstWorker} ${secondWorker} ${thirdWorker}`

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

const prepareCheckForZP = (body: CreateDocumentDto, references: ReferencesForTelegramMessage, newDocument: boolean, messageInDeleting: string) => {

  let title: string
  const titleForCalculate = 'ИШ ХАКИ ХИСОБЛАНДИ'
  const titleForCalculateChange = 'ИШ ХАКИ УЗГАРТИРИЛДИ'
  const titleForPayment = 'ИШ ХАКИ ТУЛАНДИ'
  const titleForPaymentChange = 'ТУЛОВ УЗГАРТИРИЛДИ'

  if (body.documentType == DocumentType.ZpCalculate) {
    title = newDocument ? titleForCalculate : titleForCalculateChange
  }

  if (body.documentType == DocumentType.LeaveCash) {
    title = newDocument ? titleForPayment : titleForPaymentChange
  }

  if (messageInDeleting && messageInDeleting.length > 0) title = messageInDeleting

  let dateDoc = new Date(body.date).toLocaleDateString('ru-RU')
  let date = dateDoc ? `Сана --- ${dateDoc}` : ''

  let receiver = references.receiver?.name ? `Цех -- - ${references.receiver.name}` : ''
  let analitic = references.analitic?.name ? `Ходим -- - ${references.analitic.name}` : ''

  let total = body.total > 0 ? `Сумма --- ${numberValue(body.total)}` : ''

  let comment = body.comment ? `Изох: ${body.comment}` : ''

  return (
    `==========================
      ${title}      
   =========================
   ${date} № - ${body.docNumber}
   --------------------------------------------
   ${receiver}
   ${analitic}
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

  if (!user) return

  if (user.role == UserRoles.TANDIR || user.role == UserRoles.HAMIRCHI) {
    firstChadId = TelegramChanelsIds.Production
  }

  if (user.role == UserRoles.ELAKCHI) {
    firstChadId = TelegramChanelsIds.MainSklad
  }

  if (user.role == UserRoles.HEADSECTION || user.role == UserRoles.SELLER) {
    if (user.storageId == '659ce07f523a48fdeb6ad8c3') firstChadId = TelegramChanelsIds.Chashma
    if (user.storageId == '659ce094523a48fdeb6ad8c7') firstChadId = TelegramChanelsIds.Halqobod
    if (user.storageId == '659ce0ab523a48fdeb6ad8cb') firstChadId = TelegramChanelsIds.Konteyner
    if (user.storageId == '65d8ea57c94c5501899dcc39') firstChadId = TelegramChanelsIds.Samarkand
  }

  if (user?.role == UserRoles.DELIVERY) firstChadId = TelegramChanelsIds.Delivery

  if (user?.role == UserRoles.GLBUX || user?.role == UserRoles.ZAMGLBUX) firstChadId = TelegramChanelsIds.GlBux

  let secondChatId = TelegramChanelsIds.All
  if (firstChadId) {
    bot.sendMessage(firstChadId, prepareCheck(body, references, newDocument, messageInDeleting));
  }
  bot.sendMessage(secondChatId, prepareCheck(body, references, newDocument, messageInDeleting));
  // bot.sendDocument(secondChatId,)

  if (body.documentType == DocumentType.ZpCalculate 
    || ( body.documentType == DocumentType.LeaveCash && body.isWorker)) {
    try {
      if (references.analitic.telegramId) {
        bot.sendMessage(references.analitic.telegramId, prepareCheckForZP(body, references, newDocument, messageInDeleting));
      }
    } catch {

    }
  }

}
