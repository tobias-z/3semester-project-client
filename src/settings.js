const USER_BASE = "https://ditlevsoftware.com/tomcat/insession-sem-project/api";
const INFO_BASE =
  "https://ditlevsoftware.com/tomcat/insession-sem-project/api/info";
const RESTAURANT_BASE =
  "https://ditlevsoftware.com/tomcat/insession-sem-project/api/restaurants";
const BASKET_BASE =
  "https://ditlevsoftware.com/tomcat/insession-sem-project/api/basket";

const BASKET = {
  ADD: `${BASKET_BASE}/add/`,
  ACTIVE: `${BASKET_BASE}/active`,
  EDIT: `${BASKET_BASE}`,
};
const USER = {
  LOGIN: `${USER_BASE}/login`,
  SIGNUP: `${USER_BASE}/user`,
};

const INFO = {
  USER: `${INFO_BASE}/user`,
  ADMIN: `${INFO_BASE}/admin`,
  FETCH_MANY: `${INFO_BASE}/fetchMany`,
  FETCH_ONE: `${INFO_BASE}/fetchData`,
};

const RESTAURANT = {
  ALL: `${RESTAURANT_BASE}`,
};

const ORDER = {
  CREATE: `${USER_BASE}/order`,
};

export { USER, INFO, RESTAURANT, BASKET, ORDER };
