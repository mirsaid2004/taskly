import { Box, VStack, Text, Badge, Span, Icon, TagsInput } from '@chakra-ui/react'
import { Controller, useWatch } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '@/components/ui/popover'
import { Field } from '@/components/ui/field'
import type { TagsSelectorProps } from './types'
import { useState, useMemo } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export function TagsSelector({
  control,
  errors,
  getInputStyles,
  availableTags,
  isTagsOpen,
  setIsTagsOpen
}: TagsSelectorProps) {
  const [localSearch, setLocalSearch] = useState('')
  const debouncedSearch = useDebounce(localSearch, 300)

  const currentTags = useWatch({
    control,
    name: 'tags',
    defaultValue: []
  })

  const filteredTags = useMemo(() => {
    return availableTags.filter(
      (t) =>
        !currentTags.includes(t.id) && t.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [availableTags, currentTags, debouncedSearch])

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
                px={2}
                cursor="text"
                display="flex"
                alignItems="center"
              >
                <TagsInput.Root
                  value={value}
                  onValueChange={(details: { value: string[] }) => onChange(details.value)}
                  onInputValueChange={(details) => setLocalSearch(details.inputValue)}
                  width="full"
                  border="none"
                >
                  <TagsInput.Control border="none" boxShadow="none" p={0} gap={2} outline="none">
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
                            <TagsInput.ItemDeleteTrigger
                              asChild
                              onClick={(e) => {
                                e.stopPropagation()
                                onChange(value.filter((v: string) => v !== tag))
                              }}
                            >
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
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => {
                        e.stopPropagation()
                        if (!isTagsOpen) setIsTagsOpen(true)
                      }}
                    />
                  </TagsInput.Control>
                </TagsInput.Root>
              </Box>
            </PopoverTrigger>
            <PopoverContent width="var(--reference-width)" p={2} rounded="2xl" boxShadow="xl">
              <PopoverBody p={0}>
                <VStack align="stretch" gap={1} maxH="200px" overflowY="auto">
                  {filteredTags.map((t) => (
                    <Box
                      key={t.id}
                      p={1}
                      rounded="lg"
                      _hover={{ bg: 'purple.50' }}
                      cursor="pointer"
                      onClick={() => {
                        onChange([...value, t.id])
                        setLocalSearch('')
                        setIsTagsOpen(false)
                      }}
                    >
                      <Text fontSize="sm">{t.name}</Text>
                    </Box>
                  ))}
                  {filteredTags.length === 0 && (
                    <Text p={2} fontSize="sm" color="gray.500">
                      Ничего не найдено
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
