const USER_BASE = "https://ditlevsoftware.com/tomcat/insession-sem-project/api";
const INFO_BASE =
  "https://ditlevsoftware.com/tomcat/insession-sem-project/api/info";
const RESTAURANT_BASE =
  "https://ditlevsoftware.com/tomcat/insession-sem-project/api/restaurants";

const USER = {
  LOGIN: `${USER_BASE}/login`,
  BASKET_ADD: `${USER_BASE}/basket/add/`,
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

export { USER, INFO, RESTAURANT };
