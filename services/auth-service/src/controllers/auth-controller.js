import {generateJwt} from "../utils/jwt.js";
import { config } from '../config/config.js';
import { userModel } from "../models/user.js";
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
import { resolveSoa } from "dns";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicKeyPath = path.resolve(__dirname, '../../keys/public.key');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

export const googleCallbackHandler = async(req, res) => {
    const user = req.user;
    const token = generateJwt({
        userId: user._id,
        email: user.email,
        role: user.role
    });
    res.cookie("occupix", token, {
        httpOnly: true,
        secure: config.nodeEnv==='production',
        sameSite: config.nodeEnv==='production' ? 'None' : 'Lax',
        path: '/',
        maxAge: 60*60*1000
    })
    return res.redirect(config.frontendBaseUrl);
}

export const userInfoHandler = async(req, res) => {
    try{
        const token = req.cookies?.occupix;
        if(!token){
            return res.status(401).json({error: "Token not found"});
        }
        const decoded = jwt.verify(token, publicKey, {algorithms: ['RS256']});
        const user = await userModel.findById(decoded.userId);
        if(!user){
            return res.status(401).json({error: 'User not found'});
        }
        return res.status(200).json({message: 'User is authorized', user});
    }
    catch(e){
        console.error('Error in user info handler: ',e);
        return res.status(401).json({error: 'Invalid or expired token'});
    }
}

export const logoutHandler = (req, res) => {
    res.clearCookie("occupix", {
        httpOnly: true,
        secure: config.nodeEnv==='production',
        sameSite: config.nodeEnv==='production' ? 'None' : 'Lax',
        path: '/'
    });
    return res.status(200).json({message: "Logged out successfully"});
}