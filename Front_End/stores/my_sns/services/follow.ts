
import axios from "axios";
import HTTPS from '../../api';
// import { Wine } from "../reducers/feed_reducer";
export const userFollowService = {

    getUserFollowerList,
    followUser,
    UnfollowUser,
    getUserFollowList
}

async function getUserFollowerList(): Promise<Response> {

    return HTTPS.get('/follow/findByFollower', {
      params: {
        toUid : sessionStorage.getItem('uid')
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


  
async function followUser(uid : number) : Promise<Response> {
    return HTTPS.post('/follow/create',null, {
      params :{ 
            toUid : uid
      }, headers : {
          TOKEN : localStorage.getItem('token')
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
  
  
  
  async function UnfollowUser(uid : number) : Promise<Response> {
    return HTTPS.delete('/follow/delete', {
      params :{ 
            toUid : uid
      }, headers : {
          TOKEN : localStorage.getItem('token')
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
  
  
  


async function getUserFollowList(): Promise<Response> {

    return HTTPS.get('/follow/findByFollowing', {
      params: {
        fromUid : sessionStorage.getItem('uid')
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
        sessionStorage.setItem(
          "userFollow", JSON.stringify(response.data)
        );
        
        return response;
      })
      .catch(() => {
        return Promise.reject('Backend not reachable');
  
      })
  
  }
  


  