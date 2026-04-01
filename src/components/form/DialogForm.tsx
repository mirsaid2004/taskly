import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Icon,
  IconButton,
  Button,
  Portal,
  Separator,
  Switch,
  Checkbox,
  For,
  SegmentGroup,
  Dialog,
  DialogCloseTrigger,
  Textarea
} from '@chakra-ui/react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { IoCloseCircleOutline, IoAttachOutline, IoInformationCircleOutline } from 'react-icons/io5'

import { Controller } from 'react-hook-form'
import { Field } from '@/components/ui/field'
import {
  FileUploadRoot,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadHiddenInput
} from '@/components/ui/file-button'
import { useState } from 'react'

// Modular Components
import { useTaskForm } from './task-form/useTaskForm'
import { AssigneeSelector } from './task-form/AssigneeSelector'
import { TagsSelector } from './task-form/TagsSelector'
import { TopicSelector } from './task-form/TopicSelector'
import { RoutineDataFields } from './task-form/RoutineDataFields'
import { toaster } from '@/components/ui/toaster'
import { DateTimeFields } from './task-form/DateTimeFields'
import { Tooltip } from '../ui/tooltip'

const segmentIndicators = [
  { key: 'tasks', label: 'Создание задачи' },
  { key: 'reminder', label: 'Создание напоминания' }
]

