import { TagsInput as ChakraTagsInput } from "@chakra-ui/react"
import * as React from "react"
import { IoCloseOutline } from "react-icons/io5"

export const TagsInputRoot = ChakraTagsInput.Root
export const TagsInputLabel = ChakraTagsInput.Label
export const TagsInputControl = ChakraTagsInput.Control
export const TagsInputInput = ChakraTagsInput.Input

export const TagsInputItem = React.forwardRef<
    HTMLDivElement,
    ChakraTagsInput.ItemProps
>(function TagsInputItem(props, ref) {
    const { children, ...rest } = props
    return (
        <ChakraTagsInput.Item ref={ref} {...rest}>
            <ChakraTagsInput.ItemText>{children}</ChakraTagsInput.ItemText>
            <ChakraTagsInput.ItemDeleteTrigger>
                <IoCloseOutline />
            </ChakraTagsInput.ItemDeleteTrigger>
        </ChakraTagsInput.Item>
    )
})

export const TagsInputClearTrigger = ChakraTagsInput.ClearTrigger
