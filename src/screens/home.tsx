import * as React from "react";
import {  View, StyleSheet } from "react-native";
 import VideoList from "../sections/VideoList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  subTitle: {
    margin: 24,
    textAlign: "center"
  }
});

const Home = () => {


  return (
    <View style={styles.container}>
   {/*    <Logo /> */}
  {/*     <Text style={styles.title}>MightyByte React Native Challenge.</Text>
      <Text style={styles.subTitle}>
        You are allowed to modify this project structure in any way you wish.
      </Text> */}
      <VideoList />
    </View>
  );
};

export default Home;
