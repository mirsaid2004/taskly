import {
    FileUpload as ChakraFileUpload,
    IconButton,
    Icon,
} from "@chakra-ui/react"
import * as React from "react"
import { IoCloseOutline, IoAttachOutline } from "react-icons/io5"

export const FileUploadRoot = ChakraFileUpload.Root
export const FileUploadTrigger = ChakraFileUpload.Trigger
export const FileUploadLabel = ChakraFileUpload.Label
export const FileUploadHiddenInput = ChakraFileUpload.HiddenInput

export const FileUploadList = React.forwardRef<
    HTMLUListElement,
    ChakraFileUpload.ItemGroupProps & { children?: React.ReactNode }
>(function FileUploadList(props, ref) {
    return (
        <ChakraFileUpload.ItemGroup ref={ref} {...props} />
    )
})

export const FileUploadItem = React.forwardRef<
    HTMLLIElement,
    ChakraFileUpload.ItemProps
>(function FileUploadItem(props, ref) {
    const { file, ...rest } = props
    return (
        <ChakraFileUpload.Item file={file} ref={ref} {...rest}>
            {file.type.startsWith("image/") ? (
                <ChakraFileUpload.ItemPreviewImage
                    boxSize="40px"
                    objectFit="cover"
                    rounded="md"
                />
            ) : (
                <Icon color="gray.400" boxSize="40px" p={2} rounded="md" bg="gray.50">
                    <IoAttachOutline />
                </Icon>
            )}
            <ChakraFileUpload.ItemName flex="1" />
            <ChakraFileUpload.ItemSizeText />
            <ChakraFileUpload.ItemDeleteTrigger asChild>
                <IconButton variant="ghost" size="xs">
                    <IoCloseOutline />
                </IconButton>
            </ChakraFileUpload.ItemDeleteTrigger>
        </ChakraFileUpload.Item>
    )
})
