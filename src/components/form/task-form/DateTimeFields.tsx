import { HStack, Text, Box } from '@chakra-ui/react'
import { Field } from '@/components/ui/field'
import { DatePicker } from '@/components/ui/date-picker'
import { TimePicker } from '@/components/ui/time-picker'
import type { SubComponentProps } from './types'

export function DateTimeFields({ control, errors, getInputStyles }: SubComponentProps) {
  return (
    <Box>
      <HStack gap={2} align="center" mb={1}>
        <Text fontSize="sm" fontWeight="medium">
          Срок выполнения
        </Text>
        <Text color="red.500">*</Text>
      </HStack>
      <HStack gap={4}>
        <Field flex="1" invalid={!!errors.dueDate} errorText={errors.dueDate?.message}>
          <DatePicker
            {...control.register('dueDate')}
            {...getInputStyles(false, !!errors.dueDate)}
            data-testid="due-date-picker"
            px={4}
          />
        </Field>
        <Field flex="1" invalid={!!errors.dueTime} errorText={errors.dueTime?.message}>
          <TimePicker
            {...control.register('dueTime')}
            {...getInputStyles(false, !!errors.dueTime)}
            data-testid="due-time-picker"
            px={4}
          />
        </Field>
      </HStack>
    </Box>
  )
}
