import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function MapButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
      <MaterialCommunityIcons name="map" color="white" size={24} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    height: 50,
    justifyContent: "center",
    width: 60,
    left: "50%",
  },
});

export default MapButton;
