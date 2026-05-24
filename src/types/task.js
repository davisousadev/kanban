// types/task.ts
export interface Task {
  id: string
  title: string
  description: string
  profile: string
  status: 'todo' | 'in-progress' | 'done'
}