import axios from 'axios';
import url from './config';

const Data = (callback) => {
  const urlData = `${url}/form`;
  axios.get(urlData)
    .then((response) => {
      callback(response.data);
    });
  // .catch((error) => {
  //   console.log(error);
  // });
};

export default Data;
