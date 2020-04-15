
import axios from "axios";
import HTTPS from '../../api';
export const wineMainService = {
    getWineTop5,
    getReviewTop5,
    getWineTop3
}


async function getWineTop3(type: string): Promise<Response> {

  return HTTPS.get('/wine/findRank/LIKE_3', {
  
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


async function getWineTop5(type : string): Promise<Response> {
  
  return HTTPS.get('/wine/findRank/VISIT_5', {
  
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


async function getReviewTop5(type : string): Promise<Response> {
  
  return HTTPS.get('/feed/ReviewRank/LIKE_5', {
 
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
