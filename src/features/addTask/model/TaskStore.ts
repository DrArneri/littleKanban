import {create} from 'zustand'
import type { Task } from '../../../entities/task/model/Task'
import { nanoid } from 'nanoid'

type TaskDraftStore = {
    draft: Task[]
    addTask: (task: Task) => void
}

const initialDraft: Task[] = []

export const useTaskDraft = create<TaskDraftStore>((set) => ({
    draft: initialDraft,
    addTask: (task) => {set((state) => ({
        draft: [...state.draft, {
            id: nanoid(),
            title: task.title,
            description: task?.description,
            status: task.status,
            tag: task.tag
        }]
    }))}
}))