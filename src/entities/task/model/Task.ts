export type Status = 'todo' | 'inProgress' | 'done'

export type Task = {
    id: number,
    title: string,
    description?: string,
    status: Status, 
    tag: string
}