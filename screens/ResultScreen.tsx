import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";
  
  
  
  export default function ResultScreen({
    route
  }:any){
  
  
    const {
      base64Image
    } = route.params;
  
  
  
    return (
  
      <View style={styles.container}>
  
  
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
  
  
  
        <Text style={styles.text}>
          Image received successfully.
          Gemini analysis can be added here.
        </Text>
  
  
      </View>
  
    );
  
  }
  
  
  
  const styles = StyleSheet.create({
  
  
  container:{
  
   flex:1,
  
   justifyContent:"center",
  
   alignItems:"center",
  
   padding:20
  
  },
  
  
  title:{
  
   fontSize:24,
  
   fontWeight:"bold",
  
   marginBottom:20
  
  },
  
  
  image:{
  
   width:300,
  
   height:300,
  
   borderRadius:10
  
  },
  
  
  text:{
  
   marginTop:20,
  
   textAlign:"center"
  
  }
  
  
  });