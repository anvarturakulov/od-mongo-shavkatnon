import { ReferenceModel, TypeReference } from '@/app/interfaces/reference.interface';
import { showMessage } from '@/app/service/common/showMessage';
import { updateCreateReference } from '@/app/service/references/updateCreateReference';

export const cancelSubmit = (setMainData: Function | undefined) => {
    if (setMainData) {
        setMainData('clearControlElements', true);
        setMainData('showReferenceWindow', false);
        setMainData('isNewReference', false);
    }
}

export const onSubmit = (
    body: ReferenceModel,
    typeReference: TypeReference, 
    isNewReference: boolean, 
    setMainData: Function| undefined,
    token: string | undefined) => {
    if (typeReference == TypeReference.TMZ && body.typeTMZ == undefined) {
        showMessage('ТМБ турини танланг', 'error', setMainData);
        return
    }
    
    if (body.name.trim().length != 0) {
        updateCreateReference(body, typeReference, isNewReference, setMainData, token);
    } else {
        showMessage('Номини тулдиринг', 'error', setMainData);
    }
}