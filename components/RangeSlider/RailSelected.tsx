import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

export const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 5,
    backgroundColor: "#704F38",
    borderRadius: 2,
  },
});
