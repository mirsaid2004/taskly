import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { TaskFormValues } from '@/model/TaskFormSchema'

export interface Topic {
  id: string
  name: string
}

export interface Tag {
  id: string
  name: string
}

export interface Assignee {
  id: string
  name: string
  role?: string
  avatar?: string
}

export interface SubComponentProps {
  control: Control<TaskFormValues>
  errors: FieldErrors<TaskFormValues>
  register?: UseFormRegister<TaskFormValues>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getInputStyles: (isOpen?: boolean, isInvalid?: boolean) => any
}

export interface AssigneeSelectorProps extends SubComponentProps {
  assignToTeam: boolean
  assigneesOptions: Assignee[]
  isFetching: boolean
  searchQuery: string
  setSearchQuery: (val: string) => void
  isPopoverOpen: boolean
  setIsPopoverOpen: (val: boolean) => void
}

export interface TagsSelectorProps extends SubComponentProps {
  availableTags: Tag[]
  isTagsOpen: boolean
  setIsTagsOpen: (val: boolean) => void
}

export interface TopicSelectorProps extends SubComponentProps {
  topics: Topic[]
  isTopicOpen: boolean
  setIsTopicOpen: (val: boolean) => void
}

export interface RoutineDataFieldsProps extends SubComponentProps {
  isPeriodicityOpen: boolean
  setIsPeriodicityOpen: (val: boolean) => void
}
