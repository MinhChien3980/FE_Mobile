import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Label = ({ text, ...restProps }: { text: number }) => (
  <View style={styles.root} {...restProps}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#FE6600",
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});

export default memo(Label);
