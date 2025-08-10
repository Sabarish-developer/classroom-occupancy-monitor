import express from 'express';
import cookieParser from 'cookie-parser';
import {config} from './config/config.js';
import connectDB from './config/db.js';
import router from './routes/auth-routes.js';
import passport from 'passport';
import './utils/passport.js';
import jwksRouter from './routes/jwks-routes.js';
import rateLimiter from './utils/rate-limiters.js';
import cors from 'cors';

const app = express();

// Security middleware cors,helmet to be added
app.use(cors({
    origin: config.frontendBaseUrl,
    credentials: true
}));

// Parsing middleware
app.use(cookieParser());
app.use(express.json());

// Init the auth
app.use(passport.initialize());

// Routes with rate limiter
app.use('/api/auth', router);
app.use('/', rateLimiter, jwksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status || 500).json({error: err.message || "Internal server error"});
})

const startAuthService = async() => {
    await connectDB();
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Auth service is running at port ${PORT}`);
    })
}

startAuthService();