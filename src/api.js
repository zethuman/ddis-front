import axios from "axios";
import env from "react-dotenv";
// const config = {
//   headers: {
//     Authorization: `Bearer ${sessionStorage.getItem('$admin-token')}`
//   }
// }
const BACKEND_CORE = "http://localhost:4020";
// const BACKEND_DATA = env.BACKEND_DATA

export const getLocalImages = async () => {
  return axios
    .get(`${BACKEND_CORE}/docker/images/list`)
    .then((response) => response)
    .catch((err) => "err");
};

export const pushLocalImage = async (body) => {
  console.log("req body", body)
  return axios
    .post(`${BACKEND_CORE}/ipfs/images/push/`, body)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => "err");
};
// export const getLocalImages = async () => {
//   return axios
//     .get('http://localhost:9999/api/audio/test')
//     .then((response) => response)
//     .catch((err) => 'err')
// }
