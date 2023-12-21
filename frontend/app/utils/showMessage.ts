import { MessageType } from '../../../interfaces/general.interface'

export const showMessage = (
    message: string,
    messageType: MessageType, 
    setMainData: Function | undefined) => {

    if (setMainData) {
      setMainData('showMessageWindow', true);
      setMainData('message', message);
      setMainData('messageType', messageType);
    }
}