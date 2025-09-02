import express from 'express';
import { config } from './config/config.js'; // environment variables
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/analytics-routes.js';
import appInsights from 'applicationinsights';

//Initialize app insights
appInsights.setup(config.azureAppInsightsConnectionString)
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectPerformance(true)
    .setInternalLogging(true, true) 
    .start();
export const telemetryClient = appInsights.defaultClient;

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
app.use('/api/analytics', router);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status || 500).json({message: err.message || 'Internal server error'});
});

const startAnalyticsService = () => {
    const PORT = config.port || 5003;
    app.listen(PORT, () => {
        console.log(`Analytics Service is running on port ${PORT}`);
    })
};

startAnalyticsService();