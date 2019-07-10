import axios from 'axios';

const Data = (callback) => {
  const url = 'http://192.168.184.172:8001/form';
  axios.get(url)
    .then((response) => {
      callback(response.data);
    });
  // .catch((error) => {
  //   console.log(error);
  // });
};

export default Data;
