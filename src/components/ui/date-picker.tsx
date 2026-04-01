import { InputGroup } from "@chakra-ui/react"
import * as React from "react"
import { IoCalendarOutline } from "react-icons/io5"
import { Input, type InputProps } from "@chakra-ui/react"

export interface DatePickerProps extends InputProps { }

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
    function DatePicker(props, ref) {
        return (
            <InputGroup flex="1" endElement={<IoCalendarOutline color="gray.500" />}>
                <Input
                    type="date"
                    ref={ref}
                    {...props}
                    css={{
                        "&::-webkit-calendar-picker-indicator": {
                            display: "none",
                            WebkitAppearance: "none",
                        },
                    }}
                />
            </InputGroup>
        )
    }
)
