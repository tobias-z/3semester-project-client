import { fetchData, https } from "../apiUtils";
import { USER, INFO } from "../settings";

function login(credentials) {
  return fetchData(USER.LOGIN, https.POST, credentials).then((data) => {
    setToken(data.token);
    localStorage.setItem("user", credentials.username);
    return data;
  });
}



function getDataFromServer() {
  return fetchData(INFO.USER);
}

function loggedIn() {
  var token = this.AuthToken.getToken();
  return fetchData(USER.LOGIN + "/validate-token", https.GET, {Headers: {'x-access-token': token}})
}

const setToken = (token) => localStorage.setItem("jwtToken", token);
const getToken = () => localStorage.getItem("jwtToken");
const isLoggedIn = () => getToken() != null;
const logout = () =>
  localStorage.removeItem("jwtToken") + localStorage.removeItem("user");

export {
  setToken,
  getToken,
  isLoggedIn,
  login,
  logout,
  getDataFromServer,
};
