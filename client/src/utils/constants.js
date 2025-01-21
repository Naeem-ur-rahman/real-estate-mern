export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/signin`;
export const GOOGLE_AUTH = `${AUTH_ROUTES}/google`;

export const USER_ROUTES = `/api/user`;
export const UPDATE_USER_ROUTE = `${USER_ROUTES}/update`;