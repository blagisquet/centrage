import axios from 'axios';

const Data = (callback) => {
  const url = "http://192.168.184.172:8001/form"
  axios.get(url)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}

export default Data;
