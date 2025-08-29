import express from 'express';
import { config } from './config/config.js'; // environment variables
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/genai-routes.js';

const app = express();

//Security middleware
app.use(cors({
    origin: config.frontendBaseUrl,
    credentials: true
}));

//Parsing middleware
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/api/genai', router);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status || 500).json({message: err.message || 'Internal server error'});
});

const startGenaiService = () => {
    const PORT = config.port || 5002;
    app.listen(PORT, () => {
        console.log(`Genai Service is running on port ${PORT}`);
    })
};

startGenaiService();