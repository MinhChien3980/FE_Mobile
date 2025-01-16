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

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Input
      // ml="3"
      w="80%"
      placeholder="Tìm kiếm"
      borderRadius="100"
      py="1"
      px="20"
      fontSize="14"
      onChangeText={onSearch} //Gọi hàm khi nhập từ khóa tìm kiếm
      InputRightElement={
        <Icon
          m="2"
          ml="-5"
          mr="5"
          size="6"
          color="gray.400"
          as={<MaterialIcons name="search" />}
        />
      }
    />
  );
};
