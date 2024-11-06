import { Box, Center, CheckIcon, Select, Text } from "native-base";
import { useState } from "react";
interface SelectedListProps<T> {
  listItem: T[];
  onChangeValue: (value: string) => void;
  label: string;
  labelKey: keyof T;
  valueKey: keyof T;
}

export default function SelectedList<T>({
  listItem,
  onChangeValue,
  label,
  labelKey,
  valueKey,
}: SelectedListProps<T>) {
  const [selected, setSelected] = useState<string>();
  const handleChangeValue = (value: string) => {
    setSelected(value);
    onChangeValue(value);
  };

  return (
    <Center>
      <Text mb="5" bold fontSize="lg" color="#704F38">
        {label}
      </Text>
      <Box>
        <Select
          borderRadius="full"
          selectedValue={selected}
          minWidth="80%"
          accessibilityLabel={label}
          placeholder={label}
          _selectedItem={{
            bg: "#704F38",
            endIcon: <CheckIcon size="5" />,
            color: "white",
          }}
          mt={1}
          onValueChange={(itemValue) => handleChangeValue(itemValue)}
        >
          {listItem.map((option) => (
            <Select.Item
              key={String(option[valueKey])}
              label={String(option[labelKey])}
              value={String(option[valueKey])}
            />
          ))}
        </Select>
      </Box>
    </Center>
  );
}
