import HTTPS from '../../../api';

interface contents {
  content: any,
  rating: any,
  title: any,
  wid: any,
  fid: any,
}


async function deletePost({content, rating, title, wid, fid}:contents) : Promise<Response>{
  console.log('publish 받음')

  let url = '/feed/delete'
  return HTTPS.delete(url, {
    params:{
      fid: fid,
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

export default deletePost;
