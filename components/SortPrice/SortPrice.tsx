import React, { useState } from "react";
import { Center, Flex, Input, Text } from "native-base";

interface SortPriceProps {
  onChange: (minPrice: number, maxPrice: number) => void;
}

const SortPrice = ({ onChange }: SortPriceProps) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000000);

  const handleMinPriceChange = (text: string) => {
    const value = parseFloat(text) || 0;
    setMinPrice(value);
    onChange(value, maxPrice);
  };

  const handleMaxPriceChange = (text: string) => {
    const value = parseFloat(text) || 0;
    setMaxPrice(value);
    onChange(minPrice, value);
  };

  return (
    <Flex direction="row" mb="2.5" mt="1.5" justify="space-between">
      <Center bg="#704F38" p="3" rounded="3xl" w="40%">
        <Text mb="2" color="white">
          Từ
        </Text>
        <Input
          borderRadius="2xl"
          value={minPrice + ""}
          onChangeText={handleMinPriceChange}
          keyboardType="numeric"
          color="white"
          placeholderTextColor="white"
        />
      </Center>
      <Center>
        <Text fontSize="2xl" color="#704F38">
          -
        </Text>
      </Center>
      <Center bg="#704F38" p="3" rounded="3xl" w="40%">
        <Text mb="2" color="white">
          Đến
        </Text>
        <Input
          borderRadius="2xl"
          value={maxPrice + ""}
          onChangeText={handleMaxPriceChange}
          keyboardType="numeric"
          color="white"
          placeholderTextColor="white"
        />
      </Center>
    </Flex>
  );
};

export default SortPrice;
