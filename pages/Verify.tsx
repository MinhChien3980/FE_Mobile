import { Box, Button, Center } from "native-base";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, marginTop: 250 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CELL_COUNT = 6;

const Verify = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerify = () => {
    if (value.length < CELL_COUNT) {
      Alert.alert("Mã xác nhận không hợp lệ", "Hãy nhập đầy đủ mã xác nhận");
    }
    console.log(value);
  };

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode" // Ensure this is a valid value
        autoComplete={Platform.select({
          android: "sms-otp" as const,
          default: "one-time-code" as const,
        })}
        testID="my-code-input"
        InputComponent={TextInput} // Specify the InputComponent
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Center>
        {" "}
        <Button left="0" right="0" mt="10" onPress={() => handleVerify()}>
          Xác nhận
        </Button>
      </Center>
    </SafeAreaView>
  );
};

export default Verify;
