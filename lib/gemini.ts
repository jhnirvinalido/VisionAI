const GEMINI_KEY =
process.env.EXPO_PUBLIC_GEMINI_KEY;


const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;



export async function imageToBase64(
  uri:string
){

  const response =
  await fetch(uri);


  const blob =
  await response.blob();


  return new Promise<string>((resolve)=>{


    const reader =
    new FileReader();


    reader.onloadend = ()=>{


      const result =
      reader.result
      ?.toString();


      const base64 =
      result
      ?.split(",")[1];


      resolve(base64 || "");

    };


    reader.readAsDataURL(blob);


  });


}





export async function analyzeImage(
  base64Image:string,
  prompt:string
){


  try{


    const response =
    await fetch(

      GEMINI_URL,

      {

        method:"POST",

        headers:{

          "Content-Type":
          "application/json"

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

                    mime_type:
                    "image/jpeg",

                    data:
                    base64Image

                  }

                }


              ]

            }

          ]

        })

      }

    );



    const json =
    await response.json();



    if(!response.ok){

      console.log(
        "Gemini API Error:",
        json
      );

      return null;

    }



    return json;



  }catch(error){


    console.log(
      "Gemini Network Error:",
      error
    );


    return null;

  }

}