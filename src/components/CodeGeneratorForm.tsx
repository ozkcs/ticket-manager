import { Box, FormControl, Input, FormLabel, FormHelperText } from "@chakra-ui/react";


const CodeGeneratorForm = () => {

  return (
    <Box className="code-generator-form">
      <Box maxW="700px" minW="100%" m="0 auto">
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  )
};

export default CodeGeneratorForm;