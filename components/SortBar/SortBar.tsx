import { Button, Center, Icon, IconButton, View } from "native-base";
import RangeSlider from "../RangeSlider/RangeSlider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";

//Tìm kiếm theo loại
export const SortByCategory = () => {};
export const SortByCPrice = () => {
  const handleRangeChange = (low: number, high: number) => {
    // console.log("Min:", low, "Max:", high);
  };
  return (
    <RangeSlider from={0} to={1000000000} onRangeChange={handleRangeChange} />
  );
};
export const SortByCategor = () => {};
const SortBar = () => {
  return (
    <IconButton
      icon={<Icon as={Ionicons} name="filter" />}
      colorScheme="gray"
      borderWidth="1"
      borderColor="gray.400"
      borderRadius="full"
      size="md" 
      onPress={() => {
        console.log("Mở modal lọc");
      }}
    />
  );
};
export default SortBar;
