import {
  useToast,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";
import React from "react";

type ToastProps = {
  type: "success" | "error" | "warning" | "info";
  //   title: string;
  message: string;
  position?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-left"
    | "bottom-right";
};

const useShowToast = () => {
  const toast = useToast();

  let currentToastId: string | null = null;

  const showToast = ({ type, message, position = "bottom" }: ToastProps) => {
    if (currentToastId && toast.isActive(currentToastId)) {
      toast.close(currentToastId);
    }

    currentToastId = toast.show({
      placement: position,
      render: ({ id }) => (
        <AlertComponent id={id} status={type} message={message} />
      ),
    });
  };

  return showToast;
};

const AlertComponent = ({
  id,
  status,
  //   title,
  message,
}: {
  id: string;
  status: "success" | "error" | "warning" | "info";
  //   title: string;
  message: string;
}) => {
  const toast = useToast();
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      status={status}
      variant="solid"
      mb={5}
      rounded="sm"
    >
      <VStack space={1} w="100%">
        <HStack justifyContent="space-between" alignItems="center">
          <HStack space={2} alignItems="center">
            <Alert.Icon />
            <Text fontSize="sm" color="lightText">
              {message}
            </Text>
          </HStack>
          {/* <IconButton
            icon={<CloseIcon size="3" />}
            onPress={() => toast.close(id)}
            variant="unstyled"
            _icon={{ color: "lightText" }}
          /> */}
          {/* {setTimeout(() => toast.close(id), 1000)} */}
        </HStack>
        {/* <Text color="lightText" px="3">
          {message}
        </Text> */}
      </VStack>
    </Alert>
  );
};

export default useShowToast;
