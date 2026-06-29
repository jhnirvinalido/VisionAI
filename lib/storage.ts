import AsyncStorage from "@react-native-async-storage/async-storage";


const HISTORY_KEY = "VISION_HISTORY";



export async function saveHistory(
  data:any
){

  try{

    const old =
      await AsyncStorage.getItem(
        HISTORY_KEY
      );


    const history =
      old ? JSON.parse(old) : [];


    history.unshift(data);


    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history)
    );


  }catch(error){

    console.log(
      "Save history error",
      error
    );

  }

}




export async function getHistory(){

  try{

    const data =
      await AsyncStorage.getItem(
        HISTORY_KEY
      );


    return data
      ? JSON.parse(data)
      : [];


  }catch(error){

    return [];

  }

}