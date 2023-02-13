import { Box, Stack, Text, Button, Flex, Heading } from "@chakra-ui/react";
import FormInput from "./FormInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useEvents from '../hooks/useEvents';
import { buyTickets } from '../services/ticketsService';
import { useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage";


const CodeGeneratorForm = () => {
  const navigate = useNavigate();
  const spanNewToast = ToastMessage();
  const eventsContext = useEvents();
  const { currentEvent, totalPayed } = eventsContext;


  const formik: any = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("This field is required"),
      last_name: Yup.string().required("This field is required"),
      email: Yup.string().email(),
      phone: Yup.string().required("This field is required"),
    }),
    onSubmit: async (values: any, actions: any) => {
      const order = await buyTickets(values, currentEvent, totalPayed);
      if (order) {
        spanNewToast(
          'All Right!',
          'Tickets were succesfully purchased',
          'success'
        )
        navigate(`/admin/ticket-summary/${order}`);
      } else {
        spanNewToast(
          'Oops!! Something is missing',
          'Please check the information and try again',
          'warning'
        )
      }
    }
  })

  return (
    <Box className="code-generator-form" mb={"50px"}>
      <Box as='form' minWidth='max-content' alignItems='center' gap='2' mt={"50px"} onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Heading size='lg' as='h2' >
            Personal Info
          </Heading >
          <Stack spacing={4} direction={['column', 'column', 'row', 'row']}>
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
          <Stack spacing={4} direction={['column', 'column', 'row', 'row']}>
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

export default CodeGeneratorForm;