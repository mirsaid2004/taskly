import { Select as ChakraSelect, Portal } from "@chakra-ui/react"
import * as React from "react"

interface SelectTriggerProps extends ChakraSelect.TriggerProps {
    clearable?: boolean
}

export const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    SelectTriggerProps
>(function SelectTrigger(props, ref) {
    const { children, clearable, ...rest } = props
    return (
        <ChakraSelect.Control>
            <ChakraSelect.Trigger ref={ref} {...rest}>
                {children}
            </ChakraSelect.Trigger>
            <ChakraSelect.IndicatorGroup>
                {clearable && <ChakraSelect.ClearTrigger />}
                <ChakraSelect.Indicator />
            </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
    )
})

export const SelectContent = React.forwardRef<
    HTMLDivElement,
    ChakraSelect.ContentProps
>(function SelectContent(props, ref) {
    const { children, ...rest } = props
    return (
        <Portal>
            <ChakraSelect.Positioner>
                <ChakraSelect.Content ref={ref} {...rest}>
                    {children}
                </ChakraSelect.Content>
            </ChakraSelect.Positioner>
        </Portal>
    )
})

export const SelectItem = React.forwardRef<
    HTMLDivElement,
    ChakraSelect.ItemProps
>(function SelectItem(props, ref) {
    const { item, children, ...rest } = props
    return (
        <ChakraSelect.Item key={item.value} item={item} ref={ref} {...rest}>
            {children}
            <ChakraSelect.ItemIndicator />
        </ChakraSelect.Item>
    )
})

export const SelectValueText = ChakraSelect.ValueText
export const SelectRoot = ChakraSelect.Root
export const SelectLabel = ChakraSelect.Label
export const SelectItemGroup = ChakraSelect.ItemGroup
export const SelectItemGroupLabel = ChakraSelect.ItemGroupLabel
