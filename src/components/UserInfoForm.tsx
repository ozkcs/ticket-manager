import { Box, Stack, Text, Button, Flex, Heading, Spacer, useBoolean } from "@chakra-ui/react";
import FormInput from "./FormInput/FormInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserInfoForm = () => {

  const [isDisabled, setIsDisabled] = useBoolean(true);

  const formik: any = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      event_name:""
    },
    validationSchema:Yup.object({
      first_name: Yup.string().required("This field is required"),
      last_name: Yup.string().required("This field is required"),
      email: Yup.string().required("This field is required"),
      phone: Yup.string().required("This field is required"),
      event_name:Yup.string().required("This field is required"),
    }),
    onSubmit: (values:any, actions:any) => {
      console.log('it submitted')
      actions.resetForm();
    }
  })


  return (
    <Box className="code-generator-form">
      <Box as='form' maxW="70%" minW="50%" m="auto" alignItems='center'>
        <Stack spacing={4}>
          <Heading size='lg' as='h2' >
            Personal Info
          </Heading >
          <Stack spacing={4} isInline>
            <FormInput
              name="first_name"
              isRequired
              formLabel="First Name"
              type="name"
              {...formik.getFieldProps("first_name")}
              isInvalid={formik.errors.first_name && formik.touched.first_name}
              errors={formik.errors.first_name}
            />
            <FormInput
              name="last_name"
              isRequired
              formLabel="Last Name"
              type="name"
              {...formik.getFieldProps("last_name")}
              isInvalid={formik.errors.last_name && formik.touched.last_name}
              errors={formik.errors.last_name}
            />
          </Stack>
          <Stack spacing={4} isInline>
            <FormInput
              name="email"
              isRequired
              formLabel="Email"
              type="email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.errors.email && formik.touched.email}
              errors={formik.errors.email}
            />
            <FormInput
              name="phone"
              isRequired
              formLabel="Phone"
              type="phone"
              {...formik.getFieldProps("phone")}
              isInvalid={formik.errors.phone && formik.touched.phone}
              errors={formik.errors.phone}
            />
          </Stack>
          <Flex minWidth='100%' alignItems='center' justifyContent='center' textAlign='center' >
            <Text as='sub' fontSize='lg' color='gray.400'>We'll never share your personal information.</Text>
          </Flex>
        </Stack>
       
        <Flex minWidth='max-content' alignItems='center' justifyContent='center'>
          <Button size='lg' fontWeight='semibold' colorScheme='teal' variant='solid' marginTop={10} type='submit'>Submit</Button>
        </Flex>
      </Box>
    </Box>
  )
};

export default UserInfoForm;