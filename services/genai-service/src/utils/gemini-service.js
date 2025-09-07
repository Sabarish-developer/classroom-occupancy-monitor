import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js";
import { getLocalCache } from "./cache.js";

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });


export async function geminiHandler(userPrompt) {

  const data = getLocalCache();
  if(!data){
    console.log('No room data from redis is loaded');
    return null;
  }
  try{
      const dataString = JSON.stringify(data);    
      const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ` Here is the occupancy data: ${dataString}. 
                  Collab is facultyroom, Rec Cafe is canteen, rest all classrooms.
                  Answer shortly this question based on above data with reason: ${userPrompt}.
                  Give only text, no markdown.
                `,
      config: { thinkingConfig: { thinkingBudget: 0 } }
      });
      return response.text;
  }
  catch(err){
      console.error('Error calling gemini API: ', err.message);
      return null;
  }
}

