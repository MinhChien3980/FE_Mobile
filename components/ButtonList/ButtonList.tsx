import React, { useState } from "react";
import { Button, HStack, ScrollView, Text, Center } from "native-base";
import { Colors } from "../../assets/color/color";

interface ButtonListProps<T> {
  listItem: T[];
  onChangeValue: (item: T) => void;
  labelKey: keyof T;
  valueKey: keyof T;
}

export default function ButtonList<T>({
  listItem,
  onChangeValue,
  labelKey,
  valueKey,
}: ButtonListProps<T>) {
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const handlePress = (item: T) => {
    setActiveItem(item);
    onChangeValue(item);
  };

  return (
    <Center>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HStack space={2} mt="3" alignItems="center" justifyContent="center">
          {listItem.map((item) => {
            const value = String(item[valueKey]);
            const label = String(item[labelKey]);
            const isActive =
              activeItem && value === String(activeItem[valueKey]);

            return (
              <Button
                key={value}
                borderRadius="full"
                // variant="outline"

                onPress={() => handlePress(item)}
                bg={isActive ? Colors.primary : Colors.backgroundButton}
                _text={{ color: isActive ? "white" : "black" }}
                // borderColor={Colors.primary}
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
