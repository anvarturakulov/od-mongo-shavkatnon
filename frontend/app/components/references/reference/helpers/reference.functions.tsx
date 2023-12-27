import { ReferenceBody, TypeReference } from '@/app/interfaces/reference.interface';
import { updateCreateReference } from '@/app/service/references.service';
import { showMessage } from '@/app/service/showMessage';

export const cancelSubmit = (setMainData: Function | undefined) => {
    if (setMainData) {
        setMainData('clearControlElements', true);
        setMainData('showReferenceWindow', false);
        setMainData('isNewReference', false);
    }
}

export const onSubmit = (
    body: ReferenceBody, 
    id: string | undefined, 
    typeReference: TypeReference, 
    isNewReference: boolean, 
    setMainData: Function| undefined,
    token: string | undefined) => {
    if (typeReference == TypeReference.TMZ && body.typeTMZ == '') {
        showMessage('ТМБ турини танланг', 'error', setMainData);
        return
    }
    
    if (body.name.trim().length != 0) {
        updateCreateReference(body, id, typeReference, isNewReference, setMainData, token);
    } else {
        showMessage('Номини тулдиринг', 'error', setMainData);
    }
}