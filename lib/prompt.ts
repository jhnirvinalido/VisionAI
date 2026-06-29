export const ACADEMIC_PROMPT = `

Analyze this image for academic purposes.

Return ONLY JSON.

Objects must be an array of strings.

{
"objects":["book","laptop"],
"context":"describe the scene",
"activities":"what is happening",
"recommendations":"suggestion"
}

`;



export const SAFETY_PROMPT = `

Analyze this image for safety.

Check hazards, dangerous objects, risks, and safety concerns.

Return ONLY JSON.

Objects must be an array of strings.

{
"objects":["hazard","person"],
"context":"describe the safety situation",
"activities":"what is happening",
"recommendations":"safety advice"
}

`;



export const INVENTORY_PROMPT = `

Analyze this image as inventory.

Identify all visible items.

Return ONLY JSON.

Objects must be an array of strings.

{
"objects":["item1","item2"],
"context":"inventory description",
"activities":"usage or condition",
"recommendations":"inventory suggestion"
}

`;