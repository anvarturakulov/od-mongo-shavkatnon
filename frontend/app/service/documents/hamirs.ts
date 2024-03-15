import { Maindata } from '@/app/context/app.context.interfaces';
import { HamirModel } from '@/app/interfaces/hamir.interface';

export const createHamirsForDayByUser = (date: number, mainData: Maindata, setMainData: Function | undefined) => {
  const { user } = mainData

  let body: HamirModel = {
    date,
    sectionId,
    sectionId
  }

  delete body._id;
  const config = {
    headers: { Authorization: `Bearer ${user?.access_token}` }
  };

  const actionWithMainData = (mes: string) => {
    if (setMainData) {
      showMessage(`${mes}`, 'success', setMainData)
      setMainData('clearControlElements', true);
      setMainData('showDocumentWindow', false);
      setMainData('isNewDocument', false);
      setMainData('currentDocument', { ...defaultDocumentFormItems });
      setMainData('mainPage', true);
    }
  }

  const uriPost = process.env.NEXT_PUBLIC_DOMAIN + '/api/document/create';
  const uriPatch = process.env.NEXT_PUBLIC_DOMAIN + '/api/document/' + currentDocument._id;

  if (isNewDocument) {
    axios.post(uriPost, body, config)
      .then(function (request) {
        actionWithMainData('янги хужжати киритилди')
      })
      .catch(function (error) {
        if (setMainData) {
          showMessage(error.message, 'error', setMainData)
        }
      });
  } else {
    if (currentDocument._id) {
      axios.patch(uriPatch, body, config)
        .then(function () {
          actionWithMainData('хужжат янгиланди')
          return true
        })
        .catch(function (error) {
          if (setMainData) {
            showMessage(error.message, 'error', setMainData)
            return false
          }
        });
    };
  }
}