import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // to convert the es-file path to normal file path

const __filename = fileURLToPath(import.meta.url); // get current file path 
const __dirname = path.dirname(__filename); // get current directory of this file

dotenv.config({path: path.resolve(__dirname, '../../.env')}); // It tells go two folders up from __dirname (reliable as it is absolute path)
// if we give just dotenv.config({path: '../../.env'}) - causes error because node doesn't do two folders up from this file
// it goes two folders up wherever we give run command

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL,
    nodeEnv: process.env.NODE_ENV,
    analyticsUrl: process.env.ANALYTICS_URL,
    serviceJwtSecret: process.env.SERVICE_JWT_SECRET
}