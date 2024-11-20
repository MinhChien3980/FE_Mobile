// import userApi  from "@/api/UserApiService";
import { Colors } from "@/assets/color/color";
import useShowToast from "@/components/Toast/Toast";
import {
  View,
  Button,
  Center,
  Pressable,
  Link,
  Heading,
  Box,
} from "native-base";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app";
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, marginTop: 250 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: -90 },
  cell: {
    width: 70,
    height: 50,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.primary,
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CELL_COUNT = 4;

const Verify = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const showToast = useShowToast();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleVerify = async () => {
    if (value.length < CELL_COUNT) {
      showToast({
        type: "warning",
        message: "Chưa nhập mã xác nhận",
      });
    }
    navigation.navigate("NewPassword");
    const response =
      // await userApi.getVerifyCode(value);

      console.log(value);
  };
  const checkVerifyCode = () => {};
  const handleResendCode = () => {
    showToast({
      type: "success",
      message: "Gửi lại mã",
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Box alignItems="center" mt="-200" mb="150">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Nhập mã xác nhận
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Hãy nhập mã xác nhận đã đươc gửi vào email
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color={Colors.primary}
          fontWeight="bold"
          size="xs"
        >
          gmail@gmail.com
        </Heading>
      </Box>
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
        <View mt="10%">
          <Text>Không nhận được mã?</Text>
          <Center>
            <TouchableOpacity onPress={handleResendCode}>
              <Text
                style={{
                  fontWeight: "500",
                  textDecorationLine: "underline",
                }}
              >
                Gửi lại
              </Text>
            </TouchableOpacity>
          </Center>
        </View>
        <Button
          w="full"
          borderRadius="full"
          height="50"
          // left="0"
          // right="0"
          mt="10"
          style={{ backgroundColor: Colors.primary }}
          onPress={() => handleVerify()}
        >
          Xác nhận
        </Button>
      </Center>
    </SafeAreaView>
  );
};

export default Verify;
