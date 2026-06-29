const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;


const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;



// Convert image to Base64
export async function imageToBase64(uri:string){

  const response = await fetch(uri);

  const blob = await response.blob();


  return new Promise<string>((resolve,reject)=>{

    const reader = new FileReader();


    reader.onloadend = () => {

      const base64 =
        (reader.result as string)
        .split(",")[1];

      resolve(base64);

    };


    reader.onerror = reject;


    reader.readAsDataURL(blob);

  });

}




// Gemini Vision
export async function analyzeImage(
  base64Image:string,
  prompt:string
){

  const response = await fetch(GEMINI_URL,{

    method:"POST",

    headers:{
      "Content-Type":"application/json",
    },


    body:JSON.stringify({

      contents:[

        {
          parts:[

            {
              text:prompt
            },


            {
              inline_data:{

                mime_type:"image/jpeg",

                data:base64Image

              }
            }

          ]
        }

      ]

    })

  });



  const json = await response.json();


  return json;

}