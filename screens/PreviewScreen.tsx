import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
  
  
  
  export default function PreviewScreen({
    route,
    navigation
  }:any){
  
  
    const {
      photoUri
    } = route.params;
  
  
  
    function goAnalysis(type:string){
  
  
      navigation.navigate(
        "Result",
        {
          photoUri,
          type
        }
      );
  
  
    }
  
  
  
  
  
    return (
  
      <View style={styles.container}>
  
  
        <Image
  
          source={{
            uri:photoUri
          }}
  
          style={styles.preview}
  
        />
  
  
  
  
        <View style={styles.buttons}>
  
  
  
          <TouchableOpacity
  
            style={styles.button}
  
            onPress={()=> 
              goAnalysis("academic")
            }
  
          >
  
            <Text style={styles.text}>
              Academic Analysis
            </Text>
  
  
          </TouchableOpacity>
  
  
  
  
  
  
          <TouchableOpacity
  
            style={styles.button}
  
            onPress={()=> 
              goAnalysis("safety")
            }
  
          >
  
            <Text style={styles.text}>
              Safety Analysis
            </Text>
  
  
          </TouchableOpacity>
  
  
  
  
  
  
  
          <TouchableOpacity
  
            style={styles.button}
  
            onPress={()=> 
              goAnalysis("inventory")
            }
  
          >
  
            <Text style={styles.text}>
              Inventory Analysis
            </Text>
  
  
          </TouchableOpacity>
  
  
  
  
        </View>
  
  
      </View>
  
    );
  
  }
  
  
  
  
  
  
  const styles = StyleSheet.create({
  
  
  
  container:{
  
   flex:1,
  
   backgroundColor:"#000"
  
  },
  
  
  
  
  
  preview:{
  
   flex:1,
  
   resizeMode:"contain"
  
  },
  
  
  
  
  
  buttons:{
  
   padding:20,
  
   gap:15
  
  },
  
  
  
  
  
  
  button:{
  
  
   backgroundColor:"#8A2BE2",
  
   padding:16,
  
   borderRadius:12,
  
   alignItems:"center",
  
  
   shadowColor:"#000",
  
   shadowOffset:{
  
     width:0,
  
     height:3
  
   },
  
  
   shadowOpacity:0.3,
  
  
   shadowRadius:5,
  
  
   elevation:6
  
  
  },
  
  
  
  
  
  
  text:{
  
  
   color:"#fff",
  
   fontWeight:"bold",
  
   fontSize:16
  
  
  }
  
  
  
  });