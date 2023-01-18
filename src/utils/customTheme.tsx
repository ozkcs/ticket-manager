import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

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
})