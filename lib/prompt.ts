export const ANALYSIS_PROMPT = `

Analyze this image carefully.

Return ONLY valid JSON.

Structure:

{
 "objects": [
   "object 1",
   "object 2"
 ],
 "context": "describe the scene",
 "activities": "what is happening",
 "recommendations": "give useful advice"
}

Rules:

- Do not add markdown
- Do not add explanation
- Only JSON

`;