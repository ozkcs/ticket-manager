import * as React from "react"
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef,
  usePrefersReducedMotion,
  useColorModeValue,
} from "@chakra-ui/react"
import logo from "./beach-badge.png"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`
    
  const invertValue = useColorModeValue(1,0);

  return <chakra.img animation={animation} src={logo} ref={ref} {...props} __css={{'filter':`invert(${invertValue});`}}/>
})
