import { useToast } from "@chakra-ui/react";

type TStatus = 'success' | 'warning' | 'error';

const ToastMessage = () => {

  const spanToast = useToast();

  const spanNewToast = (title: string, description: string, status: TStatus) => {
    spanToast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: false,
    })
  }
  return spanNewToast;
}

export default ToastMessage;