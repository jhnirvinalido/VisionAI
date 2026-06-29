import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
  
  import { useEffect, useState } from "react";
  
  import {
    analyzeImage,
} from "../lib/gemini";
  
  import {
    ANALYSIS_PROMPT,
} from "../lib/prompt";
  
  
  
  export default function ResultScreen({
    route
  }: any) {
  
  
    const {
      base64Image
    } = route.params;
  
  
  
    const [loading, setLoading] =
      useState(true);
  
  
    const [analysis, setAnalysis] =
      useState<any>(null);
  
  
  
    async function runAnalysis() {
  
  
      try {
  
  
        const geminiResponse =
          await analyzeImage(
            base64Image,
            ANALYSIS_PROMPT
          );
  
  
  
        console.log(
          "Gemini:",
          geminiResponse
        );
  
  
  
        let text =
          geminiResponse
          ?.candidates?.[0]
          ?.content
          ?.parts?.[0]
          ?.text;
  
  
  
        try {
  
  
          const clean =
            text.replace(
              /```json|```/g,
              ""
            );
  
  
          setAnalysis(
            JSON.parse(clean)
          );
  
  
        } catch {
  
  
          setAnalysis({
  
            objects:[
              "Unable to parse response"
            ],
  
            context:text,
  
            activities:"",
  
            recommendations:""
  
          });
  
        }
  
  
  
      } catch(error) {
  
  
        console.log(
          "Analysis error:",
          error
        );
  
  
        setAnalysis({
  
          objects:[
            "Gemini failed"
          ],
  
          context:
          "Unable to analyze image. Check API quota.",
  
          activities:"",
  
          recommendations:
          "Try again later."
  
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
          Analysis Result
        </Text>
  
  
  
  
        <Image
  
          source={{
            uri:
            `data:image/jpeg;base64,${base64Image}`
          }}
  
          style={styles.image}
  
        />
  
  
  
  
        {
          loading ? (
  
  
            <ActivityIndicator
  
              size="large"
  
              style={{
                marginTop:30
              }}
  
            />
  
  
          ) : (
  
  
            <View>
  
  
  
              <Text style={styles.sectionTitle}>
                Objects
              </Text>
  
  
              {
                analysis?.objects?.map(
  
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
  
  
  
  
  
  
              <Text style={styles.sectionTitle}>
                Context
              </Text>
  
  
              <Text style={styles.text}>
  
                {analysis?.context}
  
              </Text>
  
  
  
  
  
  
  
              <Text style={styles.sectionTitle}>
                Activities
              </Text>
  
  
              <Text style={styles.text}>
  
                {analysis?.activities}
  
              </Text>
  
  
  
  
  
  
  
              <Text style={styles.sectionTitle}>
                Recommendations
              </Text>
  
  
              <Text style={styles.text}>
  
                {analysis?.recommendations}
  
              </Text>
  
  
  
            </View>
  
          )
  
        }
  
  
  
      </ScrollView>
  
    );
  
  }
  
  
  
  
  
  
  
  const styles = StyleSheet.create({
  
  
    container:{
  
      flex:1,
  
      backgroundColor:"#fff",
  
      padding:20
  
    },
  
  
  
    title:{
  
      fontSize:26,
  
      fontWeight:"bold",
  
      textAlign:"center",
  
      marginBottom:20
  
    },
  
  
  
    image:{
  
      width:"100%",
  
      height:300,
  
      borderRadius:10
  
    },
  
  
  
    sectionTitle:{
  
      fontSize:20,
  
      fontWeight:"bold",
  
      marginTop:25,
  
      marginBottom:10
  
    },
  
  
  
    text:{
  
      fontSize:16,
  
      marginBottom:8
  
    }
  
  
  });