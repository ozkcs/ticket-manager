import { FormControl, Input, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react";

declare type inputSize = 'sm' | 'md' | 'lg';
interface props {
  formLabel?: string;
  type?: string;
  helperText?: string;
  size?: inputSize;
  isRequired?: boolean;
  name?: string;
  value: any;
  onChange: any;
  isInvalid?: boolean;
  errors?: any;
  onBlur?: () => void;
}

const FormInput = ({ formLabel, type, helperText, size, isRequired, name, value, onChange, isInvalid, errors, onBlur }: props) => {
  return (
    <>
      <FormControl isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel>{formLabel}</FormLabel>
        <Input name={name} type={type && 'text'} value={value} onChange={onChange} onBlur={onBlur} />
        {!errors ? <FormHelperText>{helperText}</FormHelperText> :
          <FormErrorMessage>{errors}</FormErrorMessage>}
      </FormControl>
    </>
  )
}

export default FormInput