import { z } from 'zod'

export const taskFormSchema = z.object({
  context: z.string().min(1, 'Описание задачи обязательно'),
  assignToTeam: z.boolean(),
  isRoutine: z.boolean(),
  routineData: z.object({
    periodicity: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  assignees: z.array(z.string()).min(1, 'Выберите хотя бы одного исполнителя'),
  dueDate: z.string().min(1, 'Выберите дату выполнения'),
  dueTime: z.string().min(1, 'Выберите время выполнения'),
  topic: z.string().min(1, 'Выберите тему'),
  tags: z.array(z.string()),
  files: z.array(z.any()).optional(),
}).refine((data) => {
  if (data.isRoutine && !data.routineData) {
    return false;
  }
  return true;
}, {
  message: 'Данные для регулярной задачи обязательны',
  path: ['routineData'],
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
