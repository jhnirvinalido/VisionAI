import {
  NavigationContainer
} from "@react-navigation/native";


import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";



import CameraScreen from "./CameraScreen";

import PreviewScreen from "./screens/PreviewScreen";

import ResultScreen from "./screens/ResultScreen";

import HistoryScreen from "./screens/HistoryScreen";




const Stack =
createNativeStackNavigator();




export default function App(){


  return (

    <NavigationContainer>


      <Stack.Navigator

        initialRouteName="Camera"

      >



        {/* CAMERA */}

        <Stack.Screen

          name="Camera"

          component={CameraScreen}

          options={{
            headerShown:false
          }}

        />





        {/* PREVIEW */}

        <Stack.Screen

          name="Preview"

          component={PreviewScreen}

          options={{
            title:"Preview"
          }}

        />





        {/* RESULT */}

        <Stack.Screen

          name="Result"

          component={ResultScreen}

          options={{
            title:"Analysis Result"
          }}

        />





        {/* HISTORY */}

        <Stack.Screen

          name="History"

          component={HistoryScreen}

          options={{
            title:"Scan History"
          }}

        />



      </Stack.Navigator>



    </NavigationContainer>

  );

}