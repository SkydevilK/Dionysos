import HTTPS from '../../../api';

interface contents {
  content: any,
  rating: any,
  title: any,
  wid: any
}


async function writePost({content, rating, title, wid}:contents) : Promise<Response>{
  console.log('publish 받음')
  let data = JSON.stringify({
    content: content,
      rating: rating,
      title: title,
      wid: wid
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

export default writePost;
