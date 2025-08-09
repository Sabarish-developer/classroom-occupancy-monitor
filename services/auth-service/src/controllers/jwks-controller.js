import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import computeKeyId from "../utils/key-id.js";
import { importSPKI, exportJWK } from 'jose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicKeyPath = path.resolve(__dirname, '../../keys/public.key');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
const publicKeyId = computeKeyId(publicKey);

export const jwksHandler = async(req, res) => {
    try{
        const key = await importSPKI(publicKey, 'RS256');  // converts publicKey PEM to crytpo object so that it can work with
        const jwk = await exportJWK(key);                  // converts the crytpo object to readable json format (add n-modulus, e-exponent)
        jwk.kid = publicKeyId;
        jwk.use = 'sig';
        jwk.alg = 'RS256';

        return res.status(200).json({keys: [jwk], message: "Keys retrieved successfully"});
    }
    catch(e){
        console.error(e);
        return res.status(500).json({error: "Error generating jwks"});
    }
}