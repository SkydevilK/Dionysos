
import axios from "axios";
import HTTPS from '../../api';
// import { Wine } from "../reducers/feed_reducer";
export const userFeedService = {
  getUserFeedList
}

async function getUserFeedList(type : string, uid : number): Promise<Response> {

  return HTTPS.get('/feed/findByUser', {
    
    params: {
      type : type,
      uid : uid
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

