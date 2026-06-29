import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
  
  
  import {
    useEffect,
    useState
} from "react";
  
  
  import {
    analyzeImage
} from "../lib/gemini";
  
  
  import {
    ACADEMIC_PROMPT,
    INVENTORY_PROMPT,
    SAFETY_PROMPT
} from "../lib/prompt";
  
  
  
  
  
  export default function ResultScreen({
    route
  }:any){
  
  
    const {
      photoUri,
      type
    } = route.params;
  
  
  
    const [loading,setLoading] =
    useState(true);
  
  
  
    const [result,setResult] =
    useState<any>(null);
  
  
  
  
  
  
    async function imageToBase64(
      uri:string
    ){
  
      const response =
      await fetch(uri);
  
  
      const blob =
      await response.blob();
  
  
  
      return new Promise<string>(
        resolve=>{
  
  
          const reader =
          new FileReader();
  
  
  
          reader.onloadend = ()=>{
  
  
            const base64 =
            reader.result
            ?.toString()
            ?.split(",")[1];
  
  
  
            resolve(
              base64 || ""
            );
  
  
          };
  
  
  
          reader.readAsDataURL(blob);
  
  
        }
      );
  
  
    }
  
  
  
  
  
  
  
    async function runAnalysis(){
  
  
      let prompt:string =
      ACADEMIC_PROMPT;
  
  
  
      if(type==="safety"){
  
        prompt =
        SAFETY_PROMPT;
  
      }
  
  
  
      if(type==="inventory"){
  
        prompt =
        INVENTORY_PROMPT;
  
      }
  
  
  
  
  
      try{
  
  
        const base64 =
        await imageToBase64(
          photoUri
        );
  
  
  
  
        const response =
        await analyzeImage(
          base64,
          prompt
        );
  
  
  
        console.log(
          "Gemini Response:",
          response
        );
  
  
  
  
        const text =
        response
        ?.candidates?.[0]
        ?.content
        ?.parts?.[0]
        ?.text;
  
  
  
  
  
        const clean =
        (text ?? "")
        .replace(
          /```json|```/g,
          ""
        );
  
  
  
  
  
        if(clean){
  
  
          setResult(
            JSON.parse(clean)
          );
  
  
  
        }else{
  
  
          setResult({
  
            objects:[
              "No result"
            ],
  
  
            context:
            "Gemini returned empty response",
  
  
            activities:"",
  
  
            recommendations:
            "Try again"
  
          });
  
  
        }
  
  
  
  
  
  
      }catch(error){
  
  
        console.log(
          "Analysis Error:",
          error
        );
  
  
  
        setResult({
  
          objects:[
            "Analysis failed"
          ],
  
  
          context:
          "Gemini quota exceeded or network error",
  
  
          activities:"",
  
  
          recommendations:
          "Please try again later"
  
        });
  
  
  
      }
  
  
  
  
      setLoading(false);
  
  
  
    }
  
  
  
  
  
  
  
    useEffect(()=>{
  
  
      runAnalysis();
  
  
    },[]);
  
  
  
  
  
  
  
    return (
  
      <ScrollView
        style={styles.container}
      >
  
  
  
        <Text style={styles.title}>
  
  
          {
            type==="academic"
            ?
            "Academic Analysis"
            :
            type==="safety"
            ?
            "Safety Analysis"
            :
            "Inventory Analysis"
          }
  
  
        </Text>
  
  
  
  
  
        <Image
  
          source={{
            uri:photoUri
          }}
  
          style={styles.image}
  
        />
  
  
  
  
  
  
  
        {
          loading ?
  
  
          (
  
            <View style={styles.loading}>
  
  
              <ActivityIndicator
                size="large"
              />
  
  
              <Text>
                Gemini analyzing...
              </Text>
  
  
            </View>
  
  
          )
  
          :
  
  
          (
  
            <View>
  
  
  
  
              <Text style={styles.section}>
                Objects
              </Text>
  
  
  
              {
                result?.objects?.map(
  
                  (
                    item:string,
                    index:number
  
                  )=>(
  
  
                    <Text
                      key={index}
                      style={styles.text}
                    >
  
                      • {item}
  
                    </Text>
  
  
                  )
  
                )
              }
  
  
  
  
  
  
              <Text style={styles.section}>
                Context
              </Text>
  
  
  
              <Text style={styles.text}>
                {result?.context}
              </Text>
  
  
  
  
  
  
  
              <Text style={styles.section}>
                Activities
              </Text>
  
  
  
              <Text style={styles.text}>
                {result?.activities}
              </Text>
  
  
  
  
  
  
  
              <Text style={styles.section}>
                Recommendations
              </Text>
  
  
  
  
              <Text style={styles.text}>
                {result?.recommendations}
              </Text>
  
  
  
  
            </View>
  
  
          )
  
        }
  
  
  
  
  
      </ScrollView>
  
    );
  
  }
  
  
  
  
  
  
  
  const styles =
  StyleSheet.create({
  
  
  
  container:{
  
   flex:1,
  
   backgroundColor:"#fff",
  
   padding:20
  
  },
  
  
  
  
  title:{
  
   fontSize:25,
  
   fontWeight:"bold",
  
   textAlign:"center",
  
   marginBottom:20
  
  },
  
  
  
  
  
  image:{
  
   width:"100%",
  
   height:300,
  
   borderRadius:10,
  
   marginBottom:20
  
  },
  
  
  
  
  
  loading:{
  
   alignItems:"center",
  
   marginTop:30
  
  },
  
  
  
  
  
  section:{
  
   fontSize:20,
  
   fontWeight:"bold",
  
   marginTop:20,
  
   marginBottom:10
  
  },
  
  
  
  
  
  text:{
  
   fontSize:16,
  
   marginBottom:8
  
  }
  
  
  
  });