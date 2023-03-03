import { config } from 'dotenv';

config();

export const DB_HOST = process.env.DB_HOST || '';
export const PORT = process.env.PORT || '';
export const HOST = process.env.HOST || '';
export const JWT_SECRET = process.env.JWT || '';
export const FRONT_HOST_DEV = process.env.FRONT_HOST_DEV || '';
export const FRONT_HOST_IP = process.env.FRONT_HOST_IP || '';
export const FRONT_HOST_PROD = process.env.FRONT_HOST_PROD || '';
export const FRONT_HOST_PROD_SSL = process.env.FRONT_HOST_PROD_SSL || '';
export const FRONT_HOST_PROD_WWW = process.env.FRONT_HOST_PROD_WWW || '';
export const FRONT_HOST_PROD_WWW_SSL = process.env.FRONT_HOST_PROD_WWW_SSL || '';
export const SCOPE_HOST = [
  FRONT_HOST_DEV,
  FRONT_HOST_IP,
  FRONT_HOST_PROD,
  FRONT_HOST_PROD_SSL,
  FRONT_HOST_PROD_WWW,
  FRONT_HOST_PROD_WWW_SSL,
];
