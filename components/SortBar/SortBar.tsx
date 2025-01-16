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
  View,
  Flex,
  VStack,
  HStack,
  ScrollView,
  Button,
  CloseIcon,
} from "native-base";
import { useCallback, useEffect, useMemo, useState } from "react";
import SelectedList from "../SelectedList/SelectedList";
import SortPrice from "../SortPrice/SortPrice";
import { Category } from "../../interface/category";
import { productData } from "../../data/products/ProductData";
import ButtonList from "../ButtonList/ButtonList";
import { Manufacturer } from "../../interface/Manufacturer ";
import { AirbnbRating, Rating } from "react-native-ratings";
import { StarRating } from "../StarRating/StarRating";
import { Colors } from "../../assets/color/color";
import React from "react";

const SortBar = ({
  onApplyFilter,
  onClearFilters,
}: {
  onApplyFilter: (filters: any) => void;
  onClearFilters: () => void;
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000000);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [manufacturer, setManufacturer] = useState<string | undefined>(
    undefined
  );

  const [activeCategoryButton, setActiveCategoryButton] =
    useState<boolean>(true);
  const [activeManufacturerButton, setActiveManufacturerButton] =
    useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState(false);
  // const fetchManufacturer = useMemo(() => {
  //   const manufacturerData = [
  //     ...[
  //       ...new Set(productData.map((product) => product.manufacturerName)),
  //     ].map((manufacturer, index) => ({
  //       id: index.toString(),
  //       name: manufacturer,
  //     })),
  //   ];
  //   return manufacturerData;
  // }, [productData]);
  const fetchCategoryData = useMemo(() => {
    return Array.from(
      new Set(productData.map((product) => product.category))
    ).map((category, index) => ({
      id: index.toString(),
      name: category,
    }));
  }, []);
  const handlePriceChange = useCallback(
    (newMinPrice: number, newMaxPrice: number) => {
      setMinPrice(newMinPrice);
      setMaxPrice(newMaxPrice);
    },
    []
  );

  const handleCategoryChange = useCallback((item: any) => {
    setCategory(item);
    setActiveCategoryButton(false);
    console.log(
      "🚀 ~ handelActiveCateButton ~ activeCategoryButton:",
      activeCategoryButton
    );
  }, []);

  //Change manufacturer
  const handleManufacturerChange = useCallback((selectedManufacturer: any) => {
    setManufacturer(selectedManufacturer.name);
    setActiveManufacturerButton(false);
    console.log(
      "🚀 ~ handelActiveCateButton ~ activeCategoryButton:",
      activeCategoryButton
    );
  }, []);

  //Apply filter
  const handleApplyFilters = useCallback(() => {
    onApplyFilter({ minPrice, maxPrice, category, manufacturer });
    setModalVisible(false);
  }, [minPrice, maxPrice, category, manufacturer, onApplyFilter]);

  //Rating
  const handleChangeRating = useCallback((rating: any) => {
    console.log("Rating is: " + rating);
  }, []);
  //clear filter
  const handleClearFilters = useCallback(() => {
    handleClearPrice();
    handleClearCategory();
    handleClearManufacturer();
    onClearFilters();
    setModalVisible(false);
  }, [onClearFilters]);
  //Clear price filter
  const handleClearPrice = useCallback(() => {
    if (minPrice !== 0 && maxPrice !== 1000000000) {
      setMinPrice(0);
      setMaxPrice(1000000000);
    }
  }, [minPrice, maxPrice]);
  //Clear category filter
  const handleClearCategory = useCallback(() => {
    if (category !== undefined) {
      setCategory(undefined);
    }
  }, [category]);
  //Clear manufacturer filter
  const handleClearManufacturer = useCallback(() => {
    if (manufacturer !== undefined) {
      setManufacturer(undefined);
    }
  }, [manufacturer]);
  const handelActiveCateButton = () => {
    handleClearCategory();
    setActiveCategoryButton(!activeCategoryButton);
    console.log("🚀 ~ category:", category);
    console.log(
      "🚀 ~ handelActiveCateButton ~ activeCategoryButton:",
      activeCategoryButton
    );
  };

  const handleActiveManuButton = () => {
    handleClearManufacturer();
    setActiveManufacturerButton(!activeManufacturerButton);
    console.log("🚀 ~ manufacturer:", manufacturer);
    console.log(
      "🚀 ~ handleActiveManuButton ~ activeManufacturerButton:",
      activeManufacturerButton
    );
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
          <Modal.Header>
            <Text bold fontSize="lg">
              Lọc sản phẩm
            </Text>
          </Modal.Header>
          <Modal.Body>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <Box mb="5" mt="3">
                {/* Lọc theo nhà sản xuất và theo loại dùng chung component là SelectedList */}
                <Text mb="5" bold fontSize="md" color={Colors.primary}>
                  Theo nhà sản xuất{" "}
                </Text>
                <HStack space={2} alignItems="center" justifyContent="center">
                  <Button
                    mt="2"
                    ml="16"
                    borderRadius="full"
                    onPress={handleActiveManuButton}
                    bg={
                      activeManufacturerButton
                        ? Colors.primary
                        : Colors.backgroundButton
                    }
                    _text={{
                      color: activeManufacturerButton ? "white" : "black",
                    }}
                    borderColor={Colors.primary}
                  >
                    <Text color={activeManufacturerButton ? "white" : "black"}>
                      All
                    </Text>
                  </Button>
                  <ButtonList
                    listItem={fetchCategoryData}
                    onChangeValue={handleManufacturerChange}
                    labelKey="name"
                    valueKey="name"
                    active={!activeManufacturerButton}
                  />
                </HStack>
              </Box>

              <Divider w="100%" />
              {/* Lọc theo nhà sản xuất và theo loại dùng chung component là SelectedList */}
              <Box mb="5" mt="3">
                <Text mb="5" bold fontSize="md" color={Colors.primary}>
                  Theo loại
                </Text>
                <HStack space={2} alignItems="center" justifyContent="center">
                  <Button
                    mt="2"
                    ml="16"
                    borderRadius="full"
                    onPress={handelActiveCateButton}
                    bg={
                      activeCategoryButton
                        ? Colors.primary
                        : Colors.backgroundButton
                    }
                    _text={{ color: activeCategoryButton ? "white" : "black" }}
                    borderColor={Colors.primary}
                  >
                    <Text color={activeCategoryButton ? "white" : "black"}>
                      All
                    </Text>
                  </Button>
                  <ButtonList
                    listItem={fetchCategoryData}
                    onChangeValue={handleCategoryChange}
                    labelKey="name"
                    valueKey="name"
                    active={!activeCategoryButton}
                  />
                </HStack>
              </Box>
              <Divider w="100%" />
              <Box mb="5" mt="3">
                <Text mb="5" bold fontSize="md" color={Colors.primary}>
                  Theo giá
                </Text>
                {/* Component lọc theo giá */}
                <SortPrice onChange={handlePriceChange} />
              </Box>
              <Divider w="100%" />
              <Box mb="5" mt="3">
                <Text mb="5" bold fontSize="md" color={Colors.primary}>
                  Theo đánh giá
                </Text>
                {/* Component lọc theo danh giá */}
                <Rating
                  showRating
                  onFinishRating={handleChangeRating}
                  style={{ paddingVertical: 10 }}
                />
              </Box>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <HStack width="100%" justifyContent="space-between">
              <Button
                justifyContent="flex-start"
                onPress={handleClearFilters}
                borderRadius="full"
                _text={{ color: Colors.buttonDelete }}
                // variant="outline"
                bg={Colors.backgroundButtonDelete}
              >
                Xóa bộ lọc
              </Button>
              <Button
                borderRadius="full"
                style={{
                  padding: 12,
                  backgroundColor: Colors.primary,
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

export default React.memo(SortBar);
