import { Text, HStack, createListCollection } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select'
import { Field } from '@/components/ui/field'
import type { TopicSelectorProps } from './types'

export function TopicSelector({
  control,
  errors,
  getInputStyles,
  topics,
  isTopicOpen,
  setIsTopicOpen
}: TopicSelectorProps) {
  const topicsCollection = createListCollection({
    items: topics.map((t) => ({ label: t.name, value: t.id }))
  })

  return (
    <Field
      invalid={!!errors.topic}
      label={
        <HStack gap={1}>
          <Text>Тема</Text>
          <Text color="red.500">*</Text>
        </HStack>
      }
      errorText={errors.topic?.message}
    >
      <Controller
        name="topic"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <SelectRoot
            collection={topicsCollection}
            value={value ? [value] : []}
            onOpenChange={(details) => setIsTopicOpen(details.open)}
            onValueChange={(details) => onChange(details.value[0])}
            onExitComplete={() => onBlur()}
            width="full"
            size="sm"
          >
            <SelectTrigger
              {...getInputStyles(isTopicOpen, !!errors.topic)}
              data-testid="topic-select-trigger"
              px={3}
              py={1}
              width="full"
            >
              <SelectValueText placeholder="Выберите тему для задачи" />
            </SelectTrigger>
            <SelectContent boxShadow="xl" zIndex={2000} width="var(--reference-width)">
              {topicsCollection.items.map((item, index) => (
                <SelectItem
                  item={item}
                  key={item.value}
                  p={2}
                  data-testid={`topic-option-${index}`}
                  rounded="lg"
                  _hover={{ bg: 'purple.50' }}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  )
}
