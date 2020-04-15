
import axios from "axios";
import { Wine } from "../reducers/wine_reducer";
import HTTPS from '../../api';
import {loginService} from "../../login/services/login"
export const wineDetailService = {
  getWineDetail,
  createWineLike,
  deleteWineLike
}

async function getWineDetail(wid : number): Promise<Response> {

  return HTTPS.get('/wine/findByWid/' + wid, {
    
    // params: {
    //   type : type
    // },
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


async function createWineLike(wid : number): Promise<Response> {

  return HTTPS.post('/winelike/create', null, {
  params: {
    wid : wid
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

      loginService.likeWineByUser();
        
      return response.data as any;
    })
    .catch(() => {
      return Promise.reject('Backend not reachable');

    })

}



async function deleteWineLike(wid : number): Promise<Response> {

  return HTTPS.delete('/winelike/delete', {
    params: {
      wid : wid
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
      
        loginService.likeWineByUser();

      return response.data as any;
    })
    .catch(() => {
      return Promise.reject('Backend not reachable');

    })

}