function DialogForm() {
  const [open, setOpen] = useState(true)
  const {
    form: {
      control,
      handleSubmit,
      register,
      reset,
      formState: { errors }
    },
    states,
    actions,
    data,
    computed,
    mutation,
    getInputStyles
  } = useTaskForm(() => setOpen(false))

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open)
        if (!e.open) {
          reset()
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant={'solid'} data-testid="task-create">
          Создать задачу
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded={'3xl'} maxW="500px">
            <Flex justify="space-between" align="center" p="4" borderBottomWidth="1px">
              <HStack alignItems={'center'} gap={2}>
                <Icon color={'purple.600'} fontSize={25}>
                  <IoMdCheckboxOutline />
                </Icon>
                <Text fontWeight="bold" fontSize="lg">
                  {states.segmentValue === 'tasks' ? 'Создание задачи' : 'Создание напоминания'}
                </Text>
              </HStack>

              <DialogCloseTrigger asChild>
                <IconButton variant="ghost" rounded={'full'} size="md" data-testid="close-dialog">
                  <Icon fontSize={'30px'} color={'gray.500'}>
                    <IoCloseCircleOutline />
                  </Icon>
                </IconButton>
              </DialogCloseTrigger>
            </Flex>
            <Dialog.Body pb="6">
              <VStack gap={6} align="stretch">
                <SegmentGroup.Root
                  value={states.segmentValue}
                  size={'sm'}
                  onValueChange={(e) => states.setSegmentValue(e.value)}
                  colorPalette="purple"
                  rounded="full"
                  width={'full'}
                  css={{
                    '--segment-indicator-bg': 'colors.purple.600',
                    '--segment-indicator-shadow': 'none',
                    '--segment-indicator-rounded': 'full',
                    '--segment-border-color': 'colors.purple.600',
                    '--segment-border-width': '1px',
                    boxShadow: 'inset 0 0 0 1px {colors.purple.600}'
                  }}
                >
                  <SegmentGroup.Indicator rounded={'full'} />
                  <For each={segmentIndicators}>
                    {(item) => (
                      <SegmentGroup.Item key={item.key} value={item.key} rounded="full" flex={1}>
                        <SegmentGroup.ItemText _checked={{ color: 'white' }}>
                          {item.label}
                        </SegmentGroup.ItemText>
                        <SegmentGroup.ItemHiddenInput />
                      </SegmentGroup.Item>
                    )}
                  </For>
                </SegmentGroup.Root>

                <form
                  id="task-form"
                  onSubmit={handleSubmit(
                    (d) => mutation.mutate(d),
                    () => {
                      toaster.create({
                        description: 'В некоторых полях есть проблемы',
                        type: 'error'
                      })
                    }
                  )}
                >
                  <VStack gap={4} align="stretch">
                    <Field
                      invalid={!!errors.context}
                      label={
                        <HStack gap={1}>
                          <Text>Контекст задачи</Text>
                          <Text color="red.500">*</Text>
                        </HStack>
                      }
                      errorText={errors.context?.message}
                    >
                      <Textarea
                        placeholder="Выполнить какую-нибудь задачу"
                        {...register('context')}
                        {...getInputStyles(false, !!errors.context)}
                        height="100px"
                      ></Textarea>
                    </Field>

                    <HStack justify="space-between">
                      <Controller
                        name="assignToTeam"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Switch.Root
                            colorPalette={'purple'}
                            value={value ? 'on' : 'off'}
                            onCheckedChange={(e) => {
                              onChange(e.checked)
                              actions.handleTeamToggle(!!e.checked)
                            }}
                          >
                            <Switch.HiddenInput />
                            <Switch.Control />
                            <Switch.Label data-testid="team-toggle">
                              Назначить на команду
                            </Switch.Label>
                          </Switch.Root>
                        )}
                      />

                      <Controller
                        name="isRoutine"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Checkbox.Root
                            data-testid="routine-toggle"
                            rounded={'full'}
                            checked={value}
                            onCheckedChange={(e) => {
                              onChange(e.checked)
                            }}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control colorPalette="purple" rounded={'l3'} />
                            <Checkbox.Label fontSize="sm" color="gray.600">
                              Рутинная задача
                            </Checkbox.Label>
                            <Tooltip content="Рутинные задачи повторяются с определенной периодичностью и помогают автоматизировать регулярные процессы. Например, ежедневная проверка почты или еженедельное планирование задач.">
                              <Icon color="purple.500">
                                <IoInformationCircleOutline size={18} />
                              </Icon>
                            </Tooltip>
                          </Checkbox.Root>
                        )}
                      />
                    </HStack>

                    {computed.isRoutine && (
                      <RoutineDataFields
                        control={control}
                        errors={errors}
                        register={register}
                        isPeriodicityOpen={states.isPeriodicityOpen}
                        setIsPeriodicityOpen={states.setIsPeriodicityOpen}
                        getInputStyles={getInputStyles}
                      />
                    )}

                    <Separator color="gray.100" />

                    <AssigneeSelector
                      control={control}
                      errors={errors}
                      register={register}
                      assignToTeam={computed.assignToTeam}
                      assigneesOptions={data.assigneesOptions}
                      isFetching={data.isAssigneesFetching}
                      searchQuery={states.searchQuery}
                      setSearchQuery={states.setSearchQuery}
                      isPopoverOpen={states.isPopoverOpen}
                      setIsPopoverOpen={states.setIsPopoverOpen}
                      getInputStyles={getInputStyles}
                    />

                    <DateTimeFields
                      control={control}
                      errors={errors}
                      register={register}
                      getInputStyles={getInputStyles}
                    />

                    <TopicSelector
                      control={control}
                      errors={errors}
                      register={register}
                      topics={data.topics}
                      isTopicOpen={states.isTopicOpen}
                      setIsTopicOpen={states.setIsTopicOpen}
                      getInputStyles={getInputStyles}
                    />

                    <TagsSelector
                      control={control}
                      errors={errors}
                      register={register}
                      availableTags={data.tags}
                      isTagsOpen={states.isTagsOpen}
                      setIsTagsOpen={states.setIsTagsOpen}
                      getInputStyles={getInputStyles}
                    />

                    <Box>
                      <HStack gap={2} align="center" mb={1}>
                        <Text fontSize="sm" fontWeight="medium">
                          Файлы
                        </Text>
                      </HStack>
                      <Field invalid={!!errors.files} errorText={errors.files?.message}>
                        <Controller
                          name="files"
                          control={control}
                          render={({ field }) => (
                            <FileUploadRoot
                              maxFiles={10}
                              onFileChange={(details) => field.onChange(details.acceptedFiles)}
                            >
                              <FileUploadHiddenInput />
                              <FileUploadTrigger asChild>
                                <Button
                                  variant="outline"
                                  width="full"
                                  justifyContent="space-between"
                                  fontWeight="normal"
                                  color="gray.500"
                                  {...getInputStyles(false, !!errors.files)}
                                >
                                  Прикрепить файлы
                                  <Icon color="purple.500">
                                    <IoAttachOutline size={20} />
                                  </Icon>
                                </Button>
                              </FileUploadTrigger>
                              <FileUploadList mt={2}>
                                {field.value?.map((file: File, index: number) => (
                                  <FileUploadItem key={index} file={file} />
                                ))}
                              </FileUploadList>
                            </FileUploadRoot>
                          )}
                        />
                      </Field>
                    </Box>
                  </VStack>
                </form>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer p={4}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" rounded="xl" onClick={() => setOpen(false)}>
                  Отмена
                </Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                form="task-form"
                data-testid="save-btn"
                colorPalette="purple"
                rounded="xl"
                loading={mutation.isPending}
              >
                Сохранить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default DialogForm
