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
import { Controller, useWatch } from 'react-hook-form'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { IoCloseCircleOutline, IoChevronDownOutline } from 'react-icons/io5'
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover'
import { Field } from '@/components/ui/field'
import { Avatar } from '@/components/ui/avatar'

import { useRef, useMemo, useCallback } from 'react'
import { useDebouncedCallback } from '@/hooks/useDebounceCallback'
import type { AssigneeSelectorProps, Assignee } from './types'

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

  const currentAssigneds = useWatch({ control, name: 'assignees' })
  const assignedIds = useMemo(() => (currentAssigneds || []).map((el) => el.id), [currentAssigneds])

  const displayOptions = useMemo(() => {
    const selected = assigneesOptions.filter((o) => assignedIds.includes(o.id))
    const unselected = assigneesOptions.filter((o) => !assignedIds.includes(o.id))
    return [...selected, ...unselected]
  }, [assigneesOptions, assignedIds])

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value)
    setIsPopoverOpen(true)
  }, 300)

  const handleTriggerClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isPopoverOpen) setIsPopoverOpen(true)
      const target = e.target as HTMLElement
      if (target.tagName !== 'INPUT') {
        searchInputRef.current?.focus()
      }
    },
    [isPopoverOpen, setIsPopoverOpen]
  )

  return (
    <Field
      invalid={!!errors.assignees}
      label={
        <HStack gap={1}>
          <Text>{assignToTeam ? 'Команды проекта' : 'Исполнители задачи'}</Text>
          <Text color="red.500">*</Text>
        </HStack>
      }
      errorText={errors.assignees?.message}
    >
      <Controller
        name="assignees"
        control={control}
        render={({ field: { value, onChange } }) => {
          const toggle = (assignee: Assignee) =>
            onChange(
              value.some((elem) => elem.id == assignee.id)
                ? value.filter((i) => i.id !== assignee.id)
                : [...value, assignee]
            )

          return (
            <PopoverRoot
              open={isPopoverOpen}
              onOpenChange={(e) => setIsPopoverOpen(e.open)}
              positioning={{ placement: 'bottom-start' }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
              initialFocusEl={() => searchInputRef.current}
            >
              <PopoverTrigger asChild>
                <Box
                  width="full"
                  border="1px solid"
                  {...getInputStyles(isPopoverOpen, !!errors.assignees)}
                  onClick={handleTriggerClick}
                  cursor="text"
                >
                  <HStack wrap="wrap" gap={2} p={1}>
                    {value.map((assignee) => {
                      return (
                        <SelectedTag
                          key={assignee.id}
                          assignee={assignee}
                          onRemove={() => toggle(assignee)}
                        />
                      )
                    })}
                    <HStack flex={1} minW="150px">
                      <Input
                        ref={searchInputRef}
                        css={{ border: 'none', boxShadow: 'none', outline: 'none' }}
                        data-testid="assignee-search-input"
                        placeholder={value.length === 0 ? 'Укажите исполнителей проекта' : ''}
                        defaultValue={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
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
                    {!isFetching && displayOptions.length === 0 && (
                      <Text p={2} fontSize="sm" color="gray.500">
                        Ничего не найдено
                      </Text>
                    )}
                    {displayOptions.map((opt, index) => (
                      <AssigneeOption
                        key={opt.id}
                        opt={opt}
                        index={index}
                        isSelected={value.some((elem) => elem.id == opt.id)}
                        onToggle={() => toggle(opt)}
                      />
                    ))}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </PopoverRoot>
          )
        }}
      />
    </Field>
  )
}

const SelectedTag = ({ assignee, onRemove }: { assignee: Assignee; onRemove: () => void }) => (
  <HStack
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
        onRemove()
      }}
    >
      <IoCloseCircleOutline />
    </IconButton>
  </HStack>
)

const AssigneeOption = ({
  opt,
  isSelected,
  index,
  onToggle
}: {
  opt: Assignee
  isSelected: boolean
  index: number
  onToggle: () => void
}) => (
  <Box
    key={opt.id}
    data-testid={`assignee-option-${index}`}
    p={2}
    rounded="lg"
    bg={isSelected ? 'purple.50' : 'transparent'}
    _hover={{ bg: isSelected ? 'purple.100' : 'gray.50' }}
    cursor="pointer"
    onClick={(e) => {
      e.preventDefault()
      onToggle()
    }}
  >
    <HStack gap={3}>
      <Checkbox.Root
        checked={isSelected}
        onCheckedChange={() => {}}
        pointerEvents="none"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
      >
        <Checkbox.Control colorPalette="purple" rounded="l3" />
        <Checkbox.Label fontSize="sm" color="gray.600" />
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <Avatar size="xs" name={opt.name} src={opt.avatar} />
      <VStack align="start" gap={0}>
        <Text fontSize="sm" fontWeight={isSelected ? 'semibold' : 'medium'}>
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
