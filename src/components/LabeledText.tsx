import { HStack, Text, } from "@chakra-ui/react";
import { nomralTextSize } from "../utils/ResponsiveStyles";
interface ILabaledText {
  label: string
  text: string
  justifyContent?: 'center' | 'left' | 'right' | 'space-between'
}
const LabeledText = ({ label, text, justifyContent }: ILabaledText) => {
  return (
    <HStack spacing={2} alignItems={'baseline'} justifyContent={justifyContent || 'center'} >
      <Text as='sub' fontSize={nomralTextSize} fontWeight={'bold'} variant={'primary'}>
        {label}</Text>
      <Text as='sub' fontSize={nomralTextSize} variant={'secondary'}>
        {text} </Text>
    </HStack>);
}

export default LabeledText;