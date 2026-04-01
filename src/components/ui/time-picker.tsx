import { InputGroup } from '@chakra-ui/react'
import * as React from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import { Input, type InputProps } from '@chakra-ui/react'

export const TimePicker = React.forwardRef<HTMLInputElement, InputProps>(
  function TimePicker(props, ref) {
    return (
      <InputGroup flex="1" endElement={<IoTimeOutline color="gray.500" />}>
        <Input
          type="time"
          ref={ref}
          {...props}
          css={{
            '&::-webkit-calendar-picker-indicator': {
              display: 'none',
              WebkitAppearance: 'none'
            }
          }}
        />
      </InputGroup>
    )
  }
)
