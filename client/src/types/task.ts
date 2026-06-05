
export interface Task {
  id: number
  title: string
  description: string
  profile: string
  status: 'todo' | 'in-progress' | 'done'
}