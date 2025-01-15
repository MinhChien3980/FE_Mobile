import React, { useState } from "react";
import { Button, HStack, ScrollView, Text, Center } from "native-base";
import { Colors } from "../../assets/color/color";

interface ButtonListProps<T> {
  listItem: T[];
  onChangeValue: (item: T) => void;
  labelKey: keyof T;
  valueKey: keyof T;
  active: boolean; // Prop active dạng boolean
}

export default function ButtonList<T>({
  listItem,
  onChangeValue,
  labelKey,
  valueKey,
  active,
}: ButtonListProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePress = (item: T, index: number) => {
    setActiveIndex(index); // Cập nhật chỉ số của nút đang active
    onChangeValue(item); // Gửi item về component cha
    console.log("Selected: ", item);
  };

  return (
    <Center>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HStack space={2} mt="3" alignItems="center" justifyContent="center">
          {listItem.map((item, index) => {
            const value = String(item[valueKey]);
            const label = String(item[labelKey]);
            const isActive = active && index === activeIndex; // Kích hoạt nút nếu active và index khớp

            return (
              <Button
                key={value}
                borderRadius="full"
                onPress={() => handlePress(item, index)}
                bg={isActive ? Colors.primary : Colors.backgroundButton}
                _text={{ color: isActive ? "white" : "black" }}
              >
                <Text color={isActive ? "white" : "black"}>{label}</Text>
              </Button>
            );
          })}
        </HStack>
      </ScrollView>
    </Center>
  );
}
