
import axios from "axios";
import HTTPS from '../../api';
// import { Wine } from "../reducers/feed_reducer";
export const feedAllService = {
  getFeedAll
}

async function getFeedAll(): Promise<Response> {

  return HTTPS.get('/feed/findAll?type=REVIEW', {

    headers: {
      'Access-Control-Allow-Origin': "*",
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


async function getWineListByName(name : string): Promise<Response> {
  return HTTPS.get('/wine/readByName', {
    params: {
      name : name
    },
    headers: {
      'Access-Control-Allow-Origin': "*",
    }
  }
  )
    .then(function (response: Response | any) {

      if (!response) {
        return Promise.reject(response.statusText);

      }

      return response.data;
    })
    .catch(() => {
      return Promise.reject('Backend not reachable');

    })

}