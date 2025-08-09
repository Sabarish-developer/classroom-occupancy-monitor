import { verifyJwt } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({error: "No token found"});

        const {valid, decoded, error} = verifyJwt(token);
        if(valid){
            req.user = decoded;
            next();
        }
        else throw new Error(error || "Token invalid");
    }
    catch(e){
        if(e.name === "TokenExpiredError")
            return res.status(401).json({error: "Token expired. Please login again"});
        else
            return res.status(401).json({error: "Token invalid"});
    }
}

export default authMiddleware;