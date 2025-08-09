import {generateJwt} from "../utils/jwt.js";
import { config } from '../config/config.js';

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

export const logoutHandler = (req, res) => {
    res.clearCookie("occupix", {
        httpOnly: true,
        secure: config.nodeEnv==='production',
        sameSite: config.nodeEnv==='production' ? 'None' : 'Lax',
        path: '/'
    });
    return res.status(200).json({message: "Logged out successfully"});
}