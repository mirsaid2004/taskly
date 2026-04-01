import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick'
    })
  }),

  http.post('https://api.example.com/tasks', async ({ request }) => {
    const data = await request.json()
    console.log('Task created:', data)
    return HttpResponse.json({ success: true, task: data }, { status: 201 })
  }),

  http.get('https://api.example.com/participants', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('q')?.toLowerCase() || ''
    const participants = [
      { id: '1', name: 'Иван Иванов', avatar: 'https://i.pravatar.cc/150?u=1', role: 'Frontend Developer' },
      { id: '2', name: 'Петр Петров', avatar: 'https://i.pravatar.cc/150?u=2', role: 'Backend Developer' },
      { id: '3', name: 'Сергей Сергеев', avatar: 'https://i.pravatar.cc/150?u=3', role: 'UI/UX Designer' },
      { id: '4', name: 'Алексей Алексеев', avatar: 'https://i.pravatar.cc/150?u=4', role: 'Project Manager' },
      { id: '5', name: 'Дмитрий Дмитриев', avatar: 'https://i.pravatar.cc/150?u=5', role: 'QA Engineer' },
      { id: '6', name: 'Анна Аннова', avatar: 'https://i.pravatar.cc/150?u=6', role: 'DevOps Engineer' },
      { id: '7', name: 'Мария Мариева', avatar: 'https://i.pravatar.cc/150?u=7', role: 'Frontend Developer' },
      { id: '8', name: 'Ольга Олегова', avatar: 'https://i.pravatar.cc/150?u=8', role: 'Backend Developer' },
      { id: '9', name: 'Елена Еленова', avatar: 'https://i.pravatar.cc/150?u=9', role: 'Product Owner' },
      { id: '10', name: 'Виктор Викторов', avatar: 'https://i.pravatar.cc/150?u=10', role: 'Data Scientist' },
      { id: '11', name: 'Никита Никитов', avatar: 'https://i.pravatar.cc/150?u=11', role: 'Mobile Developer' },
      { id: '12', name: 'Максим Максимов', avatar: 'https://i.pravatar.cc/150?u=12', role: 'System Architect' },
      { id: '13', name: 'Андрей Андреев', avatar: 'https://i.pravatar.cc/150?u=13', role: 'Security Specialist' },
      { id: '14', name: 'Юрий Юрьев', avatar: 'https://i.pravatar.cc/150?u=14', role: 'HR Manager' },
      { id: '15', name: 'Игорь Игорев', avatar: 'https://i.pravatar.cc/150?u=15', role: 'Financial Analyst' }
    ]
    const filtered = participants.filter(p => p.name.toLowerCase().includes(search))
    return HttpResponse.json(filtered)
  }),

  http.get('https://api.example.com/teams', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('q')?.toLowerCase() || ''
    const teams = [
      { id: 't1', name: 'Команда Фронтенда', avatar: 'https://i.pravatar.cc/150?u=t1' },
      { id: 't2', name: 'Команда Бэкенда', avatar: 'https://i.pravatar.cc/150?u=t2' },
      { id: 't3', name: 'Команда Мобильной разработки', avatar: 'https://i.pravatar.cc/150?u=t3' },
      { id: 't4', name: 'Команда Дизайна', avatar: 'https://i.pravatar.cc/150?u=t4' },
      { id: 't5', name: 'Команда QA', avatar: 'https://i.pravatar.cc/150?u=t5' },
      { id: 't6', name: 'Команда DevOps', avatar: 'https://i.pravatar.cc/150?u=t6' }
    ]
    const filtered = teams.filter(t => t.name.toLowerCase().includes(search))
    return HttpResponse.json(filtered)
  }),

  http.get('https://api.example.com/topics', () => {
    return HttpResponse.json([
      { id: 'top1', name: 'Development' },
      { id: 'top2', name: 'Design' },
      { id: 'top3', name: 'Marketing' },
    ])
  }),

  http.get('https://api.example.com/tags', () => {
    return HttpResponse.json([
      { id: 'tag1', name: 'Bug' },
      { id: 'tag2', name: 'Feature' },
      { id: 'tag3', name: 'Urgent' },
    ])
  })
]
