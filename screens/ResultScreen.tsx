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
  }: any) {
  
  
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
  
  
            resolve(base64 || "");
  
          };
  
  
          reader.readAsDataURL(blob);
  
        }
      );
  
    }
  
  
  
  
  
    async function runAnalysis(){
  
  
      let prompt:string =
      ACADEMIC_PROMPT;
  
  
  
      if(type === "safety"){
  
        prompt =
        SAFETY_PROMPT;
  
      }
  
  
  
      if(type === "inventory"){
  
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
          "TYPE:",
          type
        );
  
  
        console.log(
          "GEMINI:",
          response
        );
  
  
  
        const text =
        response
        ?.candidates?.[0]
        ?.content
        ?.parts?.[0]
        ?.text || "";
  
  
  
        console.log(
          "TEXT:",
          text
        );
  
  
  
        const clean =
        text
        .replace(
          /```json/g,
          ""
        )
        .replace(
          /```/g,
          ""
        )
        .trim();
  
  
  
        const data =
        JSON.parse(clean);
  
  
  
        setResult(data);
  
  
  
      }catch(error){
  
  
        console.log(
          "ERROR:",
          error
        );
  
  
  
        setResult({
  
          objects:[
            "No detected objects"
          ],
  
  
          context:
          "No analysis available",
  
  
          activities:
          "No activity found",
  
  
          recommendations:
          "Try another image"
  
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
  
  
          <Text style={styles.logo}>
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
  
  
            <Card title="Objects">
  
  
            {
              result?.objects?.map(
  
                (
                  item:any,
                  index:number
  
                )=>(
  
  
                  <Text
                    key={index}
                    style={styles.text}
                  >
  
                  • {
                    
                    typeof item === "string"
  
                    ?
  
                    item
  
                    :
  
                    item.name
                    ?
  
                    item.name
  
                    :
  
                    JSON.stringify(item)
  
                  }
  
                  </Text>
  
  
                )
  
              )
            }
  
  
            </Card>
  
  
  
  
  
            <Card title="Context">
  
              <Text style={styles.text}>
                {result?.context}
              </Text>
  
            </Card>
  
  
  
  
  
  
  
            <Card title="Activities">
  
              <Text style={styles.text}>
                {result?.activities}
              </Text>
  
            </Card>
  
  
  
  
  
  
  
            <Card title="Recommendations">
  
  
              <Text style={styles.text}>
                {result?.recommendations}
              </Text>
  
  
            </Card>
  
  
  
  
  
          </View>
  
          )
  
        }
  
  
  
      </ScrollView>
  
  
    );
  
  
  }
  
  
  
  
  
  
  
  function Card(
  {
   title,
   children
  }:any
  ){
  
  
  return(
  
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
  
  padding:25,
  
  borderRadius:20,
  
  marginBottom:20
  
  },
  
  
  
  logo:{
  
  color:"#fff",
  
  fontSize:30,
  
  fontWeight:"bold"
  
  },
  
  
  
  subtitle:{
  
  color:"#eee",
  
  fontSize:16,
  
  marginTop:5
  
  },
  
  
  
  image:{
  
  width:"100%",
  
  height:300,
  
  borderRadius:20,
  
  marginBottom:20
  
  },
  
  
  
  loading:{
  
  backgroundColor:"#fff",
  
  padding:30,
  
  alignItems:"center",
  
  borderRadius:20
  
  },
  
  
  
  card:{
  
  backgroundColor:"#fff",
  
  padding:20,
  
  borderRadius:18,
  
  marginBottom:18,
  
  elevation:4
  
  },
  
  
  
  cardTitle:{
  
  fontSize:22,
  
  fontWeight:"bold",
  
  color:"#5B3FA3",
  
  marginBottom:12
  
  },
  
  
  
  text:{
  
  fontSize:16,
  
  color:"#333",
  
  lineHeight:24,
  
  marginBottom:8
  
  }
  
  
  
  });