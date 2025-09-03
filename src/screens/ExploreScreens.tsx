import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>探索页面</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
