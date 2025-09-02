import { createRemoteJWKSet, jwtVerify } from 'jose';
import { URL } from 'url';
import { config } from '../config/config.js';

const JWKS_URL = new URL(config.jwksRoute); // jwks route to get public key from auth-service
const JWKS = createRemoteJWKSet(JWKS_URL);

export const verifyJwt = async (token) => {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
      algorithms: ['RS256']
    });
    return { valid: true, payload, header: protectedHeader };
  } catch (err) {
    return { valid: false, error: err.message };
  }
};
