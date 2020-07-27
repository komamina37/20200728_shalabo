// console.log(process.env.MCMS_SPACE_ID);
// console.log(process.env.MCMS_ACCESS_TOKEN);

import axios from "axios";
const microcms = axios.create({
  baseURL: `${process.env.MCMS_SPACE_ID}/api/v1/`,
  headers: {
    "X-API-KEY": process.env.MCMS_ACCESS_TOKEN
  }
});
export default microcms;
