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
} from "native-base";
import { useEffect, useState } from "react";
import { Category } from "@/interface/category";
import SelectedList from "../SelectedList/SelectedList";
import SortPrice from "../SortPrice/SortPrice";
import { Manufacturer } from "@/interface/Manufacturer ";
import { max } from "date-fns";

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

const manufacturers: Manufacturer[] = [
  { id: 1, name: "Nike", country: "USA" },
  { id: 2, name: "Adidas", country: "Germany" },
  { id: 3, name: "Puma", country: "Germany" },
  { id: 4, name: "Reebok", country: "USA" },
  { id: 5, name: "New Balance", country: "USA" },
];
const SortBar = ({
  onApplyFilter,
}: {
  onApplyFilter: (filters: any) => void;
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000000);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [manufacturer, setManufacturer] = useState<Manufacturer | undefined>(
    undefined
  );
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleSortByManufacturer = (id: string) => {
    const selectedManufacturer = manufacturers.find(
      (m) => m.id.toString() === id
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

  return (
    <SafeAreaView>
      <Modal
        isOpen={modalVisible}
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
              <SortPrice onChange={handlePriceChange} />
            </Box>
            <Box mb="5">
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
                listItem={manufacturers}
                onChangeValue={handleSortByManufacturer}
                label="Theo nhà sản xuất"
                labelKey={"name"}
                valueKey={"id"}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                padding: 12,
                backgroundColor: "#704F38",
              }}
              onPress={handleApplyFilters}
            >
              Áp dụng
            </Button>
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
