
import axios from "axios";
import HTTPS from '../../api';
export const registerService = {
  register,
  emailCheck,
  SNSRegister
}

// 회원 가입 함수
async function register(nickname : string, email : string, password: string): Promise<Response> {

    return HTTPS.post('/user/signup',null, {
      params :{ 
              email : email,
              nickName : nickname,
              password : password,  
      }
    }
  )
    .then(function (response: Response | any) {
      
      if (!response) {
        return Promise.reject(response.statusText);
      
     }
     

     return response.data.success;
    })
    .catch((e) => {

      return Promise.reject('Backend not reachable');
     
    })
    
}



async function SNSRegister(nickname : string, id : string, provider : string): Promise<Response> {

  return HTTPS.post('/user/sns/signup',null, {
    params : {
      nickName : "Hello",
      sns_id : id,
      snsType : provider
    },
  }
  )
  .then(function (response: Response | any) {
    
    if (!response) {
      return Promise.reject(response.statusText);
    
   }
   
   return response.data.success;
  })
  .catch((e) => {

    return Promise.reject('Backend not reachable');
   
  })
  
}


// 이메일 중복 체크 함수
async function emailCheck(email : string): Promise<Response> {
  return HTTPS.post('/user/checkEmail',null, {
    params :{ 
       email : email
    }
  }
)
  .then(function (response: Response | any) {
    
    if (!response) {
      return Promise.reject(response.statusText);
    
   };

   return response.data.success;
  })
  .catch((e) => {

    return Promise.reject('Backend not reachable');
   
  })
  
}


