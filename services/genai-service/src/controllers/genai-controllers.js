import { geminiHandler } from "../utils/gemini-service.js";
import { eventLogger } from "../utils/analytics-logger.js";

export const promptHandler = async(req, res) => {
    const {prompt} = req.body;
    if(!prompt){
        return res.status(404).json({message: 'Prompt is required'});
    }
    const response = await geminiHandler(prompt);
    eventLogger(req.user.userId);
    if(!response){
        console.log('Ai failed to answer');
        return res.status(200).json({message: 'AI model failed to answer. Please try again later.'});
    }
    console.log('AI model answered successfully');
    return res.status(200).json({response: response});
}