import axios from 'axios';
import HTTPS from '../../../api';

interface contents {
  content: any,
  rating: any,
  title: any,
  wid: any
}


async function writePost({content, rating, title, wid}:contents) : Promise<Response>{
  let data = JSON.stringify({
    content: content,
      rating: 10,
      title: title,
      wid: 10
  })
  let url = '/feed/create'
  return HTTPS.post(url, data, {
    headers : { 
      'TOKEN' : localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=utf-8'
      }
  })

    .then(function (response: Response | any) {
      if (!response) {
        return Promise.reject(response.statusText);

      }
      return response.data as any;
    })
    .catch((e) => {
      return Promise.reject('Backend not reachable');
    })
}

async function updatePost({content, rating, title, wid}:contents, fid:number) : Promise<Response>{
  let data = JSON.stringify({
    content: content,
      rating: 10,
      title: title,
      wid: 10
  })
  let url = '/feed/update'
  return HTTPS.post(url, data, {
    params: {
      fid: fid
    },
    headers : { 
      'TOKEN' : localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=utf-8'
      }
  })

    .then(function (response: Response | any) {
      if (!response) {
        return Promise.reject(response.statusText);

      }
      return response.data as any;
    })
    .catch((e) => {
      return Promise.reject('Backend not reachable');

    })

}

export default {writePost, updatePost};
