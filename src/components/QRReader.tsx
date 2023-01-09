import { Box, Button, Center, Flex, Heading, Hide, IconButton, Stack, useMediaQuery } from '@chakra-ui/react';
import { useSize } from "@chakra-ui/react-use-size"
import { IconCameraRotate } from '@tabler/icons';
import { useState, useRef, RefObject } from 'react'
// @ts-ignore
import QrReader from 'react-qr-scanner';
import adapter from 'webrtc-adapter';

const QRReader = () => {
  const [qrData, setQrData] = useState('');
  const [scanning, setScanning] = useState(false);
  const [camera, setCamera] = useState("environment");

  const toogleScaning = () => setScanning(!scanning);
  const toggleCamara = () => setCamera(camera === "environment" ? "user" : "environment")

  const handleOnScan = (result: string) => {
    toogleScaning();
    setQrData(result);
  }

  const emptyBoxRef = useRef() as RefObject<HTMLDivElement>
  const emptyBoxDim = useSize(emptyBoxRef)

  const cameraContRef = useRef() as RefObject<HTMLDivElement>
  const cameraContDim = useSize(cameraContRef)

  const camaraOnMobile = {
    objectFit: 'cover',
    height: `Calc(${(emptyBoxDim?.width || 0)} + 100px)`
  };
  const camaraOnDesktop = {
    objectFit: 'cover',
    height: (emptyBoxDim?.width || 0) + 50,
    width: (emptyBoxDim?.width || 0),
  };

  const [isDesktopView] = useMediaQuery('(min-width: 48em)')

  return (
    <Box >
      <Flex flexDirection={'column'} alignContent={'center'} justifyContent={'center'} alignItems={'center'} gap={10} >

        <Center flexDirection={'column'} w={'100vw'} >
          {scanning &&
            <Flex ref={cameraContRef} h={cameraContDim?.width} w={['75%', '50%']} bgColor={'black'} flexDirection={'column'} borderRadius={10} pt={10} pb={10}>
              <Center>
                <Box alignSelf={'center'} >
                  <QrReader
                    delay={1000}
                    constraints={{
                      audio: false,
                      video: {
                        facingMode: camera
                      }
                    }}
                    onScan={(result: any) => {
                      if (!!result) {
                        handleOnScan(result.text)
                      }
                    }}
                    onError={(error: any) => {
                      console.log(error)
                      console.log(adapter.browserDetails.browser)
                    }}
                    style={isDesktopView ? camaraOnDesktop : camaraOnMobile}
                  />
                </Box>
              </Center>
            </Flex>
          }
          {/* @ts-ignore */}
          <Box ref={emptyBoxRef} h={(emptyBoxDim?.width)} w={['60%', '35%', '20%']} borderStyle={'solid'} borderColor={'black'} borderWidth={10} borderRadius={10} position={'absolute'} visibility={scanning ? 'visible' : 'hidden'} />
        </Center>
        <Stack direction={'row'} w={'100%'}>
          <Center gap={2} w={'100%'}>
            <Button w={['75%', '50%']} onClick={toogleScaning}>{scanning ? "Stop Scanning" : "Scan QRCode"}</Button>
            {scanning &&
              <Hide above='md'>
                <IconButton
                  colorScheme='teal'
                  aria-label='Flip camara'
                  size='lg'
                  onClick={() => { toggleCamara() }}
                  icon={<IconCameraRotate />}
                />
              </Hide>}
          </Center>
        </Stack>
        <Heading>{qrData}</Heading>
      </Flex>
    </Box >
  );
}

export default QRReader