import { Popover as ChakraPopover, Portal } from "@chakra-ui/react"
import * as React from "react"

export interface PopoverContentProps extends ChakraPopover.ContentProps {
    portalled?: boolean
    portalRef?: React.RefObject<HTMLElement | null>
    onInteractOutside?: (event: any) => void
}

export const PopoverContent = React.forwardRef<
    HTMLDivElement,
    PopoverContentProps
>(function PopoverContent(props, ref) {
    const { portalled = true, portalRef, onInteractOutside, ...rest } = props
    return (
        <Portal disabled={!portalled} container={portalRef}>
            <ChakraPopover.Positioner>
                <ChakraPopover.Content
                    ref={ref}
                    {...(rest as any)}
                    onInteractOutside={onInteractOutside}
                />
            </ChakraPopover.Positioner>
        </Portal>
    )
})

export const PopoverArrow = React.forwardRef<
    HTMLDivElement,
    ChakraPopover.ArrowProps
>(function PopoverArrow(props, ref) {
    return (
        <ChakraPopover.Arrow ref={ref} {...props}>
            <ChakraPopover.ArrowTip />
        </ChakraPopover.Arrow>
    )
})

export const PopoverRoot = ChakraPopover.Root
export const PopoverTrigger = ChakraPopover.Trigger
export const PopoverBody = ChakraPopover.Body
export const PopoverFooter = ChakraPopover.Footer
export const PopoverHeader = ChakraPopover.Header
export const PopoverCloseTrigger = ChakraPopover.CloseTrigger
export const PopoverTitle = ChakraPopover.Title
export const PopoverDescription = ChakraPopover.Description
export const PopoverAnchor = ChakraPopover.Anchor
