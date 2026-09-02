import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type { Status, Task } from './Task'
import { nanoid } from 'nanoid'

type TaskDraftStore = {
    draft: Task[]
    moveTask: (id: string, status: Status) => void
    removeTask: (id: string) => void
    addTask: (task: Task) => void
}

const initialDraft: Task[] = []

export const useTaskStore = create<TaskDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            addTask: (task) => {set((state) => ({
                draft: [...state.draft, {
                    id: nanoid(),
                    title: task.title,
                    description: task?.description,
                    status: task.status,
                    tag: task.tag
                }]
            }))},
            moveTask: (id, status) => set((state) => ({
                draft: state.draft.map((task) =>
                    task.id === id ? { ...task, status } : task
                )
            })),
            removeTask: (id) => set((state) => ({
                draft: state.draft.filter((task) => task.id !== id)
            })) 
            
        }),
        {
            name: 'taskDraft',
            partialize: (state) => ({ draft: state.draft }) 
        }
    )
)