import { VStack, Box, createListCollection, Input, Textarea, HStack, Text } from '@chakra-ui/react'
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
    <Box
      p={4}
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="purple.200"
      rounded="2xl"
      bg="purple.50"
    >
      <VStack gap={3} align="stretch">
        <Field
          invalid={!!errors.routineData?.periodicity}
          label={
            <HStack gap={1}>
              <Text>Название рутинной задачи</Text>
              <Text color="red.500">*</Text>
            </HStack>
          }
          errorText={errors.routineData?.periodicity?.message}
        >
          <Input
            placeholder="Укажите название"
            size="sm"
            {...getInputStyles(false, !!errors.routineData?.periodicity)}
            {...control.register('routineData.periodicity')}
          />
        </Field>
        <Field
          label={
            <HStack gap={1}>
              <Text>Периодичность</Text>
              <Text color="red.500">*</Text>
            </HStack>
          }
          invalid={!!errors.routineData?.type}
          errorText={errors.routineData?.type?.message}
        >
          <Controller
            name="routineData.type"
            control={control}
            render={({ field }) => (
              <SelectRoot
                collection={periodicityCollection}
                value={[field.value || '']}
                onValueChange={(e) => field.onChange(e.value[0])}
                open={isPeriodicityOpen}
                onOpenChange={(e) => setIsPeriodicityOpen(e.open)}
                size="sm"
                width={'full'}
              >
                <SelectTrigger
                  {...getInputStyles(isPeriodicityOpen, !!errors.routineData?.type)}
                  px={3}
                  py={1}
                  width="full"
                  textAlign="left"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <SelectValueText placeholder="Выберите периодичность" />
                </SelectTrigger>
                <SelectContent>
                  {periodicityCollection.items.map((item) => (
                    <SelectItem
                      item={item}
                      key={item.value}
                      p={2}
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
        <Field label="Описание">
          <Textarea
            placeholder="Описание рутинной задачи"
            size="md"
            height="100px"
            {...getInputStyles(false, !!errors.routineData?.description)}
            {...control.register('routineData.description')}
          />
        </Field>
      </VStack>
    </Box>
  )
}
