import axios from "axios";
import Loading from "./shared/Loading";

const BACKEND_CORE = process.env.REACT_APP_BACKEND_CORE;
const BACKEND_DATA = process.env.REACT_APP_BACKEND_DATA;

export const getLocalImages = async () => {
  return axios
    .get(`${BACKEND_CORE}/docker/images/list`)
    .then((response) => response)
    .catch((err) => "err");
};

export const localPushedImages = async () => {
  return axios
    .post(`${BACKEND_CORE}/ipfs/images/`)
    .then((response) => {
      return response;
    })
    .catch((err) => "err");
};

export const pushLocalImage = async (body) => {
  return axios
    .post(`${BACKEND_CORE}/ipfs/images/push/`, body)
    .then((response) => {
      return response;
    })
    .catch((err) => "err");
};

export const postLocalImage = async (body) => {
  return axios
    .post(`${BACKEND_DATA}/images/post`, body)
    .then((response) => {
      return response;
    })
    .catch((err) => "err");
};

// export const getCommunityImage = async (body) => {
//   console.log(body);
//   let res;
//   try {
//     res = await axios.post(`${BACKEND_DATA}/images/get`, body);
//   } catch (err) {
//     console.error("Error response:");
//     console.log(err.response)
//     return err
//     // console.error(err.response.data); // ***
//     // console.error(err.response.status); // ***
//     // console.error(err.response.headers); // ***
//   } finally {
//     console.log(res);
//     return res
//   }
//   // .then((response) => {
//   //   // console.log("response", response);
//   //   // console.log("response.body", response.body);
//   //   return response;
//   // });
//   // .catch((err) => "err");
// };

export const getCommunityImage = async (body) => {
  return axios
    .post(`${BACKEND_DATA}/images/get`, { ...body })
    .then((response) => response)
    .catch((err) => {
      console.log(err);
      return { data: { data: "404" } };
    });
};

export const deleteCommunityImage = async (body) => {
  console.log("del body", body);
  return axios
    .delete(`${BACKEND_DATA}/images/delete`, { data: body })
    .then((response) => {
      console.log("delete response", response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { data: { data: "404" } };
    });
};

export const pullCommunityImage = async (body) => {
  return axios
    .post(`${BACKEND_CORE}/ipfs/images/pull/hash/`, body)
    .then((response) => {
      return response;
    });
};

export const loadingRequest = async (body) => {
  return axios
    .get("http://localhost:9999/api/audio/loading")
    .then((response) => response)
    .catch((err) => "err");
};
// export const getLocalImages = async () => {
//   return axios
//     .get('http://localhost:9999/api/audio/test')
//     .then((response) => response)
//     .catch((err) => 'err')
// }
