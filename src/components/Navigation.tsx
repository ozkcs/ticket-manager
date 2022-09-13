import { Stack, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent="center" border="solid #95a5a6 1px" p="2">
    <Stack direction='row' spacing={4} align='center'>
      <Button colorScheme='teal' variant='ghost'>
        <Link to="generate-code">Generate Code</Link>
      </Button>
      <Button colorScheme='teal' variant='ghost'>
        <Link to="validate-code">Validate Code</Link>
      </Button>
      <Button colorScheme='teal' variant='ghost'>
        <Link to="reporting">Reporting</Link>
      </Button>
    </Stack>
  </Flex>
);

export default Navigation;