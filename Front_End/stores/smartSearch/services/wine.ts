
import axios from "axios";
import HTTPS from '../../api';
import { Wine } from "../reducers/wine_reducer";
export const wineService = {
  getSmartSearch,
  getSmartSearchByName
}

async function getSmartSearch(alcohol : number, country : string, sparkling : boolean, sweet : number, type: string): Promise<Response> {

  return HTTPS.get('/wine/smartSearch', {
    params: {
      alcohol : alcohol,
      country : country,
      sparkling : sparkling,
      sweet : sweet,
      type : type
    }
  }
  )
    .then(function (response: Response | any) {

      if (!response) {
        return Promise.reject(response.statusText);

      }

      return response.data as any;
    })
    .catch(() => {
      return Promise.reject('Backend not reachable');

    })

}

async function getSmartSearchByName(name : string): Promise<Response> {
  return HTTPS.get('/wine/findByName/' + name
  )
  .then(function (response: Response | any) {

      if (!response) {
        return Promise.reject(response.statusText);

      }
      return response.data as any;
    })
    .catch(() => {
      return Promise.reject('Backend not reachable');

    })

}