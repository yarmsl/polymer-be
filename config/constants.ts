import { config } from "dotenv";

config();

export const DB_HOST = process.env.DB_HOST as string;
export const PORT = process.env.PORT as string;
export const HOST = process.env.HOST as string;
export const JWT_SECRET = process.env.JWT as string;
export const FRONT_HOST_DEV = process.env.FRONT_HOST_DEV as string;
export const FRONT_HOST_IP = process.env.FRONT_HOST_IP as string;
export const FRONT_HOST_PROD = process.env.FRONT_HOST_PROD as string;
export const FRONT_HOST_PROD_SSL = process.env.FRONT_HOST_PROD_SSL as string;
export const SCOPE_HOST = [
  FRONT_HOST_DEV,
  FRONT_HOST_IP,
  FRONT_HOST_PROD,
  FRONT_HOST_PROD_SSL,
];
