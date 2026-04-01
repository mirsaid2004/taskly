import { VStack, createListCollection, Input } from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select'
import { Field } from '@/components/ui/field'
import type { RoutineDataFieldsProps } from './types'

export function RoutineDataFields({
  control,
  errors,
  getInputStyles,
  isPeriodicityOpen,
  setIsPeriodicityOpen
}: RoutineDataFieldsProps) {
  const periodicityCollection = createListCollection({
    items: [
      { label: 'Ежедневно', value: 'daily' },
      { label: 'Еженедельно', value: 'weekly' }
    ]
  })

  return (
    <VStack
      gap={4}
      align="stretch"
      mt={2}
      p={4}
      bg="gray.50"
      rounded="2xl"
      borderWidth="1px"
      borderColor="gray.100"
    >
      <Field
        invalid={!!errors.routineData?.type}
        label="Периодичность"
        errorText={errors.routineData?.type?.message}
      >
        <Controller
          name="routineData.type"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <SelectRoot
              collection={periodicityCollection}
              value={value ? [value] : []}
              onOpenChange={(details) => setIsPeriodicityOpen(details.open)}
              onValueChange={(details) => onChange(details.value[0])}
              onExitComplete={() => onBlur()}
              width="full"
              size="sm"
            >
              <SelectTrigger
                {...getInputStyles(isPeriodicityOpen, !!errors.routineData?.type)}
                px={3}
                py={1}
                width="full"
              >
                <SelectValueText placeholder="Выберите частоту" />
              </SelectTrigger>
              <SelectContent rounded="2xl" boxShadow="xl" zIndex={2000}>
                {periodicityCollection.items.map((item) => (
                  <SelectItem item={item} key={item.value} rounded="lg">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        />
      </Field>

      <Field
        invalid={!!errors.routineData?.description}
        label="Описание повторения"
        errorText={errors.routineData?.description?.message}
      >
        <Input
          {...control.register('routineData.description')}
          {...getInputStyles(false, !!errors.routineData?.description)}
          placeholder="Например: каждый понедельник в 10:00"
          px={4}
        />
      </Field>
    </VStack>
  )
}
