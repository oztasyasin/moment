import BaseUrl from '../../BaseUrl';
import axios from 'axios';
let token = "token";
export const GetAll = () => {
  var config = {
    method: 'get',
    url: BaseUrl + "/GetAll",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "bearer " + token
    },
  };

  return axios(config)
}