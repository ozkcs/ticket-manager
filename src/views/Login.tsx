import { Box, Center, Flex, HStack, Stack, Heading, VStack, Spacer, Hide, Button } from '@chakra-ui/react';
import FormInput from '../components/FormInput';
import { FormikValues, useFormik } from 'formik';
import { object, string, } from 'yup';
import { Logo } from '../Logo';
import login_animation from '../assets/login/60a6dc77d6c4a91fc4782f68_Group 14.svg'
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { decodeToken } from '../utils/decodeToken';
import ToastMessage from '../components/ToastMessage';

const Login = () => {
  const auth = getAuth();
  const { login } = useAuth()
  const navigate = useNavigate()
  const token = decodeToken()
  const spanNewToast = ToastMessage();

  useEffect(() => {
    if (token) navigate('/admin')
  }, [])

  const formik: FormikValues = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object({
      email: string().email(),
      password: string().required()
    }),
    onSubmit: async (values: FormikValues) => {
      try {
        const { user }: any = await signInWithEmailAndPassword(auth, values.email, values.password)
        login(user.email, user.stsTokenManager.accessToken, user.stsTokenManager.expirationTime)
        navigate('/admin')
      } catch (error: any) {
        // TODO: custom logger  
        console.log(error.code);
        spanNewToast('something has happened', error.message, 'error')
      }
    }
  })

  return (
    <>
      <Stack h='100vh' bgGradient='linear-gradient(90deg, rgba(15,31,42,1) 0%, rgba(13,45,53,1) 40%, rgba(10,63,67,1) 100%);'>
        <HStack
          w={'90%'}
          h={'80%'}
          m={'auto'}
          p={'20px'}
          background={'#010A11'}
        >
          <VStack w={['md', 'xl']} m={'auto'} h={'100%'} justify={'space-around'} border={'1px solid silver'} borderRadius={'6px'}  >
            <Stack mb={0} align={'center'}>
              <Heading>Ticket Manager</Heading>
              <Logo h={'80px'} w={'80px'} mr="5"/>
            </Stack>
            <Stack h={'auto'}>
              <FormInput
                name='email'
                formLabel='Email'
                type='name'
                {...formik.getFieldProps('email')}
                isInvalid={formik.errors.email && formik.touched.email}
                errors={formik.errors.email}
                onBlur={formik.handleBlur}
                
              />
              <FormInput
                name='password'
                formLabel='Password'
                type='password'
                {...formik.getFieldProps('password')}
                isInvalid={formik.errors.password && formik.touched.password}
                errors={formik.errors.password}
                onBlur={formik.handleBlur}
              />
              <Button size='lg' fontWeight='semibold' colorScheme='teal' variant='solid' type='submit' onClick={formik.handleSubmit}>
                Sign In
              </Button>
            </Stack>
          </VStack>

          <Hide below='md'>
            <Spacer />
            <VStack w={'100%'} h={'full'} background={'#010A11'} align={'flex-end'}>
              <Box
                w={['400px', '650px']}                  
                h={'inherit'}
                as='img'
                src={login_animation}
                objectFit='contain'
                sx={{
                  aspectRatio: 'full'
                }}
              />
            </VStack>
          </Hide>
        </HStack>
      </Stack>
    </>
  );
};

export default Login;
