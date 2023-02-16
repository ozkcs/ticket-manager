import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const breakpoints = {
  sm: '900px',
  md: '1000px',
  lg: '1366px',
  xl: '1920px',
  '2xl': '2560px',
}

export const customTheme = extendTheme({
  components: {
    Text: {
      variants: {
        primary: (props: StyleFunctionProps) => ({
          color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800'
        }),
        secondary: (props: StyleFunctionProps) => ({
          color: props.colorMode === 'dark' ? 'whiteAlpha.700' : 'gray.600'
        }),
      }
    }
  },
  breakpoints
})