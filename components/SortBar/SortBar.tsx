import RangeSlider from "../RangeSlider/RangeSlider";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import {
  Box,
  Center,
  Icon,
  Modal,
  IconButton,
  Select,
  CheckIcon,
  Text,
  FormControl,
  Divider,
  Button,
  View,
  Flex,
  VStack,
  HStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Category } from "@/interface/category";
import SelectedList from "../SelectedList/SelectedList";
import SortPrice from "../SortPrice/SortPrice";
import { Manufacturer } from "@/interface/manufacturer ";
import { max } from "date-fns";
import { productData } from "@/data/products/ProductData";

const categoryList: Category[] = [
  {
    id: 1,
    name: "Running Shoes",
    genderId: 1, // Hoặc một giá trị tương ứng cho genderId
    ageGroupId: 2, // Hoặc một giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-02-01"),
  },
  {
    id: 2,
    name: "Casual Shoes",
    genderId: 2, // Giá trị tương ứng cho genderId
    ageGroupId: 3, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: 3,
    name: "Basketball Shoes",
    parentCategoryId: 2,
    genderId: 1, // Giá trị tương ứng cho genderId
    ageGroupId: 3, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-02-15"),
    description: "Shoes designed for basketball players",
  },
  {
    id: 4,
    name: "Boots",
    genderId: 2, // Giá trị tương ứng cho genderId
    ageGroupId: 2, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-02-20"),
    description: "Sturdy shoes for outdoor activities",
  },
  {
    id: 5,
    name: "Formal Shoes",
    parentCategoryId: 3,
    genderId: 1, // Giá trị tương ứng cho genderId
    ageGroupId: 4, // Giá trị tương ứng cho ageGroupId
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2023-02-25"),
    deletedAt: new Date("2024-01-01"),
  },
];

const SortBar = ({
  onApplyFilter,
  onClearFilters,
}: {
  onApplyFilter: (filters: any) => void;
  onClearFilters: () => void;
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000000);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [manufacturer, setManufacturer] = useState<string | undefined>(
    undefined
  );
  const [modalVisible, setModalVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const fetchManufacturer = () => {
    const manufacturerData = [
      ...new Set(productData.map((product) => product.manufacturerName)),
    ].map((manufacturer: any, index: any) => ({
      id: index.toString(),
      name: manufacturer,
    }));
    // console.log("🚀 ~ fetchManufacturer ~ manufacturerData:", manufacturerData);
    return manufacturerData;
  };
  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  };

  const handleSortByCategory = (id: string) => {
    const selectedCategory = categoryList.find(
      (category) => category.id.toString() === id
    );
    setCategory(selectedCategory);
  };

  const handleSortByManufacturer = (selectedManufacturer: any) => {
    console.log(
      "🚀 ~ handleSortByManufacturer ~ selectedManufacturer:",
      selectedManufacturer
    );
    setManufacturer(selectedManufacturer);
  };

  const handleApplyFilters = () => {
    const filters = {
      minPrice,
      maxPrice,
      category,
      manufacturer,
    };
    onApplyFilter(filters);
    setModalVisible(false);
  };
  const handleClearFilters = () => {
    setModalVisible(false);
    onClearFilters();
  };
  return (
    <SafeAreaView>
      <Modal
        isOpen={modalVisible} //Hiển thi modal
        onClose={() => setModalVisible(false)}
        size="xl"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Lọc sản phẩm</Modal.Header>
          <Modal.Body>
            <Box mb="5">
              <Center>
                <Text mb="5" bold fontSize="lg" color="#704F38">
                  Theo giá(đ)
                </Text>
              </Center>
              {/* Component lọc theo giá */}
              <SortPrice onChange={handlePriceChange} />
            </Box>
            <Box mb="5">
              {/* Lọc theo nhà sản xuất và theo loại dùng chung component là SelectedList */}
              <SelectedList
                listItem={categoryList}
                onChangeValue={handleSortByCategory}
                label="Theo loại"
                labelKey={"name"}
                valueKey={"id"}
              />
            </Box>
            <Box mb="5">
              <SelectedList
                listItem={fetchManufacturer()}
                onChangeValue={(name) => handleSortByManufacturer(name)}
                label="Theo nhà sản xuất"
                labelKey="name"
                valueKey="name"
              />
              {/* Lọc theo nhà sản xuất và theo loại dùng chung component là SelectedList */}
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <HStack width="100%" justifyContent="space-between">
              <Button
                // {...(isLoading && { isLoading: true })}
                justifyContent="flex-start"
                onPress={handleClearFilters}
                // colorScheme=""
                borderRadius="full"
              >
                Xóa bộ lọc
              </Button>
              <Button
                borderRadius="full"
                style={{
                  padding: 12,
                  backgroundColor: "#704F38",
                }}
                onPress={handleApplyFilters}
              >
                Áp dụng
              </Button>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        icon={<Icon as={Ionicons} name="filter" />}
        colorScheme="gray"
        borderWidth="1"
        borderColor="gray.400"
        borderRadius="full"
        size="md"
        onPress={() => setModalVisible(true)}
      />
    </SafeAreaView>
  );
};

export default SortBar;
