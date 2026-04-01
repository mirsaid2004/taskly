import { InputGroup } from '@chakra-ui/react'
import * as React from 'react'
import { Input, type InputProps } from '@chakra-ui/react'

export const DatePicker = React.forwardRef<HTMLInputElement, InputProps>(
  function DatePicker(props, ref) {
    return (
      <InputGroup flex="1">
        <Input type="date" ref={ref} {...props} />
      </InputGroup>
    )
  }
)
