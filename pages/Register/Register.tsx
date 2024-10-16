import UserInfor from "@/components/UserInfor/UserInforForm";
import { useNavigation } from "@/router/NavigationContext";
import { Box, Button, Center, Heading, Link } from "native-base";

export default function Register() {
  const { goBack } = useNavigation();
  const handleRegister = (data: any) => {
    console.log("Đăng ký: ", data);
  };
  return (
    <Center mt="50%" w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Xin chào!
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Đăng kí tài khoản cùng chúng tôi
        </Heading>
        <UserInfor
          isRegister={true}
          onSubmit={handleRegister}
          buttonLabel="Đăng ký"
        />
      </Box>
      <Link
        _text={{
          color: "indigo.500",
          fontWeight: "medium",
          fontSize: "sm",
        }}
        onPress={goBack}
      >
        Quay về
      </Link>
    </Center>
  );
}
