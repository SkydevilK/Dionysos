
import axios from "axios";
import HTTPS from '../../api';
// import { Wine } from "../reducers/feed_reducer";
export const userFeedService = {
  getUserFeedList
}

async function getUserFeedList(type : string): Promise<Response> {

  return HTTPS.get('/feed/findByUser', {
    
    params: {
      type : type,
      uid : sessionStorage.getItem('uid')
    },
    headers: {
      'TOKEN' : localStorage.getItem('token'),
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