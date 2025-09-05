import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import computeKeyId from './key-id.js';
import { config } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fallbackPprivateKeyPath = path.resolve(__dirname, '../../keys/private.key');
const privateKeyPath = config.privateKeyPath || fallbackPprivateKeyPath
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKeyPath = path.resolve(__dirname, '../../keys/public.key');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const publicKeyId = computeKeyId(publicKey);

export const generateJwt = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
        header: {
            kid: publicKeyId
        }
    });
}


