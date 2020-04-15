
import axios from "axios";
import HTTPS from '../../api';
// import { Wine } from "../reducers/feed_reducer";
export const friendInfoService = {
  getFriendInfo
}

async function getFriendInfo(uid : number): Promise<Response> {

  return HTTPS.get('/user/findByUid', {
    
    params: {
      uid : uid
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

