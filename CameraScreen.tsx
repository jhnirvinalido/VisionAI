import { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    CameraView,
    useCameraPermissions,
} from "expo-camera";


export default function CameraScreen({ navigation }: any) {

  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] =
    useCameraPermissions();

  const [cameraReady, setCameraReady] =
    useState(false);



  if (!permission) {
    return (
      <View style={styles.container} />
    );
  }



  if (!permission.granted) {

    return (

      <View style={styles.permissionContainer}>

        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>


        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >

          <Text style={styles.buttonText}>
            Grant Permission
          </Text>

        </TouchableOpacity>


      </View>

    );
  }




  async function takePicture() {


    if (!cameraRef.current) {
      console.log("Camera reference missing");
      return;
    }


    if (!cameraReady) {
      console.log("Camera is not ready yet");
      return;
    }



    try {

      const result =
        await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
        });



      if (!result?.uri) {
        console.log("No image captured");
        return;
      }



      navigation.navigate("Preview", {
        photoUri: result.uri,
      });


    } catch (error) {

      console.log(
        "Capture error:",
        error
      );

    }

  }





  return (

    <View style={styles.container}>


      <CameraView

        ref={cameraRef}

        style={styles.camera}

        facing="back"

        onCameraReady={() => {

          console.log(
            "Camera ready"
          );

          setCameraReady(true);

        }}

      />



      <TouchableOpacity

        style={[
          styles.captureButton,
          !cameraReady && styles.disabledButton
        ]}

        onPress={takePicture}

        disabled={!cameraReady}

      >

        <Text style={styles.buttonText}>

          {cameraReady
            ? "Capture"
            : "Loading..."}

        </Text>


      </TouchableOpacity>



    </View>

  );

}





const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: "black",
  },


  camera: {
    flex: 1,
  },



  permissionContainer: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    padding: 20,

  },



  permissionText: {

    textAlign: "center",

    marginBottom: 20,

    fontSize: 16,

  },



  button: {

    backgroundColor: "#2E5BBA",

    padding: 12,

    borderRadius: 10,

  },



  captureButton: {

    position: "absolute",

    bottom: 40,

    alignSelf: "center",

    backgroundColor: "#2E5BBA",

    paddingVertical: 14,

    paddingHorizontal: 35,

    borderRadius: 30,

  },



  disabledButton: {

    opacity: 0.5,

  },



  buttonText: {

    color: "white",

    fontWeight: "bold",

    fontSize: 16,

  },


});