import { z } from 'zod'

export const taskFormSchema = z
  .object({
    context: z.string().min(1, 'Описание задачи обязательно'),
    assignToTeam: z.boolean(),
    isRoutine: z.boolean(),
    routineData: z
      .object({
        periodicity: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional()
      })
      .optional(),
    assignees: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          role: z.string().optional(),
          avatar: z.string().optional()
        })
      )
      .min(1, 'Выберите хотя бы одного исполнителя'),
    dueDate: z.string().min(1, 'Выберите дату выполнения'),
    dueTime: z.string().min(1, 'Выберите время выполнения'),
    topic: z.string().min(1, 'Выберите тему'),
    tags: z.array(z.string()),
    files: z.array(z.any()).optional()
  })
  .superRefine((data, ctx) => {
    if (data.isRoutine) {
      if (!data.routineData?.periodicity || data.routineData.periodicity.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Название рутинной задачи обязательно',
          path: ['routineData', 'periodicity']
        })
      }
      if (!data.routineData?.type || data.routineData.type.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Выберите периодичность',
          path: ['routineData', 'type']
        })
      }
    }
  })

export type TaskFormValues = z.infer<typeof taskFormSchema>
