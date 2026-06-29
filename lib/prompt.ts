export const ACADEMIC_PROMPT = `

Analyze this image for academic learning.

Return ONLY JSON:

{
"objects":[],
"context":"",
"activities":"",
"recommendations":""
}

`;


export const SAFETY_PROMPT = `

Analyze this image for safety hazards.

Return ONLY JSON:

{
"objects":[],
"context":"",
"activities":"",
"recommendations":""
}

`;


export const INVENTORY_PROMPT = `

Analyze this image as an inventory system.

Identify items.

Return ONLY JSON:

{
"objects":[],
"context":"",
"activities":"",
"recommendations":""
}

`;