import { Box, Flex, Spacer, ButtonGroup,  Heading, Button } from '@chakra-ui/react';
import { Logo } from '../Logo';
import { ColorModeSwitcher } from '../ColorModeSwitcher';



const Header = () => (
  <>
    <Flex minWidth='max-content' alignItems='center' gap='2' p="2">
      <Box p='2' display='flex' alignItems="center">
        <Logo h="6vmin" mr="5"/>
        <Heading size='md'>Ticket Manager App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Button colorScheme='teal'>Log Out</Button>
      </ButtonGroup>
    </Flex>
    
  </>

);

export default Header;