import {
    Box,
    HStack,
    VStack,
    Text,
    Icon,
    IconButton,
    Input,
    Spinner,
    Checkbox
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import {
    IoMdCheckboxOutline
} from 'react-icons/io'
import {
    IoCloseCircleOutline,
    IoSearchOutline,
    IoChevronDownOutline
} from 'react-icons/io5'
import {
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTrigger
} from '@/components/ui/popover'
import { Field } from '@/components/ui/field'
import { Avatar } from '@/components/ui/avatar'
import { useRef } from 'react'
import type { AssigneeSelectorProps } from './types'

export function AssigneeSelector({
    control,
    errors,
    getInputStyles,
    assignToTeam,
    assigneesOptions,
    isFetching,
    searchQuery,
    setSearchQuery,
    isPopoverOpen,
    setIsPopoverOpen
}: AssigneeSelectorProps) {
    const searchInputRef = useRef<HTMLInputElement>(null)

    return (
        <Field
            invalid={!!errors.assignees}
            label={
                <HStack gap={1}>
                    <Text>{assignToTeam ? 'Команды проекта' : 'Исполнители задачи'}</Text>
                    <Text color="red.500">*</Text>
                </HStack>
            }
            helperText="Выберите исполнителей проекта"
            errorText={errors.assignees?.message}
        >
            <Controller
                name="assignees"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <PopoverRoot
                        open={isPopoverOpen}
                        onOpenChange={(e) => setIsPopoverOpen(e.open)}
                        positioning={{ placement: 'bottom-start' }}
                    >
                        <PopoverTrigger asChild>
                            <Box
                                p={1}
                                width="full"
                                border="1px solid"
                                {...getInputStyles(isPopoverOpen, !!errors.assignees)}
                                onClick={(e) => {
                                    if (!isPopoverOpen) setIsPopoverOpen(true)
                                    const target = e.target as HTMLElement
                                    if (target.tagName !== 'INPUT') {
                                        searchInputRef.current?.focus()
                                    }
                                }}
                                cursor="text"
                            >
                                <HStack wrap="wrap" gap={2} p={1}>
                                    {value.map((id: string) => {
                                        const assignee = assigneesOptions.find((a) => a.id === id)
                                        if (!assignee) return null
                                        return (
                                            <HStack
                                                key={id}
                                                bg="purple.50"
                                                px={2}
                                                py={1}
                                                rounded="lg"
                                                gap={1}
                                                borderWidth="1px"
                                                borderColor="purple.100"
                                            >
                                                <Avatar size="2xs" name={assignee.name} src={assignee.avatar} />
                                                <Text fontSize="xs" fontWeight="medium">
                                                    {assignee.name}
                                                </Text>
                                                <IconButton
                                                    variant="ghost"
                                                    size="2xs"
                                                    rounded="full"
                                                    aria-label="Remove"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onChange(value.filter((i: string) => i !== id))
                                                    }}
                                                >
                                                    <IoCloseCircleOutline />
                                                </IconButton>
                                            </HStack>
                                        )
                                    })}
                                    <HStack flex={1} minW="150px">
                                        <Icon color="gray.400">
                                            <IoSearchOutline />
                                        </Icon>
                                        <Input
                                            ref={searchInputRef}
                                            css={{ border: 'none', boxShadow: 'none', outline: 'none' }}
                                            placeholder={value.length === 0 ? 'Укажите исполнителей проекта' : ''}
                                            value={searchQuery}
                                            onChange={(e) => {
                                                e.stopPropagation()
                                                setSearchQuery(e.target.value)
                                                setIsPopoverOpen(true)
                                            }}
                                            size="sm"
                                        />
                                    </HStack>
                                    <Icon ms="auto" color="gray.400" me={2}>
                                        <IoChevronDownOutline />
                                    </Icon>
                                </HStack>
                            </Box>
                        </PopoverTrigger>
                        <PopoverContent width="var(--reference-width)" p={2} rounded="2xl" boxShadow="xl">
                            <PopoverBody p={0}>
                                <VStack align="stretch" gap={1} maxH="300px" overflowY="auto">
                                    {isFetching && (
                                        <HStack p={2} gap={2}>
                                            <Spinner size="xs" color="purple.500" />
                                            <Text fontSize="sm" color="gray.500">
                                                Загрузка...
                                            </Text>
                                        </HStack>
                                    )}
                                    {!isFetching && assigneesOptions.length === 0 && (
                                        <Text p={2} fontSize="sm" color="gray.500">
                                            Ничего не найдено
                                        </Text>
                                    )}
                                    {assigneesOptions.map((opt) => {
                                        const isSelected = value.includes(opt.id)
                                        return (
                                            <Box
                                                key={opt.id}
                                                p={2}
                                                rounded="lg"
                                                bg={isSelected ? 'purple.50' : 'transparent'}
                                                _hover={{ bg: isSelected ? 'purple.100' : 'gray.50' }}
                                                cursor="pointer"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (isSelected) {
                                                        onChange(value.filter((i: string) => i !== opt.id))
                                                    } else {
                                                        onChange([...value, opt.id])
                                                    }
                                                }}
                                            >
                                                <HStack gap={3}>
                                                    <Checkbox.Root
                                                        checked={isSelected}
                                                        onCheckedChange={() => { }}
                                                        pointerEvents="none"
                                                    >
                                                        <Checkbox.HiddenInput />
                                                        <Checkbox.Control />
                                                    </Checkbox.Root>
                                                    <Avatar size="xs" name={opt.name} src={opt.avatar} />
                                                    <VStack align="start" gap={0}>
                                                        <Text
                                                            fontSize="sm"
                                                            fontWeight={isSelected ? 'semibold' : 'medium'}
                                                        >
                                                            {opt.name}
                                                        </Text>
                                                        {opt.role && (
                                                            <Text fontSize="xs" color="gray.500">
                                                                {opt.role}
                                                            </Text>
                                                        )}
                                                    </VStack>
                                                    {isSelected && (
                                                        <Icon ms="auto" color="purple.500">
                                                            <IoMdCheckboxOutline />
                                                        </Icon>
                                                    )}
                                                </HStack>
                                            </Box>
                                        )
                                    })}
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </PopoverRoot>
                )}
            />
        </Field>
    )
}
