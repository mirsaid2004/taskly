import {
    Box,
    VStack,
    Text,
    Badge,
    Span,
    Icon,
    TagsInput
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
import {
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger
} from '@/components/ui/popover'
import { Field } from '@/components/ui/field'
import type { TagsSelectorProps } from './types'

export function TagsSelector({
    control,
    errors,
    getInputStyles,
    availableTags,
    isTagsOpen,
    setIsTagsOpen
}: TagsSelectorProps) {
    return (
        <Field invalid={!!errors.tags} label="Теги" errorText={errors.tags?.message}>
            <Controller
                name="tags"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <PopoverRoot
                        open={isTagsOpen}
                        onOpenChange={(e) => setIsTagsOpen(e.open)}
                        positioning={{ placement: 'bottom-start' }}
                    >
                        <PopoverTrigger asChild>
                            <Box
                                width="full"
                                {...getInputStyles(isTagsOpen, !!errors.tags)}
                                px={4}
                                py={1}
                                cursor="text"
                                display="flex"
                                alignItems="center"
                            >
                                <TagsInput.Root
                                    value={value}
                                    onValueChange={(details: { value: string[] }) =>
                                        onChange(details.value)
                                    }
                                    width="full"
                                    border="none"
                                >
                                    <TagsInput.Control
                                        border="none"
                                        boxShadow="none"
                                        p={0}
                                        gap={2}
                                        outline="none"
                                    >
                                        {value?.map((tag: string, index: number) => {
                                            const tagObj = availableTags.find((t) => t.id === tag)
                                            return (
                                                <TagsInput.Item key={index} index={index} value={tag}>
                                                    <Badge
                                                        colorPalette="purple"
                                                        variant="subtle"
                                                        rounded="md"
                                                        px={2}
                                                        py={0.5}
                                                        display="flex"
                                                        alignItems="center"
                                                        gap={1}
                                                    >
                                                        <TagsInput.ItemText>
                                                            <Span fontSize="xs">{tagObj?.name || tag}</Span>
                                                        </TagsInput.ItemText>
                                                        <TagsInput.ItemDeleteTrigger asChild>
                                                            <Icon cursor="pointer" size="xs">
                                                                <IoCloseOutline />
                                                            </Icon>
                                                        </TagsInput.ItemDeleteTrigger>
                                                    </Badge>
                                                </TagsInput.Item>
                                            )
                                        })}
                                        <TagsInput.Input
                                            placeholder={value.length === 0 ? 'Добавить тег...' : ''}
                                            onFocus={(e) => {
                                                e.stopPropagation()
                                                if (!isTagsOpen) setIsTagsOpen(true)
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => setIsTagsOpen(false), 200)
                                            }}
                                        />
                                    </TagsInput.Control>
                                </TagsInput.Root>
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent width="var(--reference-width)" p={2} rounded="2xl" boxShadow="xl">
                            <PopoverBody p={0}>
                                <VStack align="stretch" gap={1} maxH="200px" overflowY="auto">
                                    {availableTags
                                        .filter((t) => !value.includes(t.id))
                                        .map((t) => (
                                            <Box
                                                key={t.id}
                                                p={2}
                                                rounded="lg"
                                                _hover={{ bg: 'purple.50' }}
                                                cursor="pointer"
                                                onClick={() => {
                                                    onChange([...value, t.id])
                                                    setIsTagsOpen(false)
                                                }}
                                            >
                                                <Text fontSize="sm">{t.name}</Text>
                                            </Box>
                                        ))}
                                    {availableTags.filter((t) => !value.includes(t.id)).length === 0 && (
                                        <Text p={2} fontSize="sm" color="gray.500">
                                            Нет доступных тегов
                                        </Text>
                                    )}
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </PopoverRoot>
                )}
            />
        </Field>
    )
}
