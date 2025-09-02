import {telemetryClient} from '../index.js';
import { runAnalytics } from '../utils/azure-service.js';

const BUFFER_LIMIT = 3;
let eventBuffer = [];
let metricBuffer = [];

const flushEvents = () => {
    eventBuffer.forEach((ev) => {
        telemetryClient.trackEvent(ev);
    });
    eventBuffer = [];
    telemetryClient.flush();
}

const flushMetrics = () => {
    metricBuffer.forEach((m) => {
        telemetryClient.trackMetric(m);
    });
    metricBuffer = [];
    telemetryClient.flush();
}

export const trackEventHandler = async(req, res) => {

    const {name, properties} = req.body;
    if(!name || !properties){
        return res.status(400).json({message: 'Name and property is required to log'});
    }

    const newProperties = Object.fromEntries(
        Object.entries(properties).map(([k, v]) => [String(k), String(v)])
    );
    eventBuffer.push({name, properties: newProperties});

    if(eventBuffer.length >= BUFFER_LIMIT){
        flushEvents();
    }

    res.status(200).json({message: 'event buffered'});

}

export const trackMetricHandler = async(req, res) => {

    const {name, value} = req.body;
    if(!name || typeof value === 'undefined'){
        return res.status(400).json({message: 'Name and value is required to log'});
    }

    metricBuffer.push({name, value: Number(value)});

    if(metricBuffer.length >= BUFFER_LIMIT){
        flushMetrics();
    }

    res.status(200).json({message: 'metric buffered'});
}

export const adminDataHandler = async(req, res) => {
    try{
        const data = await runAnalytics();
        console.log(data);
        return res.status(200).json({message: 'Data fetched successfully', data});
    }
    catch(e){
        console.error('Error fetching log data: ', e.message);
    }
}