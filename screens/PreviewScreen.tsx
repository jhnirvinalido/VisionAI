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
              Academic
            </Text>
  
          </TouchableOpacity>
  
  
  
  
  
          <TouchableOpacity
  
            style={styles.button}
  
            onPress={()=>
              goAnalysis("safety")
            }
  
          >
  
            <Text style={styles.text}>
              Safety
            </Text>
  
          </TouchableOpacity>
  
  
  
  
  
          <TouchableOpacity
  
            style={styles.button}
  
            onPress={()=>
              goAnalysis("inventory")
            }
  
          >
  
            <Text style={styles.text}>
              Inventory
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
  
   backgroundColor:"#5B3FA3",
  
   padding:15,
  
   borderRadius:10,
  
   alignItems:"center"
  
  },
  
  
  text:{
  
   color:"#fff",
  
   fontWeight:"bold"
  
  }
  
  
  });