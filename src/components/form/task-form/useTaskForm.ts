import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { taskFormSchema, type TaskFormValues } from '@/model/TaskFormSchema'
import type { Topic, Tag, Assignee } from './types'
import { toaster } from '@/components/ui/toaster'

export function useTaskForm(onSuccess: () => void) {
  const [segmentValue, setSegmentValue] = useState<string | null>('tasks')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isTopicOpen, setIsTopicOpen] = useState(false)
  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [isPeriodicityOpen, setIsPeriodicityOpen] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      context: '',
      assignToTeam: false,
      isRoutine: false,
      assignees: [],
      dueDate: '',
      dueTime: '',
      topic: '',
      tags: [],
      files: []
    }
  })

  const isRoutine = form.watch('isRoutine')
  const assignToTeam = form.watch('assignToTeam')

  const { data: topics = [] } = useQuery<Topic[]>({
    queryKey: ['topics'],
    queryFn: () => fetch('https://api.example.com/topics').then((res) => res.json())
  })

  const { data: tags = [] } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: () => fetch('https://api.example.com/tags').then((res) => res.json())
  })

  const { data: assigneesOptions = [], isFetching: isAssigneesFetching } = useQuery<Assignee[]>({
    queryKey: ['assignees', assignToTeam, debouncedSearchQuery],
    queryFn: () =>
      fetch(
        `https://api.example.com/${assignToTeam ? 'teams' : 'participants'}?q=${debouncedSearchQuery}`
      ).then((res) => res.json())
  })

  // Monitor isRoutine to clear routineData when unchecked
  const [prevIsRoutine, setPrevIsRoutine] = useState(isRoutine)
  useEffect(() => {
    if (!isRoutine && prevIsRoutine) {
      form.setValue('routineData', {
        periodicity: '',
        type: '',
        description: ''
      })
    }
    setPrevIsRoutine(isRoutine)
  }, [isRoutine, prevIsRoutine, form])

  const handleTeamToggle = (checked: boolean) => {
    form.setValue('assignToTeam', checked)
    form.setValue('assignees', [])
  }

  const mutation = useMutation({
    mutationFn: async (data: TaskFormValues) => {
      const combinedDateTime =
        data.dueDate && data.dueTime ? `${data.dueDate}T${data.dueTime}:00Z` : data.dueDate

      const payload = {
        ...data,
        dueDate: combinedDateTime
      }

      const response = await fetch('https://api.example.com/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) throw new Error('Failed to create task')
      return response.json()
    },
    onSuccess: () => {
      toaster.create({
        description: 'Форма успешно отправлена',
        type: 'success'
      })
      onSuccess()
    }
  })

  const getInputStyles = (isOpen = false, isInvalid = false) => ({
    borderColor: isInvalid ? 'red.500' : isOpen ? 'purple.500' : 'gray.500',
    borderWidth: '1px',
    _hover: { borderColor: isInvalid ? 'red.600' : 'purple.500' },
    _focus: {
      borderColor: isInvalid ? 'red.500' : 'purple.500',
      boxShadow: `0 0 0 1px ${isInvalid ? 'red.500' : 'purple.500'}`,
      outline: 'none'
    },
    rounded: 'xl',
    bg: 'white',
    minH: '45px',
    transition: 'border-color 0.2s'
  })

  return {
    form: {
      control: form.control,
      handleSubmit: form.handleSubmit,
      register: form.register,
      reset: form.reset,
      formState: form.formState
    },
    states: {
      segmentValue,
      setSegmentValue,
      searchQuery,
      setSearchQuery,
      isPopoverOpen,
      setIsPopoverOpen,
      isTopicOpen,
      setIsTopicOpen,
      isTagsOpen,
      setIsTagsOpen,
      isPeriodicityOpen,
      setIsPeriodicityOpen
    },
    actions: {
      handleTeamToggle
    },
    data: {
      topics,
      tags,
      assigneesOptions,
      isAssigneesFetching
    },
    computed: {
      isRoutine,
      assignToTeam
    },
    mutation,
    getInputStyles,
    register: form.register
  }
}
