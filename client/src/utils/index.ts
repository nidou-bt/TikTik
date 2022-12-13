import axios from "axios";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "./constants";

export const createOrGetUser = async (response: any, addUser: any) => {
  // var base64Url = response.credential.split('.')[1];
  // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  // var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  // }).join(''));
  //   console.log('res', response)
  // const { name, picture, sub } = JSON.parse(jsonPayload)
  // const user = {
  //   _id: sub,
  //   _type: 'user',
  //   userName: name,
  //   image: picture,
  // };

  // addUser(user);
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
