import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  VStack,
} from "native-base";
import { Alert, TouchableOpacity } from "react-native";
import SortBar from "../SortBar/SortBar";

export const SearchBar = () => {
  return (
    <Input
      w="75%"
      placeholder="Tìm kiếm"
      borderRadius="100"
      py="1"
      px="20"
      fontSize="14"
      InputRightElement={
        <TouchableOpacity onPress={() => Alert.alert("Tìm kiếm")}>
          <Icon
            m="2"
            ml="-5"
            mr="5"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        </TouchableOpacity>
      }
    />
  );
};
