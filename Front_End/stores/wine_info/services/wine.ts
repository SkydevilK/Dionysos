
import axios from "axios";
import HTTPS from '../../api';
import { Wine } from "../reducers/wine_reducer";
export const wineService = {
  getWineListByType,
  getWineListByNameList,
  searchWineByName,
  getWineUseList,
  searchWineByFood
}

async function getWineListByType(type: string): Promise<Response> {

  return HTTPS.get('/wine/fineAll/' + type, {
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


async function getWineListByNameList(names : string[]): Promise<Response> {
 
  let query = "country=" + names[0];
  for(var i =1; i<names.length; i++){
     query += "&country=" + names[i];                                      
  }

  return HTTPS.get('/wine/search?' + query, {
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



async function getWineUseList(countries : string[], names : string[]): Promise<Response> {

  let query1 = "";
  if(countries.length == 0) {
    query1 = "";
  } else {
      query1 = "country=" + countries[0];
    for(var i =1; i<countries.length; i++){
      query1 += "&country=" + countries[i];                                      
   }
  }

  let url = '';
  let url2 = '';

  let query2 = "use=" + names[0];
  if(countries.length == 0) {
    for(var i =1; i<names.length; i++){
      query2 += "&use=" + names[i];                                      
   }
  } else {
    query2 = "&use=" + names[0];
    for(var i =1; i<names.length; i++){
      query2 += "&use=" + names[i];                                      
   }
  }
 
  

  return HTTPS.get('/wine/search?' + query1 + query2, {
    params : {

    },
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



async function searchWineByName(name : string): Promise<Response> {
 
  return HTTPS.get('/wine/findByName/' + name
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



async function searchWineByFood(name : string): Promise<Response> {
 
  return HTTPS.get('/wine/findByFoodMatch/' + name
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