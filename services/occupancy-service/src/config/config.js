import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, '../../.env')});

export const config = {
    port: process.env.PORT,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL
};