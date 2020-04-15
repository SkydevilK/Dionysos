
import axios from "axios";
import HTTPS from '../../api';
// import { Wine } from "../reducers/feed_reducer";
export const userFollowService = {

    getUserFollowerList,
    followUser,
    UnfollowUser,
    getUserFollowList
}

async function getUserFollowerList(uid : number): Promise<Response> {

    return HTTPS.get('/follow/findByFollower', {
      params: {
        toUid : uid
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
  
  
  


async function getUserFollowList(uid : number): Promise<Response> {

    return HTTPS.get('/follow/findByFollowing', {
      params: {
        fromUid : uid
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

        return response.data;
      })
      .catch(() => {
        return Promise.reject('Backend not reachable');
  
      })
  
  }
  


  