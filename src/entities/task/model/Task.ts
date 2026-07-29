export type Status = 'todo' | 'in progress' | 'done'

export type Task = {
    id: number,
    title: string,
    description?: string,
    status: Status, 
    tag: string
}