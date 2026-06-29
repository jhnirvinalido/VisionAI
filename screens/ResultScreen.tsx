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
  
  
  
          reader.onloadend=()=>{
  
  
            const base64 =
            reader.result
            ?.toString()
            ?.split(",")[1];
  
  
            resolve(base64 || "");
  
          };
  
  
          reader.readAsDataURL(blob);
  
  
        }
      );
  
    }
  
  
  
  
  
  
    async function runAnalysis(){
  
  
  
      let prompt =
      ACADEMIC_PROMPT;
  
  
  
      if(type==="safety"){
        prompt = SAFETY_PROMPT;
      }
  
  
  
      if(type==="inventory"){
        prompt = INVENTORY_PROMPT;
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
          "AI RESPONSE:",
          response
        );
  
  
  
        const text =
        response
        ?.candidates?.[0]
        ?.content
        ?.parts?.[0]
        ?.text || "";
  
  
  
  
        const clean =
        text.replace(
          /```json|```/g,
          ""
        );
  
  
  
  
        try{
  
  
          setResult(
            JSON.parse(clean)
          );
  
  
        }catch{
  
  
          setResult({
  
            objects:[
              "Detected objects unavailable"
            ],
  
            context:
            text ||
            "No AI response",
  
            activities:
            "No activity information",
  
            recommendations:
            "Try another image"
  
          });
  
        }
  
  
  
  
  
      }catch(error){
  
  
        console.log(
          "Analysis error:",
          error
        );
  
  
        setResult({
  
          objects:[
            "Analysis failed"
          ],
  
          context:
          "Gemini service unavailable",
  
          activities:
          "",
  
          recommendations:
          "Please try again"
  
        });
  
  
      }
  
  
  
  
      setLoading(false);
  
  
    }
  
  
  
  
  
  
  
    useEffect(()=>{
  
      runAnalysis();
  
    },[]);
  
  
  
  
  
  
  
  
    function getTitle(){
  
  
      if(type==="academic")
        return "Academic Analysis";
  
  
      if(type==="safety")
        return "Safety Analysis";
  
  
      return "Inventory Analysis";
  
    }
  
  
  
  
  
  
  
    return (
  
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
  
  
  
        <View style={styles.header}>
  
  
          <Text style={styles.appTitle}>
            VisionAI
          </Text>
  
  
          <Text style={styles.subtitle}>
            {getTitle()}
          </Text>
  
  
        </View>
  
  
  
  
  
  
        <Image
  
          source={{
            uri:photoUri
          }}
  
          style={styles.image}
  
        />
  
  
  
  
  
  
        {
          loading ?
  
  
          (
  
            <View style={styles.loadingCard}>
  
  
              <ActivityIndicator
                size="large"
              />
  
  
              <Text style={styles.loadingText}>
                AI is analyzing image...
              </Text>
  
  
            </View>
  
  
          )
  
  
          :
  
  
  
          (
  
            <View>
  
  
              <ResultCard
                title="Objects"
              >
  
                {
                  result?.objects?.map(
                    (
                      item:string,
                      index:number
                    )=>(
  
  
                      <Text
                        key={index}
                        style={styles.item}
                      >
  
                        • {item}
  
                      </Text>
  
  
                    )
                  )
                }
  
  
              </ResultCard>
  
  
  
  
  
  
  
              <ResultCard
                title="Context"
              >
  
                <Text style={styles.body}>
                  {result?.context}
                </Text>
  
              </ResultCard>
  
  
  
  
  
  
  
  
              <ResultCard
                title="Activities"
              >
  
                <Text style={styles.body}>
                  {result?.activities}
                </Text>
  
              </ResultCard>
  
  
  
  
  
  
  
  
              <ResultCard
                title="Recommendation"
              >
  
                <Text style={styles.body}>
                  {result?.recommendations}
                </Text>
  
              </ResultCard>
  
  
  
  
            </View>
  
          )
  
        }
  
  
  
  
  
      </ScrollView>
  
    );
  
  }
  
  
  
  
  
  
  
  function ResultCard(
    {
      title,
      children
    }:any
  ){
  
  
    return (
  
      <View style={styles.card}>
  
  
        <Text style={styles.cardTitle}>
          {title}
        </Text>
  
  
        {children}
  
  
      </View>
  
    );
  
  }
  
  
  
  
  
  
  
  
  
  const styles =
  StyleSheet.create({
  
  
  
  container:{
  
  
   flex:1,
  
   backgroundColor:"#F4F5FB",
  
   padding:20
  
  
  },
  
  
  
  
  
  header:{
  
  
   backgroundColor:"#5B3FA3",
  
   padding:22,
  
   borderRadius:18,
  
   marginBottom:20,
  
   shadowOpacity:0.2,
  
   shadowRadius:5
  
  
  },
  
  
  
  
  
  appTitle:{
  
  
   color:"#fff",
  
   fontSize:30,
  
   fontWeight:"bold"
  
  
  },
  
  
  
  
  
  subtitle:{
  
  
   color:"#ddd",
  
   marginTop:5,
  
   fontSize:16
  
  
  },
  
  
  
  
  
  image:{
  
  
   width:"100%",
  
   height:300,
  
   borderRadius:18,
  
   marginBottom:20,
  
   backgroundColor:"#ddd"
  
  
  },
  
  
  
  
  
  
  loadingCard:{
  
  
   backgroundColor:"#fff",
  
   padding:30,
  
   borderRadius:18,
  
   alignItems:"center"
  
  
  },
  
  
  
  
  
  loadingText:{
  
  
   marginTop:15,
  
   fontSize:16
  
  
  },
  
  
  
  
  
  card:{
  
  
   backgroundColor:"#fff",
  
   borderRadius:18,
  
   padding:20,
  
   marginBottom:18,
  
   elevation:3
  
  
  },
  
  
  
  
  
  cardTitle:{
  
  
   fontSize:21,
  
   fontWeight:"bold",
  
   color:"#5B3FA3",
  
   marginBottom:12
  
  
  },
  
  
  
  
  
  body:{
  
  
   fontSize:16,
  
   lineHeight:24,
  
   color:"#333"
  
  
  },
  
  
  
  
  
  item:{
  
  
   fontSize:16,
  
   marginBottom:8,
  
   color:"#333"
  
  
  }
  
  
  
  });