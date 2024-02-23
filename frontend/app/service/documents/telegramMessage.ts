import { Maindata } from '@/app/context/app.context.interfaces';
import { DocumentModel } from '@/app/interfaces/document.interface';
import { UserRoles } from '@/app/interfaces/general.interface';

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

const prepareCheck = (body: DocumentModel, mainData: Maindata) => {
  return ( 
  `===================== \n
        ХУЖЖАТ ЧЕКИ      \n
   ======================\n
   Ходим --- ${mainData.user?.name}\n
   Хужжат тури --- ${body.documentType}\n
   Сана  - ${body.date} № - ${body.date}\n\n
   ************************\n
   Олувчи --- ${body.receiverId}\n
   Берувчи --- ${body.senderId}\n
   Аналитика --- ${body.analiticId}\n
   Сон --- ${body.count}\n
   Нарх --- ${body.price}\n
   Сумма --- ${body.total}\n
   Сумма 2 --- ${body.cashFromPartner}\n
   **************************\n
   МЕХНАТИНГИЗ УЧУН РАХМАТ!\n
   =======================\n
  `
  )
}

export const sendMessageToChanel = (body: DocumentModel, mainData: Maindata) => {
  const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });
  let firstChadId = ''
  let {user} = mainData
  if (user?.role == UserRoles.ZUVALACHI || user?.role == UserRoles.HAMIRCHI ) {
    firstChadId = TelegramChanelsIds.Production
  }
  
  if (user?.role == UserRoles.ELAKCHI) {
    firstChadId = TelegramChanelsIds.MainSklad
  }

  if (user?.role == UserRoles.HEADSECTION) {
    if (user.storageId == '659ce07f523a48fdeb6ad8c3') firstChadId = TelegramChanelsIds.Chashma
    if (user.storageId == '659ce094523a48fdeb6ad8c7') firstChadId = TelegramChanelsIds.Halqobod
    if (user.storageId == '659ce0ab523a48fdeb6ad8cb') firstChadId = TelegramChanelsIds.Konteyner
    if (user.storageId == '65d8ea57c94c5501899dcc39') firstChadId = TelegramChanelsIds.Samarkand
  }

  if (user?.role == UserRoles.DELIVERY) firstChadId = TelegramChanelsIds.Delivery

  if (user?.role == UserRoles.GLBUX) firstChadId = TelegramChanelsIds.GlBux
  
  let secondChatId = TelegramChanelsIds.All
  
  bot.sendMessage(firstChadId, prepareCheck(body, mainData));
  bot.sendMessage(secondChatId, prepareCheck(body, mainData)); 
  
}
