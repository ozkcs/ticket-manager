import { Button, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom';

interface IPropsNotFoundPage {
  path?: string
}

enum ERedirectLabel {
  DASHBOARD='Dashboard',
  LOGIN='Login'
}

const NotFoundComponent = ({ path }: IPropsNotFoundPage) => {
  const navigate = useNavigate()

  return (
    <VStack h={'100%'} m={'80px auto'} alignItems={'center'} color='gray.400'>
      <HStack>
        <Heading as='h1' fontSize='6.5rem' noOfLines={1}>
        <Typewriter
          onInit={(typewriter)=> {
            typewriter
            .typeString("404")
            .pauseFor(1500)
            .start()
          }}
          />
        </Heading>
      </HStack>
      <VStack>
        <Text size='lg' fontSize={'27px'} as='h1' align='center' fontWeight='semibold'>
          Ooops, page not found
        </Text>
        <Text as='h1' size='md' align='center' fontWeight='semibold'>
          Maybe you can find something interesting by visiting home page
        </Text>
      </VStack>
      <HStack mt='2rem' h='120px'>
        <Button colorScheme='teal' gap={2} onClick={() => navigate(path || '/admin')}>Go to {path ? ERedirectLabel.LOGIN : ERedirectLabel.DASHBOARD}</Button>
      </HStack>
    </VStack>
  );
}

export default NotFoundComponent

