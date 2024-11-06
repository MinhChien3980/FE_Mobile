import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

export const Notch = (props: any) => <View style={styles.root} {...props} />;

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#704F38",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
