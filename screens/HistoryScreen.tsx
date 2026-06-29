import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
   
   import {
    useEffect,
    useState
} from "react";
   
   import {
    getHistory
} from "../lib/storage";
   
   
   
   export default function HistoryScreen(){
   
   
   const [history,setHistory] =
   useState<any[]>([]);
   
   
   
   async function load(){
   
    const data =
    await getHistory();
   
    setHistory(data);
   
   }
   
   
   
   useEffect(()=>{
   
    load();
   
   },[]);
   
   
   
   return (
   
   <ScrollView
   style={styles.container}
   >
   
   
   <Text style={styles.title}>
   History
   </Text>
   
   
   
   {
   history.map((item)=>(
   <View
   key={item.id}
   style={styles.card}
   >
   
   
   <Image
   
   source={{
   uri:
   `data:image/jpeg;base64,${item.image}`
   }}
   
   style={styles.image}
   
   />
   
   
   <Text>
   {item.date}
   </Text>
   
   
   <Text style={styles.text}>
   
   Objects:
   
   {
   item.result.objects.join(", ")
   }
   
   </Text>
   
   
   <Text>
   
   {
   item.result.context
   }
   
   </Text>
   
   
   </View>
   ))
   
   }
   
   
   </ScrollView>
   
   );
   
   }
   
   
   
   const styles =
   StyleSheet.create({
   
   container:{
   flex:1,
   padding:20
   },
   
   
   title:{
   fontSize:28,
   fontWeight:"bold"
   },
   
   
   card:{
   marginTop:20,
   padding:15,
   borderRadius:10,
   backgroundColor:"#eee"
   },
   
   
   image:{
   height:200,
   borderRadius:10
   },
   
   
   text:{
   marginTop:10
   }
   
   });