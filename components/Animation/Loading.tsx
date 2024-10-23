import React, { useEffect } from "react";
import { Modal, Button, HStack, Spinner, Heading } from "native-base"; // Import các thành phần cần thiết

const Loading = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 2000); // Đóng modal sau 2000ms (2 giây)

      return () => clearTimeout(timer); // Dọn dẹp khi component unmount hoặc modalVisible thay đổi
    }
  }, [modalVisible]);

  const handleResetPassword = () => {
    // Mở modal
    setModalVisible(true);
  };

  return (
    <>
      <Button onPress={handleResetPassword}>Quên mật khẩu</Button>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Quên mật khẩu?</Modal.Header>
          <Modal.Body>
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="primary.500" fontSize="md">
                Loading
              </Heading>
            </HStack>
            ;
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default Loading;
