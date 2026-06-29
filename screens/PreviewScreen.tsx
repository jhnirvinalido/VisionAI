import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
  
  import { useState } from "react";
  
  import {
    imageToBase64,
} from "../lib/gemini";
  
  
  
  export default function PreviewScreen({
    route,
    navigation,
  }: any) {
  
  
    const { photoUri } = route.params;
  
  
    const [loading,setLoading] = useState(false);
  
  
  
    async function handleAnalyze(){
  
  
      try {
  
  
        setLoading(true);
  
  
  
        const base64Image =
          await imageToBase64(photoUri);
  
  
  
        console.log(
          "Base64 length:",
          base64Image.length
        );
  
  
  
        navigation.navigate(
          "Result",
          {
            base64Image,
          }
        );
  
  
      } catch(error){
  
  
        console.log(
          "Image conversion error:",
          error
        );
  
  
      } finally {
  
  
        setLoading(false);
  
      }
  
  
    }
  
  
  
  
  
    return (
  
      <View style={styles.container}>
  
  
        <Image
  
          source={{
            uri: photoUri
          }}
  
          style={styles.preview}
  
          resizeMode="contain"
  
        />
  
  
  
  
        <View style={styles.actionRow}>
  
  
  
          <TouchableOpacity
  
            style={styles.retakeButton}
  
            onPress={() =>
              navigation.goBack()
            }
  
          >
  
            <Text style={styles.buttonText}>
              Retake
            </Text>
  
  
          </TouchableOpacity>
  
  
  
  
  
          <TouchableOpacity
  
            style={styles.analyzeButton}
  
            onPress={handleAnalyze}
  
            disabled={loading}
  
          >
  
  
            {
              loading ?
  
              <ActivityIndicator color="white"/>
  
              :
  
              <Text style={styles.buttonText}>
                Analyze
              </Text>
  
            }
  
  
  
          </TouchableOpacity>
  
  
  
        </View>
  
  
  
      </View>
  
    );
  
  }
  
  
  
  
  
  
  
  const styles = StyleSheet.create({
  
  
    container: {
  
      flex:1,
  
      backgroundColor:"#000",
  
    },
  
  
  
    preview: {
  
      flex:1,
  
      width:"100%",
  
    },
  
  
  
    actionRow: {
  
      flexDirection:"row",
  
      justifyContent:"space-around",
  
      padding:20,
  
    },
  
  
  
    retakeButton: {
  
      backgroundColor:"#5A6472",
  
      padding:14,
  
      borderRadius:8,
  
    },
  
  
  
    analyzeButton: {
  
      backgroundColor:"#5B3FA3",
  
      padding:14,
  
      borderRadius:8,
  
      minWidth:100,
  
      alignItems:"center",
  
    },
  
  
  
    buttonText: {
  
      color:"#fff",
  
      fontWeight:"bold",
  
    },
  
  
  });