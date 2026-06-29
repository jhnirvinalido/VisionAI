export const ANALYSIS_PROMPT = `

Analyze this image.

Identify:

1. Objects - list the physical objects

2. Context - describe the scene

3. Activities - describe what is happening

4. Recommendations - give one suggestion


Respond ONLY JSON:

{
"objects":[""],
"context":"",
"activities":"",
"recommendations":""
}

`;